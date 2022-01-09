import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamps } from '@/utils/auth'

const timeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (store.getters.token) {
      if (isTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token过期了'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 状态码2XX
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      // console.log(response.status)
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  // 状态码非2XX
  error => {
    console.log('状态码非2XX')
    // error 信息 里面 response的对象
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login')
    } else {
      Message.error(error.message) // 提示错误信息 // test
    }
    return Promise.reject(error)
  })

// 检测时效
function isTimeOut() {
  const presentTime = Date.now()
  const tokenTime = getTimeStamps()
  return (presentTime - tokenTime) / 1000 > timeOut
}
export default service
