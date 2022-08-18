import axios from 'axios'

const myRequest = axios.create({
  withCredentials: true,
  timeout: 30 * 1000,
})

export const request = (url, data, method='POST') => {
  if (process.server){
    url = 'http://realworld.api.fed.lagounews.com' + url
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
    // token携带
    config.headers['Authorization'] = `Token ${store.state.user.user.token || ''}`
    // console.log("requests config", config)
    return config
  },err=>{
    return Promise.reject(err)
  })

  // 响应拦截
  myRequest.interceptors.response.use(res=>{
    // 正常情况
    return res.data
  },err=>{
    return Promise.reject(err)
  })
}
