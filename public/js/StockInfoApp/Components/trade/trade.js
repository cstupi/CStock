/*

	template: ' \
	<div class="trade"> \
		<fieldset> \
			<input type="text" placeholder="Symbol" v-bind:symbol /> \
			<input type="text" placeholder="Quantity" v-bind:quantity /> \
			<input type="text" placeholder="Price" v-bind:price /> \
			<input type="text" placeholder="OrderType" v-bind:orderType /> \
			<input type="text" placeholder="TransactionType" v-bind:transactionType /> \
			\
			<button class="pure-button pure-button-primary">Place Trade</button> \
		</fieldset> \
	</div>'
*/
var trade_page = {
	data: { 
		symbol: "",
		quantity: 0,
		price: 0.0,
		orderType: null,
		transactionType: null
	},
	template: ' \
	<div class="trade"> \
		<fieldset> \
			<input type="text" placeholder="Symbol"/> <br />\
			<input type="text" placeholder="Quantity" /> <br />\
			<input type="text" placeholder="Price" /> <br />\
			<input type="text" placeholder="OrderType" /> <br />\
			<input type="text" placeholder="TransactionType" /> <br />\
			\
			<button class="pure-button pure-button-primary">Place Trade</button> \
		</fieldset> \
	</div>'
};


