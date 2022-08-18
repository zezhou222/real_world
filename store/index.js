const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    console.log("vuex user server init.")
    if (req.headers.cookie) {
      let user = {}
      let parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
        console.log("???", err)
      }
      // console.log("set user", user)
      commit('user/setUser', user)
    }
  }
}