var register = { template: '<register-form></register-form>'} 

Vue.component('register-form', {
	data(){ return {
		username: null,
		password: null,
		failed: false,
		message: ""
	}},
	methods: {
		login() {
			var userapi = new UserAPI().LoginUser(this.username, this.password).then((result) => {
				if(result.data){
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
				{{ message }} \
            	<input type="text" v-model="username" placeholder="Username" />\
            	<input type="password" v-model="password" placeholder="Password" />\
                <input type="text" placeholder="Re-Enter Password" />\
            	<button v-on:click="login()" />\
            	<a href="">Lost your password?</a>\
        	</div>'
});