import store from '@/store'
export default {
  methods: {
    checkPermission(key) {
    //   console.log(store)
      const { roles } = store.state.user.userInfo
      if (roles && roles.points) {
        return roles.points.includes(key)
      }
      return false
    }
  }
}
