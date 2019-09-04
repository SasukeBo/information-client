const state = {
  devices: {},
  count: 0
}

const getters = {
  getParamID(state) {
    return (deviceID, sign) => {
      var device = state.devices[deviceID]
      if (device) {
        var index = device.params.findIndex(p => p.sign === sign)
        return device.params[index].id
      }

      return null
    }
  },
  getDevice(state) {
    return (deviceID) => {
      return state.devices[deviceID];
    }
  }
}

const mutations = {
  SET_DEVICE(state, payload) {
    state.devices[payload.id] = payload
  },
  DELETE_DEVICE(state, id) {
    delete state.devices[id];
  },
  INC_COUNT(state) {
    state.count++;
  },
  DEC_COUNT(state) {
    state.count--;
  }
}

const actions = {
  setDevice({ commit }, payload) {
    commit('SET_DEVICE', payload);
    commit('INC_COUNT');
  },
  deleteDevice({ commit }, payload) {
    commit('DELETE_DEVICE', payload);
    commit('DEC_COUNT');
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
