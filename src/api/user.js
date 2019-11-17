import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  const {
    phone,
    password
  } = data
  data = Object.assign({}, {
    loginName: phone,
    loginPassword: password
  })
  data = qs.stringify(data)
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserByToken',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function uploadFile(file) {
  var data = new FormData()
  data.append('file', file)
  return request({
    url: '/upload/fileUpload',
    method: 'post',
    data
  })
}

export function insetBanner(data) {
  data = qs.stringify(data)
  return request({
    url: 'shuffling/saveValid',
    method: 'post',
    data
  })
}

export function getBannerList(data) {
  data = qs.stringify(data)
  return request({
    url: '/shuffling/queryAll',
    method: 'post',
    data
  })
}

export function getUploadDataList(data) {
  data = qs.stringify(data)
  return request({
    url: '/product/queryUserDownload',
    method: 'post',
    data
  })
}

export function getImage(data) {
  data = qs.stringify(data)
  return request({
    url: '/upload/download',
    method: 'post',
    data
  })
}
