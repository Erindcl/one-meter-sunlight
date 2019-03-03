import Loadable from 'react-loadable';
import Loading from 'components/loading';
import TopLayout  from 'layout/topLayout';
import MainLayout  from 'layout/mainLayout';
const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
const Login=Loadable({loader:() => import('../pages/auth/login'),loading: Loading});
const Register=Loadable({loader:() => import('../pages/auth/register'),loading: Loading});
const User=Loadable({loader:() => import('../pages/user'),loading: Loading});
const All=Loadable({loader:() => import('../pages/all'),loading: Loading});

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
    path: '/user',
    layout: MainLayout,
    component: User,
  },
  {
   path:'/login',
   layout: null,
   component: Login,
  },
  {
    path:'/register',
    layout: null,
    component: Register,
   },
		{
		path: '*',
    layout: TopLayout,
    component: Page404,
  }
];

export default routerConf;
