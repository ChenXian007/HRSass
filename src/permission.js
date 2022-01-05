import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) { // 有token
    if (to.path === '/login') { // 有token，去登陆页。免登录
      console.log(111)
      next('/')
    } else { // 有token，去非登陆页
      if (!store.getters.userId) {
        console.log('刷新会经过这')
        await store.dispatch('user/getInfo') // 获取资料
      }
      next()
    }
  } else { // 无token
    if (whiteList.includes(to.path)) { // 无token，去白名单
      next()
    } else { // 无token，去非白名单
      next('/login')
    }
  }
  NProgress.done()
  console.log(123)
})

// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
