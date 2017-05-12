var template = '<div class="post">\
    <div class="loading" v-if="loading">\
      Loading...\
    </div>\
\
    <div v-if="error" class="error">\
      {{ error }}\
    </div>\
\
    <div v-if="post" class="content">\
      <h2>{{ post.Security.Name }}</h2>\
      <p>{{ post.Last }}</p>\
    </div>\
  </div>';

var portfolio_page = {
  template: '<portfolio-list>Your Portfolio HERE!</portfolio-list>'
};
Vue.component('portfolio-list', {
	data() {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      var userapi = new UserAPI().GetToken().then((token) => {
	      var api = new DataAPI(62531, token);
	      api.GetQuote("MSFT", (post) => {
	        this.loading = false
	        if (!post) {
	          this.error = "error";
	        } else {
	          this.post = post;
	        }
	      });
      });

    }
  },
	template: template
});