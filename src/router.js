import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";
import AllowLoginPage from "./utils/AllowLoginPage";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/home',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/app/home'),
        redirect: '/home',
        children: [
          { path: '/', component: () => import(/* webpackChunkName: "home" */ './views/app/home/index') }
        ]
      },
      {
        path: 'mybooks/books',
        component: () => import(/* webpackChunkName: "books" */ './views/app/books'),
        redirect: '/books',
        children: [
          { path: 'view-books', component: () => import(/* webpaChunkName: "books" */ './views/app/books/ViewBooks') },
          { path: 'add-books', component: () => import(/* webpackChunkName: "books" */ './views/app/books/AddBooks') }
        ]
      },
      {
        path: 'app/second-menu',
        component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu'),
        redirect: '/app/second-menu/second',
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu/Second') }
        ]
      },
      {
        path: 'app/single',
        component: () => import(/* webpackChunkName: "single" */ './views/app/single')
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    beforeEnter: AllowLoginPage,
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
