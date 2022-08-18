<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>

          <div class="article-meta">
            <nuxt-link :to="{
              name: 'profile-username',
              params: {
                username: article.author.username
              }
            }"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                name: 'profile-username',
                params: {
                  username: article.author.username
                }
              }">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date }}</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary"
              :class="{active: article.author.following}"
              @click="followClick({}, article.author)"
              v-if="!isMe"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author.username }}
              <!-- <span class="counter">(10)</span> -->
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary"
              :class="{active: article.favorited}"
              @click="favoriteClick(article)"
              v-if="!isMe"
            >
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <!-- <p>
              Web development technologies have evolved at an incredible clip
              over the past few years.
            </p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p> -->
            <div>{{ article.body }}</div>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <nuxt-link :to="{
              name: 'profile-username',
              params: {
                username: article.author.username
              }
            }"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                name: 'profile-username',
                params: {
                  username: article.author.username
                }
              }">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date }}</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary"
              :class="{active: article.author.following}"
              @click="followClick({}, article.author)"
              v-if="!isMe"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author.username }} 
              <!-- <span class="counter">(10)</span> -->
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary"
              :class="{active: article.favorited}"
              @click="favoriteClick(article)"
              v-if="!isMe"
            >
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form" @submit.prevent="addArticleComments">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  v-model="commentBody"
                ></textarea>
              </div>
              <div class="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div class="card"
              v-for="comment in comments"
              :key="comment.id"
            >
              <div class="card-block">
                <p class="card-text">
                  {{ comment.body || '' }}
                </p>
              </div>
              <div class="card-footer">
                <nuxt-link class="comment-author"
                  :to="{
                    name: 'profile-username',
                    params: {
                      username: comment.author.username
                    }
                  }"
                >
                  <img
                    :src="comment.author.image"
                    class="comment-author-img"
                  />
                </nuxt-link>
                &nbsp;
                <nuxt-link class="comment-author"
                  :to="{
                    name: 'profile-username',
                    params: {
                      username: comment.author.username
                    }
                  }"
                >{{comment.author.username }}</nuxt-link>
                <span class="date-posted">{{ comment.createdAt | date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiGetArticle,
  apiFavoriteArticle,
  apiUnfavoriteArticle,
  apiFollowUser,
  apiUnfollowUser,
  apiGetArticleComments,
  apiAddArticleComments,
} from "@/api"

export default {
  name: "articlePage",
  layout: "indexLayout",
  middleware: 'authenticated',
  async asyncData({params}){
    let slug = params.slug

    let article = {}
    let comments = []
    try{  
      [{article}, {comments}] = await Promise.all([
        apiGetArticle(slug),
        apiGetArticleComments(slug),
      ])
    }catch(err){
      console.log("try err", err)
    }
    // console.log("apiGetArticle", article)
    console.log("apiGetArticleComments", comments)
    return {
      slug,
      article,
      comments,
    }
  },
  data(){
    return {
      commentBody: ''
    }
  },
  computed: {
    isMe(){
      return this.article.author.username === this.$store.state.user.user.username
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
    addArticleComments(){
      apiAddArticleComments(this.slug, {"comment": {"body": this.commentBody}}).then(res=>{
        console.log("apiAddArticleComments", res)
        this.commentBody = ''
        alert("评论添加成功！")
        apiGetArticleComments(this.slug).then(res=>{
          this.comments = res.comments
        })
      }).catch(err=>{
        console.log("apiAddArticleComments err", err)
      })
    }
    
  },
};
</script>
