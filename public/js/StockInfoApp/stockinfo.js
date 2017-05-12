'use strict';



const routes = [
  { path: '/Portfolio', component: portfolio_page }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app');
