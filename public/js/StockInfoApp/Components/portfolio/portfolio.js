var portfolio_page = {
  template: '<portfolio-list>Your Portfolio HERE!</portfolio-list>'
};
Vue.component('portfolio-list', {
	data() {
    return {
      loading: false,
      post: null,
      error: null,
      portfolio: [],
      overall_performance: []
    }
  },
  computed: {
    performance: function(){
      return Math.ceil(100*(this.overall_performance.reduce(function(a, b) { return a + b; }, 0) / 100000)) / 100; 
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
      this.p = null;
      // replace getPost with your data fetching util / API wrapper
      var portfolio = new PortfolioAPI().Get().then((p) => {
        
        this.portfolio = p;
        var overall_performance = [];
        var getLatestValues = function (key, ports, that){
          new DataAPI(GlobalConfig.xuserid, GlobalConfig.xtoken).GetQuote(ports[key].Asset).then(res => {
            if(ports[key].Asset != "USD"){
              ports[key].Current = res.Last;
              ports[key].Return = Math.ceil(((1 - ((ports[key].CostBasis) / (ports[key].Count * res.Last))) * 100) * 100) / 100;
              ports[key].Return += "%";
              that.portfolio.splice(key, 1,ports[key]);
              that.overall_performance.push(ports[key].Count * res.Last);
            }
            
          });
      };

      for(var key in p){
        getLatestValues(key, p, this);
      }

      	
        this.loading = false;
      });

    }
  },
	template: '<div class="post">\
    <div class="loading" v-if="loading">\
      Loading...\
    </div>\
\
    <div v-if="error" class="error">\
      {{ error }}\
    </div>\
\
    <div v-if="portfolio" class="content">\
      <h2></h2>\
      <div>Overall Performance: {{ performance }}%</div>\
      <div v-for="port in portfolio">{{ port.Asset }} {{ port.Count }} {{ port.CostBasis }} {{ port.Current }} {{ port.Return }}</div>\
    </div>\
  </div>'
});