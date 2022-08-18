import axios from 'axios'

const myRequest = axios.create({
  withCredentials: true,
  timeout: 30 * 1000,
})

export const request = (url, data, method='POST') => {
  if (process.server){
    url = 'http://realworld.api.fed.lagounews.com' + url
    // console.log("server requests, url change", url)
  }
  let reqDict = {
    url,
    method
  }
  if (method === 'GET'){
    reqDict.params = data
  }else{
    reqDict.data = {
      ...data,
      
    }
  }
  return myRequest(reqDict)
}

export default function ({store}){
  console.log("axios plugin run.")
  // 请求拦截
  myRequest.interceptors.request.use(config=>{
    console.log("config url", config.url)
    // token携带
    config.headers['Authorization'] = `Token ${store.state.user.user.token || ''}`
    // console.log("requests config", config)
    return config
  },err=>{
    return Promise.reject(err)
  })

  // 响应拦截
  myRequest.interceptors.response.use(res=>{
    // console.log("interceptors res", res)
    // 正常情况
    return res.data || res
  },err=>{
    return Promise.reject(err)
  })
}
