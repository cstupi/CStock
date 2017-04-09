'use strict';


var app = new Vue({
  	el: '#StockInfoApp',
  	data: {
    	message: 'Hello Vue!',
    	token: 'token here',
    	userid: 0,
    	user: { Token: '', UserId: 0},
    	symbol: ''
	},
	methods: {
		fetchData: function(){
			var self = this;
			this.User = new User();

			var users = new UserAPI();

			users.GetToken().then(function(data){
				 self.$nextTick(function () {
				 	self.token = data;
				 	self.user.Token = data;
				});
			});
			users.GetXigniteUserId().then(function(data){
				self.$nextTick(function(){
					self.userid = data;
					self.user.UserId = data;
					
				});
			});
		}
	},
  	components: {
  		'asset-info': AssetInfo
  	}	
});
function User(userid, token){
	this.UserId = userid;
	this.Token = token;
}
app.fetchData();