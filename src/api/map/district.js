import request from '@/utils/request'

// 查询行政区划列表
export function listDistrict(query) {
  return request({
    url: '/map/district/list',
    method: 'get',
    params: query
  })
}

// 查询行政区划详细
export function getDistrict(id) {
  return request({
    url: '/map/district/' + id,
    method: 'get'
  })
}

// 新增行政区划
export function addDistrict(data) {
  return request({
    url: '/map/district',
    method: 'post',
    data: data
  })
}

// 修改行政区划
export function updateDistrict(data) {
  return request({
    url: '/map/district',
    method: 'put',
    data: data
  })
}

// 删除行政区划
export function delDistrict(id) {
  return request({
    url: '/map/district/' + id,
    method: 'delete'
  })
}

// 导出行政区划
export function exportDistrict(query) {
  return request({
    url: '/map/district/export',
    method: 'get',
    params: query
  })
}