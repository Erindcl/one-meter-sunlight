// 菜单配置

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home',
    children: [
      {
        name: '监控页',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: '文章管理',
    path: '/post',
    icon: 'copy',
    children: [
      { name: '文章列表', path: '/post/list' },
      { name: '添加文章', path: '/post/create' },
    ],
  },
  {
    name: '分类管理',
    path: '/cate',
    icon: 'appstore',
    children: [
      { name: '分类列表', path: '/cate/list' },
      { name: '添加分类', path: '/cate/create' },
    ],
  },
  {
    name: '用户管理',
    path: '/users',
    icon: 'user',
    children: [
      { name: '用户列表', path: '/users/list' },
      { name: '添加用户', path: '/users/create' },
      { name: '修改密码', path: '/users/pwd' },
    ],
  },
  {
    name: '通用设置',
    path: '/setting',
    icon: 'setting',
    children: [
      { name: '基础设置', path: '/setting/basic' }
    ],
  },
];

export { asideMenuConfig };
