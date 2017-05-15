'use strict';
var AssetInfo = {
	props: {
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
			if(!symbol || GlobalConfig.xuserid == 0 || GlobalConfig.xtoken == '')
				return;
			console.log('getting data');
			var api = new DataAPI(GlobalConfig.xuserid, GlobalConfig.xtoken);
			api.GetQuote(this.symbol).then(response =>  { this.$nextTick(function () { 
					this.asset = response; 
				}); 
			});
			
			api.GetChartBars(this.symbol, moment('3/25/1980').format('MM/DD/YYYY h:mm:ss a'), moment('5/15/2017').format('MM/DD/YYYY h:mm:ss a')).then(response => {
				var series = [];
				var prices = [];
				var labels = [];
				for(let i in response.ChartBars){
					prices.push( { y: response.ChartBars[i].Close, x: new Date(response.ChartBars[i].StartDate )});
					labels.push(response.ChartBars[i].StartDate);
				}
				series.push({ name: this.symbol, data: prices });

				this.$nextTick(function(){
					new Chartist.Line('.chart-cont', {
							  // labels: labels,
							  series: series
							}, {
							  fullWidth: true,
							  showPoint: false,
						      axisX: {
							    type: Chartist.FixedScaleAxis,
							    divisor: 5,
							    labelInterpolationFnc: function(value) {
							      return moment(value).format('MM/DD/YYYY');
							    }
							}
						});
					});
			});
		}
	},
	watch: {
		symbol: function(val){
			this.GetQuote(val);
		}
	},
	mounted() {
		console.log('mounted');
		this.GetQuote(this.symbol);
	},
	template: "<div><div>{{asset.Security.Name}} ({{asset.Security.Symbol}}):  ${{asset.Last}}</div><div class='chart-cont'></div></div>"
};

Vue.component('asset-info', AssetInfo);