import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const timeStamp = 'hrsass-time'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamps() {
  return Cookies.get(timeStamp)
}
// 设置时间戳
export function setTimeStamps() {
  return Cookies.set(timeStamp, Date.now())
}
