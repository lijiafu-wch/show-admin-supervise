/*
 * @Author: your name
 * @Date: 2020-11-29 12:17:34
 * @LastEditTime: 2020-11-29 21:27:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /show-admin-supervise/src/api/index/index.js
 */
import request from '@/utils/request'

// 商家经营状态数量
export function getNum(query) {
  return request({
    url: 'map/home/merchantInfo/num',
    method: 'GET',
    params: query
  })
}

// 行业分类数量统计
export function getCategory(data) {
    return request({
      url: '/map/home/category/num',
      method: 'GET',
      params: data
    })
  }

  // 获取营业状态list
export function getStatus(query) {
  return request({
    url: '/map/home/operation/num',
    method: 'GET',
    params: query
  })
}
// 网店list
export function getStore(query) {
  return request({
    url: '/map/home/county/store/num',
    method: 'GET',
    params: query
  })
}

export function getTransport(query) {
  return request({
    url: '/map/home/county/transport/num',
    method: 'GET',
    params: query
  })
}


