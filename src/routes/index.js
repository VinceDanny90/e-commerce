import {createRouter, createWebHistory} from 'vue-router';

import { useUserStore } from '../store/UserStore'

import HomePage from '../pages/HomePage.vue'
import Categories from '../pages/Categories.vue'
import ProductPage from '../pages/ProductPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import CartPage from '../pages/CartPage.vue'



import DashBoardPage from '../pages/DashBoardPage.vue'
import AdminDashBoard from '../pages/AdminDashboard.vue'
import AdminProductPage from '../pages/AdminProductPage.vue'

import NotFound from '../pages/NotFound.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:id?",
            name: "HomePage",
            component: HomePage,
        },
        {
            path: "/categories/:id",
            name: "categories",
            component: Categories,
        },
        {
            path: "/product/:id",
            name: "productPage",
            component: ProductPage,
        },
        {
            path: "/signUpPage",
            name: "signUpPage",
            component: SignUpPage,
        },
        {
            path: "/loginPage",
            name: "loginPage",
            component: LoginPage,
        },
        {
            path: "/dashBoard",
            name: "dashBoard",
            component: DashBoardPage,
            children:[{
                path:"",
                name: "AdminDashBoard",
                component: AdminDashBoard,
            },{
                path: "Products",
                name: "AdminProductPage",
                component: AdminProductPage,
            }],
            meta: {
                middleware: "auth",
            },
        },
        {
            path: "/carrello",
            name: "cartPage",
            component: CartPage,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFound,
        },
    
    ],
});

router.beforeEach((to,from,next)=>{
    const UserStore = useUserStore();
    if(to.meta.middleware === "auth" && !UserStore.isLoggenIn) next({name: 'LoginPage'});
    else next();
})

export default router;