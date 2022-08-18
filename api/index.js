import {request} from '@/plugins/request.js'

let prefix = '/api'

export function apiLogin(data){
  return request(`${prefix}/users/login`, data)
}

export function apiRegister(data){
  return request(`${prefix}/users`, data)
}

export function apiArticlesList(data){
  return request(`${prefix}/articles`, data, 'GET')
}

export function apiFeedArticlesList(data){
  return request(`${prefix}/articles/feed`, data, 'GET')
}

export function apiTag(data){
  return request(`${prefix}/tags`, data, 'GET')
}

export function apiFavoriteArticle(data){
  return request(`${prefix}/articles/${data}/favorite`)
}

export function apiUnfavoriteArticle(data){
  return request(`${prefix}/articles/${data}/favorite`,{}, 'DELETE')
}

export function apiGetCurrentUser(){
  return request(`${prefix}/user`, {}, 'GET')
}

export function apiProfile(username){
  return request(`${prefix}/profiles/${username}`, {}, 'GET')
}


export function apiUpdateUser(data){
  return request(`${prefix}/user`, data, 'PUT')
}

export function apiFollowUser(username){
  return request(`${prefix}/profiles/${username}/follow`)
}

export function apiUnfollowUser(username){
  return request(`${prefix}/profiles/${username}/follow`,{}, 'DELETE')
}

export function apiGetArticle(slug){
  return request(`${prefix}/articles/${slug}`, {}, 'GET')
}

export function apiGetArticleComments(slug){
  return request(`${prefix}/articles/${slug}/comments`, {}, 'GET')
}

export function apiAddArticleComments(slug, data){
  return request(`${prefix}/articles/${slug}/comments`, data)
}

export function apiAddArticle(data){
  return request(`${prefix}/articles`, data)
}

export function apiUpdateArticle(slug, data){
  return request(`${prefix}/articles/${slug}`, data, 'PUT')
}
