import Loadable from 'react-loadable';
import Loading from 'components/loading';
import TopLayout  from 'layout/topLayout';
import MainLayout  from 'layout/mainLayout';
import UserLayout from 'layout/UserLayout';
// import BasicLayout from 'layout/BasicLayout';

const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
const Login=Loadable({loader:() => import('../pages/UserLogin'),loading: Loading});
const Register=Loadable({loader:() => import('../pages/UserRegister'),loading: Loading});
const User=Loadable({loader:() => import('../pages/user'),loading: Loading});
const All=Loadable({loader:() => import('../pages/all'),loading: Loading});
const Article=Loadable({loader:() => import('../pages/article'),loading: Loading});

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
		path: '*',
    layout: TopLayout,
    component: Page404,
  },
  // {
  //   path: '/manager',
  //   layout: BasicLayout,
  //   children:[
  //     {
  //       path:'/register',
  //       layout: null,
  //       component: Register,
  //     },
  //   ]
  // },
];


export default routerConf;
