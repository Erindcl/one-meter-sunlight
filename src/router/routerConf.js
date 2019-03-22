import Loadable from 'react-loadable';
import Loading from 'components/loading';
import MainLayout  from 'layout/mainLayout';
import UserLayout from 'layout/UserLayout';
import BasicLayout from 'layout/BasicLayout';

const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
const Login=Loadable({loader:() => import('../pages/UserLogin'),loading: Loading});
const Register=Loadable({loader:() => import('../pages/UserRegister'),loading: Loading});
const User=Loadable({loader:() => import('../pages/user'),loading: Loading});
const All=Loadable({loader:() => import('../pages/all'),loading: Loading});
const Article=Loadable({loader:() => import('../pages/article'),loading: Loading});

// 后台管理
const Dashboard = Loadable({loader:() => import('../pages/Dashboard'),loading: Loading});
const PostList = Loadable({loader:() => import('../pages/PostList'),loading: Loading});
const CreatePost = Loadable({loader:() => import('../pages/CreatePost'),loading: Loading});
const CateList = Loadable({loader:() => import('../pages/CateList'),loading: Loading});
const CreateCate = Loadable({loader:() => import('../pages/CreateCate'),loading: Loading});
const UserList = Loadable({loader:() => import('../pages/UserList'),loading: Loading});
const CreateUser = Loadable({loader:() => import('../pages/CreateUser'),loading: Loading});
const EditPassword = Loadable({loader:() => import('../pages/EditPassword'),loading: Loading});
const BasicSetting = Loadable({loader:() => import('../pages/BasicSetting'),loading: Loading});
const NavigationSetting = Loadable({loader:() => import('../pages/NavigationSetting'),loading: Loading});

const routerConf = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    layout: MainLayout,
    component: Home,
    // children:[]
  },
  {
    path: '/all',
    layout: MainLayout,
    component: All,
  },
  {
    path: '/all/:id',
    layout: MainLayout,
    component: Article,
  },
  {
    path: '/user',
    layout: MainLayout,
    component: User,
  },

  {
   path:'/login',
   layout: UserLayout,
   component: Login,
  },
  {
    path:'/register',
    layout: UserLayout,
    component: Register,
  },
  {
    path:'/dashboard/monitor',
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: '/post/list',
    layout: BasicLayout,
    component: PostList,
  },
  {
    path: '/post/create',
    layout: BasicLayout,
    component: CreatePost,
  },
  {
    path: '/cate/list',
    layout: BasicLayout,
    component: CateList,
  },
  {
    path: '/cate/create',
    layout: BasicLayout,
    component: CreateCate,
  },
  {
    path: '/users/list',
    layout: BasicLayout,
    component: UserList,
  },
  {
    path: '/users/create',
    layout: BasicLayout,
    component: CreateUser,
  },
  {
    path: '/users/pwd',
    layout: BasicLayout,
    component: EditPassword,
  },
  {
    path: '/setting/basic',
    layout: BasicLayout,
    component: BasicSetting,
  },
  {
    path: '/setting/navigation',
    layout: BasicLayout,
    component: NavigationSetting,
  },

	{
		path: '*',
    layout: null,
    component: Page404,
  }
];


export default routerConf;
