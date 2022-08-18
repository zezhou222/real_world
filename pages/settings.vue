<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="updateUser">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    v-model="jsonData.image"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    v-model="jsonData.username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="jsonData.bio"
                  ></textarea>
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
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <button class="btn btn-sm btn-warning" @click="logout">logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiProfile,
  apiUpdateUser,
} from '@/api'

export default {
  name: "settingsPage",
  layout: "indexLayout",
  middleware: 'authenticated',
  data(){
    return {
      jsonData: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      }
    }
  },
  methods: {
    getProfile(){
      let username = this.$store.state.user.user.username
      apiProfile(username).then(res=>{
        console.log("apiProfile", res)
        this.jsonData.image = res.profile.image
        this.jsonData.username = username
        this.jsonData.bio = res.profile.bio
        this.jsonData.email = this.$store.state.user.user.email
      }).catch(err=>{
        console.log("apiProfile", err)
      })
    },
    updateUser(){
      apiUpdateUser({
        "user":{
          "email": this.jsonData.email,
          "bio": this.jsonData.bio,
          "image": this.jsonData.image
        }
      }).then(res=>{
        console.log("apiUpdateUser", res)
        alert("修改成功！！")
      }).catch(err=>{
        console.log("apiUpdateUser", err)
      })
    },
    logout(){
      this.$store.commit('user/clearUser')
      this.$router.push('/')
    }
  },
  created(){

  },
  mounted(){
    this.getProfile()
  }
}
</script>
