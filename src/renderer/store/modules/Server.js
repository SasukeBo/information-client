const state = {
  status: 'close',
  logs: []
}

const mutations = {
  SET_STATUS(state, payload) {
    state.status = payload
  },
  PUSH_LOG(state, payload) {
    state.logs.unshift({ time: new Date(), ...payload })
  }
}

const actions = {
  changeStatus({ commit }, payload) {
    commit('SET_STATUS', payload);
  },
  log({ commit }, payload) {
    commit('PUSH_LOG', payload);
  },
}

export default {
  state,
  mutations,
  actions
}
