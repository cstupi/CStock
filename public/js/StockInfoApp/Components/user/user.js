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
  	template: '<div class="form">\
  			{{ message }} \
            <input type="text" v-model="username" class="zocial-dribbble" placeholder="Username" />\
            <input type="password" v-model="password" placeholder="Password" />\
            <button v-on:click="login()" />\
            <a href="">Lost your password?</a>\
        </div>'
});