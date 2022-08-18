const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: {}
})

export const getters = {
  loginFlag(state){
    return state.user.token !== undefined
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    // 保存至cookie
    if (process.client){
      Cookie.set('user', JSON.stringify(state.user))
    }
  },
  clearUser(state){
    state.user = {}
    if (process.client){
      Cookie.remove('user')
    }
  }
}

export const actions = {

}
