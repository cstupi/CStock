var trade_page = {
	template: '<trade-info>Buy some stuff</trade-info>'
};
Vue.component('trade-info', { 
	data() { 
		return {
			loading: false,
			symbol: "",
			quantity: 0,
			price: 0.0,
			orderType: 1,
			transactionType: "",
			security: { Security: null },
			gameid: null
		}		
	},
	created () { 
		this.gameid = this.$route.params.gameid;
	},
	watch: { 
		symbol: function(val) { 
			this.getQuote(val);
		}
	},
	methods: { 
		getQuote(val) { 
			/* TODO: pull this out into a stock component than duplicate this */
			console.log('Getting quote for: ' + val)
			new DataAPI(GlobalConfig.xuserid, GlobalConfig.xtoken)
				.GetQuote(this.symbol).then(res => {
		              this.security = res;
		          });
		},
		makeTrade() { 
			new TradeAPI()
			.PlaceTrade(
				this.gameid, 
				this.symbol, 
				this.quantity, 
				this.price, 
				this.orderType, 
				this.transactionType, (result) => { 
					console.log("Order Result: " + result)
				});
			
			var id = this.gameid;
			setTimeout(function() { router.push('/portfolio/' + id) }, 2000);
		},
		clear() { 
			this.symbol = "";
			this.quantity = 0;
			this.price = 0.0;
			this.orderType = null;
			this.transactionType = null;
		}
	},
	template: ' \
		<div> \
		    <div class="loading" v-if="loading">\
		      Loading...\
		    </div> \
		    <div style="background-color: #e8e240;border-radius: 5px;borer: 1px solid #000;" v-if="security.Security"> \
		    	<em>{{ security.Security.Name }}</em> ${{ security.Last }} \
		    </div>\
			<div class="trade pure-form pure-form-aligned"> \
				<fieldset> \
					<div class="pure-control-group">\
						<label>Symbol:</label> \
						<input type="text" placeholder="Symbol" v-model="symbol" /> \
					</div> \
					<div class="pure-control-group"> \
						<label>Quantity:</label> \
						<input type="text" placeholder="Quantity" v-model="quantity" /> \
					</div> \
					<div class="pure-control-group"> \
						<label>Limit Price:</label> \
						<input type="text" placeholder="Price" v-model="price" /> \
					</div> \
					<div class="pure-control-group"> \
						<label>Order Type:</label> \
						<select v-model="orderType"> \
							<option value="1">Market</option> \
							<option value="2">Limit</option> \
							<option value="3">Stop</option> \
						</select> \
					</div> \
					<div class="pure-control-group"> \
						<label >Type:</label> \
						<select v-model="transactionType"> \
							<option disabled value="" selected>Choose</option> \
							<option value="1">Buy</option> \
							<option value="2">Sell</option> \
							<option value="3">Buy Cover</option> \
							<option value="4">Sell Short</option> \
							<option value="5">Div</option> \
						</select> \
					</div> \
					<div class="pure-control-group">\
						<button v-on:click="makeTrade()" class="pure-button pure-button-primary">Place Trade</button> \
						<button v-on:click="clear()" class="pure-button">Clear</button> \
					</div> \
				</fieldset> \
			</div> \
		</div>'
});