'use strict';



const routes = [
  { path: '/Portfolio', component: portfolio_page },
  { path: '/Trade', component: trade_page, props: { gameId: 1} }
  { path: '/login_user', component: login_user}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app');
