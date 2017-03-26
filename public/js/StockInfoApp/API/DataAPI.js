'use strict'
function DataAPI(userid, token){
	if(!userid || !token)
		return null;
	var API = {};
	API.baseQuoteUrl = 'https://globalrealtime.xignite.com/v3/xGlobalRealTime.json/GetGlobalRealTimeQuote?IdentifierType=Symbol&Identifier=';
	API.UserId = userid;
	API.Token = token;
	API.TokenParam = "&_token=" + API.Token + "&_token_userid=" + API.UserId;
	API.GetQuote = function(symbol) {
		return axios.get( API.baseQuoteUrl + symbol + API.TokenParam).then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};

	return API;
}