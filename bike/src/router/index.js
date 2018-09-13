import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Index = ()=>import ('@/components/Index');
const Color = ()=>import ('@/components/Color');
const Detail = ()=>import ('@/components/Detail');
const Img = ()=>import ('@/components/Img');
const Type = ()=>import ('@/components/Type');
const Quotation = ()=>import ('@/components/Quotation');
const Login = ()=>import ('@/components/Login');

const router =  new Router({
    mode:'history', 
    routes: [
        {
            path: '/index',
            name: 'Index',
            component: Index,
        },{
            name:"login",
            path:'/login',
            component:Login
        },{
            path: '/color',
            component: Color
        },{
            path: '/img',
            component: Img
        },{
            path: '/detail',
            component: Detail,
        },{
            path: '/type',
            component: Type
        },{
            path: '/Quotation',
            component: Quotation
        },{
            path:'*',
            redirect: '/index'
        }
    ]
})


router.beforeEach((to, from, next) => {
    let login = localStorage.getItem("login");
    if (!login && to.path !== '/login') {
       next('/login')
    } 
    next();
  });
  export default router;