export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'real_world',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/static/main.css",
    "@/static/index.css",
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: ["@nuxtjs/axios"],
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    "/api": {
      target: "http://realworld.api.fed.lagounews.com",
      pathRewrite: {
        changeOrigin: true,
      }
    }
  },
  build: {
    vendor: ["axios"]
  },
  router: {
    linkActiveClass: 'active'
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/date.js',
  ],
}