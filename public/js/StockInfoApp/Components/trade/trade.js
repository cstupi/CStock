var trade_page = {
	props: ['gameId'],
	data: function() {  return {
		symbol: "",
		quantity: 0,
		price: 0.0,
		orderType: null,
		transactionType: null
	}},
	template: ' \
		<div> \
			<div class="trade pure-g"> \
				<fieldset> \
					<label class="pure-u-1-2">Symbol:</label> \
					<input class="pure-u-1-2" type="text" placeholder="Symbol" :value="symbol" /> \
					<label class="pure-u-1-2">Quantity:</label> \
					<input class="pure-u-1-2" type="text" placeholder="Quantity" :value="quantity" /> \
					<label class="pure-u-1-2">Limit Price:</label> \
					<input class="pure-u-1-2" type="text" placeholder="Price" :value="price" /> \
					<label class="pure-u-1-2">Order Type:</label> \
					<input class="pure-u-1-2" type="text" placeholder="OrderType" :value="orderType" /> \
					<label class="pure-u-1-2">Type:</label> \
					<input class="pure-u-1-2" type="text" placeholder="TransactionType" :value="transactionType" />  \
				</fieldset> \
			</div> \
			<button class="pure-button pure-button-primary">Place Trade</button> \
		</div>'
};