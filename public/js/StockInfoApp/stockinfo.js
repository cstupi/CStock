'use strict';



const routes = [
  { path: '/Portfolio', component: portfolio_page },
  { path: '/Trade', component: trade_page, props: { gameId: 1} },
  { path: '/login', component: login}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app');
