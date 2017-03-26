'use strict';
var AssetInfo = {
	props: {
		user: {
			defaultValue: { UserId: 0, Token: ''},
			required: true
		},
		symbol: {
			type: String,
			default: 'MSFT'
		}
	}, 
	data: function(){
		return { asset: { Security: {} }};
	},
	
	methods: {
		GetQuote: function(symbol){
			if(!symbol || this.user.UserId == 0 || this.user.Token == '')
				return;
			console.log('getting data');
			var api = new DataAPI(this.user.UserId, this.user.Token);
			api.GetQuote(this.symbol).then(response =>  { this.$nextTick(function () { this.asset = response; }); });
		}
	},
	watch: {
		user: function(val){
			this.GetQuote(this.symbol);
		},
		symbol: function(val){
			this.GetQuote(val);
		}
	},
	mounted() {
		console.log('mounted');
		this.GetQuote(this.symbol);
	},
	template: "<div><div>{{asset.Security.Name}}</div><div>{{asset.Security.Symbol}}</div><div>{{asset.Last}}</div></div>"
};

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
			users.GetUserId().then(function(data){
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