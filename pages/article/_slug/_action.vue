<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="jsonData.title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="jsonData.description"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="jsonData.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keyup.enter="tagEnter"
                  />
                  <div class="tag-list">
                    <span
                      v-for="tag,index in jsonData.tagList"
                      :key="index"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </fieldset>
              </fieldset>
            </form>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
              @click="submit"
            >
              {{ addFlag ? 'Publish Article' : 'Edit Article' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiAddArticle,
  apiGetArticle,
  apiUpdateArticle,
} from "@/api"

export default {
  name: "articleAddEdit",
  layout: "indexLayout",
  data(){
    return {
      addFlag: true,
      slug: '',
      jsonData: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tag: '',
    }
  },
  computed: {
    isEdit(){
      return !this.addFlag
    }
  },
  methods: {
    addArticle(){
      apiAddArticle({article: this.jsonData}).then(res=>{
        console.log("apiAddArticle", res)
        alert("添加成功！")
        this.$router.push({
          name: 'article-slug',
          params: {
            slug: res.article.slug
          }
        })
      }).catch(err=>{
        console.log("apiAddArticle err", err)
      })
    },
    updateArticle(){
      apiUpdateArticle(this.slug, {article: this.jsonData}).then(res=>{
        console.log("apiUpdateArticle", res)
        alert("更新成功！")
        this.$router.push({
          name: 'article-slug',
          params: {
            slug: res.article.slug
          }
        })
      }).catch(err=>{
        console.log("apiUpdateArticle err", err)
      })
    },
    getArticle(){
      apiGetArticle(this.slug).then(res=>{
        console.log("apiGetArticle", res)
        this.jsonData.title = res.article.title
        this.jsonData.description = res.article.description
        this.jsonData.body = res.article.body
        this.jsonData.tagList = res.article.tagList
      }).catch(err=>{
        console.log("apiGetArticle err", err)
      })
    },
    submit(){
      console.log("submit ")
      if (this.isEdit){
        this.updateArticle()
      }else{
        this.addArticle()
      }
    },
    tagEnter(){
      this.jsonData.tagList.push(this.tag)
      this.tag = ''
    }
  },
  mounted(){
    let slug = this.$route.params.slug
    if (slug !== '' || slug !== '_'){
      this.slug = slug
    }
    this.addFlag = this.$route.params.action === 'add'

    if (this.isEdit){
      this.getArticle()
    }
  }
}
</script>
