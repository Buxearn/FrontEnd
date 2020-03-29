import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/pages/Home'
import Earn from '../components/pages/Earn'
import Daily from '../components/pages/Daily'
import Giveaway from '../components/pages/Giveaway'
import Payout from '../components/pages/Payout'
import Account from '../components/pages/Account'
import Signin from '../components/pages/Signin'
import AdminLogin from '../components/pages/AdminLogin'
import Admin from '../components/pages/Admin'
import ResellerLogin from '../components/pages/ResellerLogin'
import Reseller from '../components/pages/Reseller'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/earn',
        name: 'Earn',
        component: Earn,
        meta: 'signin'
    },
    {
        path: '/daily',
        name: 'Daily',
        component: Daily,
        meta: 'signin'
    },
    {
        path: '/giveaway',
        name: 'Giveaway',
        component: Giveaway,
        meta: 'signin'
    },
    {
        path: '/payout',
        name: 'Payout',
        component: Payout,
        meta: 'signin'
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: 'signin'
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'admin',
      meta: 'admin',
      component: Admin
    },
    {
      path: '/reseller/login',
      name: 'AdminLogin',
      component: ResellerLogin
    },
    {
      path: '/reseller',
      name: 'admin',
      meta: 'reseller',
      component: Reseller
    },
    { path: '*', redirect: { name: 'Home' }}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.query['invite']) localStorage.refferal = to.query['invite']
  if (to.meta === 'signin' && localStorage.account === undefined) next('/signin')
  else if (to.path === '/' && localStorage.account !== undefined) next('/earn')
  else if (to.meta === 'admin' && localStorage.adminAuth === undefined) next('/admin/login')
  else if (to.meta === 'reseller' && localStorage.resellerAuth === undefined) next('/reseller/login')
  else next()
})

export default router