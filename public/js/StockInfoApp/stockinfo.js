'use strict';



const routes = [
  { path: '/Portfolio', component: portfolio_page },
  { path: '/Trade', component: trade_page, props: { gameId: 1} }
  { path: '/login', component: login_user}
  { path: '/signup', component: signup_user}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app');
