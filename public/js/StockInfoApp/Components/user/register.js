var register = { template: '<register-form></register-form>'} 

Vue.component('register-form', {
	data(){ return {
		username: null,
		password: null,
		failed: false,
		message: ""
	}},
	methods: {
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
                <input type="password" placeholder="Re-Enter Password" />\
            	<input type="submit" value="Login" v-on:click="register()"/>\
            	<a href="">Lost your password?</a>\
            	{{ message }}\
        	</div>'
});