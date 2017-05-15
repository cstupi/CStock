var portfolio_page = {
  template: '<portfolio-list></portfolio-list>'
};
Vue.component('portfolio-list', {
	data() {
    return {
      loading: false,
      post: null,
      error: null,
      portfolio: [],
      overall_performance: [],
      selectedAsset: null
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
      if(!this.$route.params.gameid)
        router.push({ path: 'games' })
      this.error = this.post = null;
      this.loading = true;
      this.p = null;
      // replace getPost with your data fetching util / API wrapper
      var portfolio = new PortfolioAPI().Get(this.$route.params.gameid).then((p) => {

        this.portfolio = [];

        var overall_performance = [];
        var getLatestValues = function (key, ports, that){
          new DataAPI(GlobalConfig.xuserid, GlobalConfig.xtoken).GetQuote(ports[key].Asset).then(res => {
            if(ports[key].Asset != "USD"){
              ports[key].Current = res.Last;
              ports[key].Return = Math.ceil(((1 - ((ports[key].CostBasis) / (ports[key].Count * res.Last))) * 100) * 100) / 100;
              ports[key].isBad = ports[key].Return < 0;
              // that.portfolio.splice(key, 1,ports[key]);
              that.overall_performance.push(ports[key].Count * res.Last);
              ports[key].Value = ports[key].Current * ports[key].Count;
              ports[key].AverageCost = ports[key].CostBasis / ports[key].Count;
            } else { 
              ports[key].AverageCost = "1";
              ports[key].Current = ports[key].Count;
              ports[key].Value = ports[key].Count;
            }
            that.portfolio.push(ports[key]);
          });
      };

      for(var key in p){
        getLatestValues(key, p, this);
      }

      	
        this.loading = false;
      });

    },
    selectAsset(asset) { 
      this.selectedAsset = asset ? asset.Asset : null;
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
    <div v-if="portfolio" class="content portfolio">\
      <table> \
        <thead> \
          <tr> \
            <th colspan="6"><router-link :to="\'/Trade/\' + this.$route.params.gameid">Trade</router-link></th> \
          </tr> \
          <tr> \
            <th>Symbol</th> \
            <th>Quantity</th> \
            <th>Value</th> \
            <th>Cost Basis</th> \
            <th>Current Price</th> \
            <th>Return</th> \
          </tr> \
        </thead> \
        <tbody> \
          <tr v-for="port in portfolio"> \
            <td><span class="asset-info" v-on:click="selectAsset(port); return false;">{{ port.Asset }}</span></td> \
            <td>{{ port.Count.toLocaleString() }}</td> \
            <td>${{ port.Value.toLocaleString() }}</td> \
            <td>${{ port.AverageCost.toLocaleString() }}</td> \
            <td>${{ port.Current.toLocaleString() }}</td> \
            <td v-bind:class="[port.isBad ? \'bad-asset\' : \'good-asset\']">{{ port.Return }}<span v-if="port.Asset !== \'USD\'">%</span></td> \
          </tr> \
          <tr>\
            <td colspan="6" class="portfolio-performance"><strong>Overall Performance: {{ performance }}%</strong></td> \
          </tr> \
        </tbody> \
      </table> \
    </div>\
    \
    <div class="asset-chart" v-if="selectedAsset"> \
      <asset-info v-bind:symbol="selectedAsset"></asset-info>\
    </div> \
  </div>'
});