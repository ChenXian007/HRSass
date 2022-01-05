import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function getBaeInfoById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

