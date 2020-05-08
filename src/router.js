import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const routes = [
  {
    path: '/index.html',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tools',
    name: 'tools',
    component: function () { 
      return import(/* webpackChunkName: "about" */ './views/Tools.vue')
    }
  },
  {
    path: '/games',
    name: 'games',
    component: function () { 
      return import(/* webpackChunkName: "about" */ './views/Snake.vue')
    }
  }
]

export default new Router({
  base:'/statistic/',
  mode:'history',  //服务器要配置
  routes, 
})
