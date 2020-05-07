import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
})
