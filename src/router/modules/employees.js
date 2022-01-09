import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  },
  {
    path: 'detail/:id?',
    hidden: true,
    component: () => import('@/views/employees/detail'),
    meta: {
      title: '员工详情'
    }
  },
  {
    path: 'print/:id?',
    hidden: true,
    component: () => import('@/views/employees/print'),
    meta: {
      title: '打印信息'
    }
  }
  ]
}
