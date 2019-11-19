import request from '@/utils/request'
import qs from 'qs'

export function insetProduct(data) {
  data = qs.stringify(data)
  return request({
    url: 'product/saveProduct',
    method: 'post',
    data
  })
}

export function getProductList(data) {
  data = qs.stringify(data)
  return request({
    url: 'product/queryProductByPage',
    method: 'post',
    data
  })
}

export function getProductDelete(data) {
  data = qs.stringify(data)
  return request({
    url: 'product/deleteProduct',
    method: 'post',
    data
  })
}
