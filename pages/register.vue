<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <nuxt-link :to="{
                name: 'login'
              }">Have an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <!-- <li>That email is already taken</li> -->
              <li
                v-for="(v, k) in errors"
                :key="k"
              >
                That {{ k }} {{ v }}
              </li>
            </ul>

            <form @submit.prevent="register">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="jsonData.username"
                />
              </fieldset>
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
              <button
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRegister } from "@/api/index"

export default {
  name: "register",
  data() {
    return {
      jsonData: {
        "username": "",
        "email": "",
        "password": ""
      },
      errors: {},
    }
  },
  methods: {
    register() {
      apiRegister({user: this.jsonData}).then(res=>{
        console.log("register res", res)
        this.$store.commit('user/setUser', res.user)
        this.$router.push('/')
      }).catch(err=>{
        console.log("register err", err)
        this.errors = err.response.data.errors
      })
    }
  },
};
</script>
