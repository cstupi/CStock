

Vue.component('home-page', {
	data() {
    return {
      loading: false
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
  },
  methods: {
    fetchData () {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      new UserAPI().GetToken().then(res => {
        GlobalConfig.xtoken = res;
        new UserAPI().GetXigniteUserId().then(uid => {
          GlobalConfig.xuserid = uid;
          this.loading = false;
        });
      });
      setInterval(function(){
        console.log("Refreshing XToken");
        new UserAPI().GetToken().then(token => {
           GlobalConfig.xtoken = token;
        });
      }, 300000);
    }
  },
	template: '<div><div v-if="loading">LOADING</div><div v-if="!loading"><router-view></router-view></div></div>'
});