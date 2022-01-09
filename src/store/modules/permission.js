import { constantRoutes, asyncRoutes } from '@/router/index'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
    // console.log(state.routes)
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = asyncRoutes.filter(v => {
      return menus.includes(v.name)
    })
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
