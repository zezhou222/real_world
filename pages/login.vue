<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <nuxt-link :to="{
                name: 'register'
              }">Do't have an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <li
                v-for="(v, k) in errors"
                :key="k"
              >
                That {{ k }} {{ v }}
              </li>
            </ul>

            <form @submit.prevent="login">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="jsonData.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="jsonData.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiLogin } from "@/api/index"

export default {
  name: "login",
  middleware: 'notAuthenticated',
  data() {
    return {
      jsonData: {
        "email": "",
        "password": ""
      },
      errors: {},
    }
  },
  methods: {
    login() {
      apiLogin({user: this.jsonData}).then(res=>{
        console.log("login res", res)
        this.$store.commit('user/setUser', res.user)
        this.$router.push('/')
      }).catch(err=>{
        console.log("login err", err)
        this.errors = err.response.data.errors
      })
    }
  },
};
</script>
