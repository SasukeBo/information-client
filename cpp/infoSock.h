#include <winsock2.h>
#include <WS2tcpip.h>
#include <stdio.h>
#include <map>
#include <iterator>
#pragma comment(lib, "Ws2_32.lib")

/*
	头文件使用文档
	1. 连接TCP服务器 connectServer
	2. 注册参数		 registerParam
	3. 获取线程参数  threadData
	4. 启动线程执行  skHandler
	5. 发送数据      sendBuf
*/

namespace INFOSOCK {
	using std::map;
	using std::string;

	// message buffer struct, one buffer for one kind value.
	// lock_1(2) is a lock to buf, while locked by thread, other thread cannot access it.
	// buf_1(2) is a message with index 1(2), save message to be send.
	// now is current writeable buffer
	struct msgBuf {
		bool lock_1;
		bool lock_2;
		string buf_1;
		string buf_2;
		int now;
	};

	// thread function data struct, while create a thread to handle skSend, throw it into the CreateThread function.
	// *msgBufMap is a msgBuf map.
	// *stop is a signal to stop send thread.
	// *ConnectSocket is a winsock socket object.
	// *bufLength is min length limit for send buffer, when buffer length is greater than this value, socket will send and clean the buffer.
	struct threadData {
		map<string, msgBuf> *msgBufMap;
		bool *stop;
		SOCKET *ConnectSocket;
		int *bufLength;
	};

	// skHandler is a socket message hanlder, it reads message buffer map in a loop, until receive stop signal.
	DWORD WINAPI skHandler(LPVOID lpParam) {
		threadData *tData = (threadData *)lpParam;

		map<string, msgBuf>::iterator itr;
		map<string, msgBuf> *msgBufMap = tData->msgBufMap;
		SOCKET * socket = tData->ConnectSocket;
		int *bufLength = tData->bufLength;

		itr = msgBufMap->begin();
		string data;

		while (!*tData->stop) {
			if (itr == msgBufMap->end()) {
				itr = msgBufMap->begin();
				continue;
			}

			switch(itr->second.now) {
				case 1:
					if (itr->second.buf_2.length() == 0){
						itr->second.now = 3 - itr->second.now;
						itr++;
						continue;
					}

					while (itr->second.lock_2);
					itr->second.lock_2 = true;
					data = itr->second.buf_2;
					itr->second.buf_2.clear();
					itr->second.lock_2 = false;
					break;

				case 2:
					if (itr->second.buf_1.length() == 0){
						itr->second.now = 3 - itr->second.now;
						itr++;
						continue;
					}

					while (itr->second.lock_1);
					itr->second.lock_1 = true;
					data = itr->second.buf_1;
					itr->second.buf_1.clear();
					itr->second.lock_1 = false;
					break;
			}

			if (send(*socket, data.c_str(), data.length(), 0) == SOCKET_ERROR) {
				// printf("buf_%d: [Failed] %s\n", itr->second.now, data.c_str());
			} else {
				// printf("buf_%d: [Success] %s\n", itr->second.now, data.c_str());
			}

			data.clear();
			itr->second.now = 3 - itr->second.now;
			itr++;
		}

		// printf("thread stoped\n");
		return 0;
	}

	class InfoSock {
	private:
		bool stop;
		map<string, msgBuf> msgBufMap;
		struct addrinfo *result = NULL;
		struct addrinfo *ptr = NULL;
		struct addrinfo hints;
		SOCKET ConnectSocket = INVALID_SOCKET;

		int getAddrInfo(char* host, char* port) {
			int iResult = getaddrinfo(host, port, &hints, &result);
			if (iResult != 0) {
				// printf("getaddrinfo failed: %d\n", iResult);
				WSACleanup();
				return iResult;
			}
			return 0;
		}

	public:
		InfoSock() {
			WSADATA wsaData;
			int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
			if (iResult != 0) {
				// printf("WSAStartup failed: %d\n", iResult);
			}
			else {
				ZeroMemory(&hints, sizeof(hints));
				hints.ai_family = AF_INET;
				hints.ai_socktype = SOCK_STREAM;
				hints.ai_protocol = IPPROTO_TCP;
			}
			// printf("ok, create success\n");
		}

		// connect the upstream tcp server
		// params host, port, token
		int connectServer(char* host, char* port, char* token) {
			if (getAddrInfo(host, port) != 0) {
				// printf("getaddrinfo failed\n");
				return 1;
			}
			ptr = result;
			ConnectSocket = socket(ptr->ai_family, ptr->ai_socktype, ptr->ai_protocol);

			if (ConnectSocket == INVALID_SOCKET) {
				// printf("Error at socket(): %ld\n", WSAGetLastError());
				freeaddrinfo(result);
				WSACleanup();
				return 1;
			}

			if (connect(ConnectSocket, ptr->ai_addr, (int)ptr->ai_addrlen) == SOCKET_ERROR) {
				closesocket(ConnectSocket);
				ConnectSocket = INVALID_SOCKET;
				freeaddrinfo(result);
				// printf("Unable to connect to server!\n");
				WSACleanup();
				return 1;
			}
				// printf("ok, connect success\n");
			string connectMsg = "@connect:" + (string)token;
			if (send(ConnectSocket, connectMsg.c_str(), connectMsg.length(), 0) == SOCKET_ERROR) {
				// printf("send connect message failed!");
				return 1;
			}

			return 0;
		}

		int sendStart() {
			string startMsg = "@start";
			if (send(ConnectSocket, startMsg.c_str(), startMsg.length(), 0) == SOCKET_ERROR) {
				// printf("send start message failed!");
				return 1;
			}

			return 0;
		}

		int sendStop() {
			string stopMsg = "@stop";
			if (send(ConnectSocket, stopMsg.c_str(), stopMsg.length(), 0) == SOCKET_ERROR) {
				// printf("send stop message failed!");
				return 1;
			}

			return 0;
		}

		int sendBuf(string paramName, string data) {
			map<string, msgBuf>::iterator itr;
			itr = msgBufMap.find(paramName);
			if (itr == msgBufMap.end()) {
				// printf("field buf not exist!\n");
				return 1;
			}

			string message = "@data:" + paramName + ":" + data;

			switch(itr->second.now) {
				case 1:
					while (itr->second.lock_1);
					itr->second.lock_1 = true;
					itr->second.buf_1.append(message);
					itr->second.lock_1 = false;
					break;

				case 2:
					while (itr->second.lock_2);
					itr->second.lock_2 = true;
					itr->second.buf_2.append(message);
					itr->second.lock_2 = false;
					break;
			}
			return 0;
		}




		// get thread function data struct
		threadData getThreadData(int bufLength) {
			threadData tData = {
				&msgBufMap,
				&stop,
				&ConnectSocket,
				&bufLength
			};
			return tData;
		}

		// stop send thread
		int stopSend() {
			stop = true;
			return 0;
		}

		// registe param
		void registerParam(string paramName) {
			msgBufMap.insert(std::pair<string, msgBuf>(paramName, msgBuf{ false, false, "", "", 1 }));
			// printf("map size %d\n", msgBufMap.size());
		}
	};
}
