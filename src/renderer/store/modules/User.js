const state = {
  uuid: '',
  phone: '',
  userExtend: {},
  avatarURL: ''
}

const mutations = {
  SET_UUID(state, payload) {
    state.uuid = payload;
  },
  SET_PHONE(state, payload) {
    state.phone = payload;
  },
  SET_AVATAR(state, payload) {
    state.avatarURL = payload;
  },
  SET_EXTEND(state, payload) {
    state.userExtend = payload;
  }
}

const actions = {
  setUser({ commit }, payload) {
    commit('SET_UUID', payload.uuid);
    commit('SET_PHONE', payload.phone);
    commit('SET_AVATAR', payload.avatarURL);
    commit('SET_EXTEND', payload.userExtend);
  },
  clearUserData({ commit }) {
    commit('SET_UUID', '');
    commit('SET_PHONE', '');
    commit('SET_AVATAR', '');
    commit('SET_EXTEND', {});
  }
}

export default {
  state,
  mutations,
  actions
}
