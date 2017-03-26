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
			api.GetQuote(this.symbol).then(response =>  { this.$nextTick(function () { 
					this.asset = response; 
				}); 
			});
			
			api.GetChartBars(this.symbol, moment('3/25/2015').format('MM/DD/YYYY h:mm:ss a'), moment('3/25/2017').format('MM/DD/YYYY h:mm:ss a')).then(response => {
				var series = [];
				var prices = [];
				var labels = [];
				for(let i in response.ChartBars){
					prices.push(response.ChartBars[i].Close);
					labels.push(response.ChartBars[i].StartDate);
				}
				series.push(prices);
				api.GetChartBars('SPY', moment('3/25/2015').format('MM/DD/YYYY h:mm:ss a'), moment('3/25/2017').format('MM/DD/YYYY h:mm:ss a')).then(spyResponse => {
					var spyprices = [];
					for(let i in spyResponse.ChartBars){
						spyprices.push(spyResponse.ChartBars[i].Close);
					}
					series.push(spyprices);
					this.$nextTick(function(){
					new Chartist.Line('.chart-cont', {
							  labels: labels,
							  series: series
							}, {
							  fullWidth: true,
							  showPoint: false,
						      axisX: {
							      labelInterpolationFnc: function(value, index) {
							        return value; // index % 100 == 0 ? value : null;
							      }
							  },
							  chartPadding: {
							    right: 40
							}

						});
					});
				});
			});
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
	template: "<div><div>{{asset.Security.Name}}</div><div>{{asset.Security.Symbol}}</div><div>{{asset.Last}}</div><div class='chart-cont'></div></div>"
};