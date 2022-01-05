import { getToken, setToken, removeToken, setTimeStamps } from '@/utils/auth'
import { login, getInfo, getBaeInfoById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken(), // 读取本地
    userInfo: {}
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token
      setToken(token) // 存储在本地
    },
    // 清除token
    removeToken(state) {
      state.token = null
      removeToken()
    },
    // 设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload // 响应式
      // state.userInfo = { ...payload }// 响应式
      // state.userInfo['username'] = result //不是响应式
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 调用获取token,登陆接口
    async loginToken(context, payload) {
      // 这儿不用try-catch，否则外层捕获不到
      const result = await login(payload)
      context.commit('setToken', result)
      setTimeStamps()
    },
    // 调用获取用户信息
    async getInfo(context) {
      const result = await getInfo()
      const obj = await getBaeInfoById(result.userId)
      context.commit('setUserInfo', { ...result, ...obj })
      return result
    },
    // 登出
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    }
  }

}
