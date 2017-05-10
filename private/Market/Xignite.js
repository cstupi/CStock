var https = require('https');
var config = require('../../private.config.js');

var token = "&_token=" + config.Token;

var alertHost = "https://alerts.xignite.com";
var marketQuoteHost = "https://globalrealtime.xignite.com";
var searchAlertPath = "/xAlerts.json/SearchAlerts?Pattern=";
var createAlertPath = "/xAlerts.json/CreateAlert?";
var deleteAlertPath = "/xAlerts.json/DeleteAlerts?AlertIdentifiers=";

var marketQuotePath = "/v3/xGlobalRealTime.json/GetGlobalExtendedQuotes?IdentifierType=Symbol&Identifiers="; 
var Xignite = {};

Xignite.GetMarketQuote = function(symbol, callback, failure){
	var path = marketQuotePath + symbol + token;
	https.get(marketQuoteHost + path, (res) => {
		if(res.statusCode === 200)
			res.on('data',(data) => {
				callback(data);
			});
		else
			failure();
	});
}
Xignite.PlaceLimitOrder = function(symbol, valueBooleanString, expiration, callbackEndpoint, callback, failure){
 var path = createAlertPath + "IdentifierType=Symbol" +
	"&Identifier=" + symbol +
	"&API=XigniteGlobalRealTime" +
	"&Condition=" + valueBooleanString+
	"&Reset=Never"
	"&StartDate=" + 
	"&EndDate=" + expiration + 
	"&CallbackURL=" + callbackEndpoint + "%3FAlertId={AlertIdentifier}%26timestamp={timestamp}" +
	token;
	https.get(alertHost + path, (res) => {
		if(res.statusCode === 200)
			res.on('data',(data) => {
				callback(data);
			});
		else
			failure();
	});
}
Xignite.CancelLimitOrder = function(id, callback, failure){
	var path = deleteAlertPath + id + token
	https.get(alertHost + path, (res) => {
		if(res.statusCode === 200)
			callback();
		else
			failure();
	});
}
Xignite.GetPendingLimitOrders = function(uid, callback, failure){
	var path = searchAlertPath + uid + token
	https.get(alertHost + path, (res) => {
		if(res.statusCode === 200)
			res.on('data',(data) => {
				callback(data);
			});
		else
			failure();
	});
}

module.exports = Xignite;