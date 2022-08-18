<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <!-- <p>
                Cofounder @GoThinkster, lived in Aol's HQ for a few months,
                kinda looks like Peeta from the Hunger Games
              </p> -->
              <button class="btn btn-sm btn-outline-secondary action-btn"
                :class="{
                  active: profile.following
                }"
                @click="followClick"
                v-if="!isMe"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ profile.username }}
              </button>
              <button class="btn btn-sm btn-outline-secondary action-btn"
                @click="$router.push({
                  name: 'settings'
                })"
                v-else
              >
                <i class="ion-plus-round"></i>
                &nbsp; Settings {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link class="nav-link" exact :to="{
                    name: 'profile-username',
                    params: {
                      username
                    }
                  }">My Articles</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link class="nav-link" exact :to="{
                    name: 'profile-username',
                    params: {
                      username
                    },
                    query: {
                      tab: 'favorited'
                    }
                  }">Favorited Articles</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link href="profile.html"
                  :to="{
                    name: 'profile-username',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  <img :src="article.author.image"/>
                </nuxt-link>
                <div class="info">
                  <nuxt-link class="author"
                    :to="{
                      name: 'profile-username',
                      params: {
                        username: article.author.username
                      }
                    }"
                  >{{ article.author.username }}</nuxt-link>
                  <span class="date">{{ article.createdAt | date }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited
                  }"
                  @click="favoriteClick(article)"
                  v-if="!isMe"
                >
                  <i class="ion-heart"></i> 赞 {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link class="preview-link"
                :key="article.slug"
                :to="{
                  name: 'article-slug',
                  params: {
                    slug: article.slug
                  }
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <p>
                  <span
                    class="tag-pill tag-default"
                    v-for="itemTag in article.tagList"
                    :key="itemTag"
                  >
                    {{ itemTag }}
                  </span>
                </p>
                <span>Read more...</span>
              </nuxt-link>

               <div v-if="isMe">
                <button @click="$router.push({
                  name: 'article-slug-action',
                  params: {
                    slug: article.slug,
                    action: 'edit'
                  }
                })">Edit Article</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-num">
        <nuxt-link
          exact
          v-for="num in pageNum"
          :key="num"
          :to="{
            name: 'profile-username',
            params: {
              username,
            },
            query: {
              page: num,
            }
          }"
          :class="{
            active: page === num
          }"
        >
          {{ num }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiProfile,
  apiArticlesList,
  apiFavoriteArticle,
  apiUnfavoriteArticle,
  apiFollowUser,
  apiUnfollowUser,
} from "@/api"

export default {
  name: "profilePage",
  layout: "indexLayout",
  middleware: 'authenticated',
  async asyncData({params, query}){
    let username = params.username
    let tab = query.tab
    let page = parseInt(query.page || 1)
    let limit = 10
    let searchData = {
      author: username,
      limit,
      offset: (page - 1) * limit,
    }
    if (tab === 'favorited'){
      searchData.favorited = username
    }

    let profile = {}
    let articles = []
    let articlesCount = 0
    try{  
      [{profile}, {articles, articlesCount}] = await Promise.all([
        apiProfile(username),
        apiArticlesList(searchData)
      ])
    }catch(err){
      console.log("try err", err)
    }
    // console.log("apiProfile", profile)
    // console.log("apiArticlesList", articles)
    return {
      searchData,
      page,
      limit,
      tab,
      username,
      profile,
      articles,
      articlesCount,
    }
  },
  watchQuery: ['page', 'tab'],
  computed: {
    pageNum(){
      return Math.ceil(this.articlesCount / this.searchData.limit)
    },
    isMe(){
      return this.profile.username === this.$store.state.user.user.username
    },
  },
  methods: {
    favoriteClick(article){
      console.log("favoriteClick", article, article.favorited)
      let nowFlag = article.favorited
      let func = nowFlag ? apiUnfavoriteArticle : apiFavoriteArticle
      func(article.slug).then(res=>{
        console.log(nowFlag ? 'apiUnfavoriteArticle': 'apiFavoriteArticle', res)
        article.favorited = res.article.favorited
        article.favoritesCount = res.article.favoritesCount
      }).catch(err=>{
        console.log("apiFavoriteArticle err", err)
      })
    },
    followClick(_, profile=this.profile){
      console.log("followClick", profile)
      let nowFlag = profile.following
      let func = nowFlag ? apiUnfollowUser : apiFollowUser
      func(profile.username).then(res=>{
        console.log(nowFlag ? 'apiUnfollowUser': 'apiFollowUser', res)
        profile.following = res.profile.following
      }).catch(err=>{
        console.log("apiFollowUser err", err)
      })
    },
  },
}
</script>
