const state = {
  product: ''
}

const mutations = {
  SET_PRODUCT: (state, product) => {
    state.product = product
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
