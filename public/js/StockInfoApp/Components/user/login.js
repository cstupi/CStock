var login = { template: '<login-form></login-form>'} 

Vue.component('login-form', {
	data(){ return {
		username: null,
		password: null,
		failed: false,
		message: ""
	}},
	methods: {
		login() {
			var userapi = new UserAPI().LoginUser(this.username, this.password).then((result) => {
				if(result){
					this.message = 'Success';
					this.failed = false;
				} else {
					this.failed = true;
					this.message = 'Failed to login';
				}
			});
		},
		register() {
			var userapi = new UserAPI().RegisterUser(this.username, this.password).then((result) => {
				if(result){
					this.message = 'Success';
					this.failed = false;
				} else {
					this.failed = true;
					this.message = 'Failed to login';
				}
			});
		}
	},
	template: '<div class="login">\
				<input type="text" v-model="username" placeholder="Username" />\
				<input type="password" v-model="password" placeholder="Password" />\
				<input type="submit" value="Login" v-on:click="login()"/>\
				<input type="submit" value="Register" v-on:click="register()"/>\
				<a href="" class="floated right">Lost your password?</a>\
				{{ message }}\
			</div>'
});