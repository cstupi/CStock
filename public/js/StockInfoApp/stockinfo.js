'use strict';

var GlobalConfig = {
	xuserid: null,
	xtoken: null
};

const routes = [
  { path: '/Portfolio/:gameid', component: portfolio_page },
  { path: '/Trade/:gameid', component: trade_page },
  { path: '/Login', component: login },
  { path: '/Games', component: game_page}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app');
