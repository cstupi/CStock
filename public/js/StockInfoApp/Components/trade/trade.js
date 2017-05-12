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
			orderType: null,
			transactionType: null,
			security: { Security: null },
			user: { 
				token: "",
				userid: 0 
			} 
		}		
	},
	created () { 
		this.loading = true;
		new UserAPI().GetToken()
			.then((token) => {
				this.user.token = token;
				this.user.userid = 62531;
			});
		this.loading = false;
	},
	watch: { 
		symbol: function(val) { 
			this.getQuote(val);
		}
	},
	methods: { 
		getQuote(val) { 
			console.log('Getting quote for: ' + val)
			new DataAPI(this.user.userid, this.user.token)
				.GetQuote(this.symbol, (security) => {
			        if (!security) {
			          console.log("Error loading security: " + val);
			        } else {
			          this.security = security;
			        }
		      	});
		},
		makeTrade() { 
			return;
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
			<div class="trade pure-g"> \
				<fieldset> \
						<label class="pure-u-1-2">Symbol:</label> \
						<input class="pure-u-1-2" type="text" placeholder="Symbol" v-model="symbol" /> \
						<label class="pure-u-1-2">Quantity:</label> \
						<input class="pure-u-1-2" type="text" placeholder="Quantity" v-model="quantity" /> \
						<label class="pure-u-1-2">Limit Price:</label> \
						<input class="pure-u-1-2" type="text" placeholder="Price" v-model="price" /> \
						<label class="pure-u-1-2">Order Type:</label> \
						<input class="pure-u-1-2" type="text" placeholder="OrderType" v-model="orderType" /> \
						<label class="pure-u-1-2">Type:</label> \
						<input class="pure-u-1-2" type="text" placeholder="TransactionType" v-model="transactionType" />  \
				</fieldset> \
			</div> \
			<button v-on:click="makeTrade()" class="pure-button pure-button-primary">Place Trade</button> \
			<button v-on:click="clear()" class="pure-button">Clear</button> \
		</div>'
});