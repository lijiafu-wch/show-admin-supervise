import request from '@/utils/request'

// 查询行业分类列表
export function listBusinessCategory(query) {
  return request({
    url: '/map/businessCategory/list',
    method: 'get',
    params: query
  })
}

// 查询行业分类详细
export function getBusinessCategory(id) {
  return request({
    url: '/map/businessCategory/' + id,
    method: 'get'
  })
}

// 新增行业分类
export function addBusinessCategory(data) {
  return request({
    url: '/map/businessCategory',
    method: 'post',
    data: data
  })
}

// 修改行业分类
export function updateBusinessCategory(data) {
  return request({
    url: '/map/businessCategory',
    method: 'put',
    data: data
  })
}

// 删除行业分类
export function delBusinessCategory(id) {
  return request({
    url: '/map/businessCategory/' + id,
    method: 'delete'
  })
}

// 导出行业分类
export function exportBusinessCategory(query) {
  return request({
    url: '/map/businessCategory/export',
    method: 'get',
    params: query
  })
}