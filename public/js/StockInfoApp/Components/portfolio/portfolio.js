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
      <h2></h2>\
      <div v-for="port in post">{{ port.Asset }} {{ port.Count }} {{ port.CostBasis }} {{ port.Current }} {{ port.Return }}</div>\
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
      var portfolio = new PortfolioAPI().Get().then((p) => {
        for(var port in p){
          new DataAPI(GlobalConfig.xuserid, GlobalConfig.xtoken).GetQuote(p[port].Asset).then(res => {
              p[port].Current = res.Last;
              p[port].Return = (p[port].CostBasis) / (p[port].Count * res.Last);
              this.error = "TESTING";
          });
        }

      	this.post = p;
        this.loading = false;
      });

    }
  },
	template: template
});