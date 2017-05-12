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
			
			api.GetChartBars(this.symbol, moment('3/25/2012').format('MM/DD/YYYY h:mm:ss a'), moment('3/25/2017').format('MM/DD/YYYY h:mm:ss a')).then(response => {
				var series = [];
				var prices = [];
				var labels = [];
				for(let i in response.ChartBars){
					prices.push( { y: response.ChartBars[i].Close, x: new Date(response.ChartBars[i].StartDate )});
					labels.push(response.ChartBars[i].StartDate);
				}
				series.push({ name: this.symbol, data: prices });
				api.GetChartBars('SPY', moment('3/25/2012').format('MM/DD/YYYY h:mm:ss a'), moment('3/25/2017').format('MM/DD/YYYY h:mm:ss a')).then(spyResponse => {
					var spyprices = [];
					for(let i in spyResponse.ChartBars){
						spyprices.push({ y: spyResponse.ChartBars[i].Close, x: new Date(spyResponse.ChartBars[i].StartDate) });
					}
					series.push({ name: 'SPY', data: spyprices });
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