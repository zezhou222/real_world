<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <!-- disabled -->
                  <nuxt-link exact class="nav-link" :to="{
                      name: 'index',
                      query: {
                        tab: 'feed',
                      }
                    }"
                    :class="{
                      'active': tab === 'feed'
                    }"
                  >Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link exact class="nav-link" :to="{
                      name: 'index'
                    }"
                    :class="{
                      'active': (tab === '' || tab === undefined) && tag === undefined
                    }"
                  >Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link exact class="nav-link" :to="{
                      name: 'index',
                      query: {
                        tag
                      }
                    }"
                    :class="{
                      'active': tag
                    }"
                  ># {{ tag }}</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview"
              v-for="article in articleList"
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
            </div>

          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <!-- <a href="" class="tag-pill tag-default">programming</a> -->
                <nuxt-link
                  class="tag-pill tag-default"
                  v-for="tag, index in tagList"
                  :key="index"
                  :to="{
                    name: 'index',
                    query: {
                      tag: tag
                    }
                  }"
                >
                  {{ tag }}
                </nuxt-link>
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
            name: 'index',
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
  apiArticlesList,
  apiFeedArticlesList,
  apiTag,
  apiFavoriteArticle,
  apiUnfavoriteArticle,
} from "@/api"

export default {
  name: "IndexPage",
  layout: "indexLayout",
  async asyncData({query}){
    console.log("index page asyncData", query)
    let tab = query.tab
    let page = parseInt(query.page || 1)
    let tag = query.tag || ''
    let limit = 10
    let searchData = {
      limit,
      offset: (page - 1) * limit,
      tag,
    }
    let articleSum = 0
    let articleList = []
    let tagList = []

    try{
      let [resAritcle, resTag] = await Promise.all([
        tab === 'feed' ? apiFeedArticlesList(searchData) : apiArticlesList(searchData),
        apiTag(),
      ])
      // console.log("apiArticlesList", resAritcle)
      articleList = resAritcle.articles
      articleSum = resAritcle.articlesCount
      // console.log("apiTag", resTag)
      tagList = resTag.tags.slice(0, 10)
    }catch(err){
      console.log("err", err)
    }

    return {
      tab,
      page,
      tag,
      searchData,
      articleList,
      articleSum,
      tagList,
    }
  },
  data(){
    return {

    }
  },
  watchQuery: ['tag', 'page', 'tab'],
  computed: {
    pageNum(){
      return Math.ceil(this.articleSum / this.searchData.limit)
    }
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
    }
  },
  mounted(){
    console.log("index page")
  }
};
</script>

<style scoped>

</style>
