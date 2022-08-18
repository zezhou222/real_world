<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link exact class="navbar-brand" :to="{name: 'index'}">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <template v-if="loginFlag">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <nuxt-link exact class="nav-link" :to="{name: 'index'}">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'article-slug-action', params: {slug: '_', action: 'add'}}">
                <i class="ion-compose"></i>&nbsp;New Article
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'settings'}">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'profile-username', params: {username: $store.state.user.user.username}}">
                <i class="ion-gear-a"></i>&nbsp;{{ $store.state.user.user.username }}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'login',
                }"
                >Sign in</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'register',
                }"
                >Sign up</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <nuxt></nuxt>

    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loginFlag: 'user/loginFlag'
    })
  }
}
</script>


