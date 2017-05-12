'use strict'
function DataAPI(userid, token){
	if(!userid || !token)
		return null;
	var API = {};
	API.baseRealTimeQuoteUrl = 'https://globalrealtime.xignite.com/v3/xGlobalRealTime.json/GetGlobalRealTimeQuote?IdentifierType=Symbol&Identifier=';
	API.UserId = userid;
	API.Token = token;
	API.TokenParam = "&_token=" + API.Token + "&_token_userid=" + API.UserId;

	API.GetQuote = function(symbol) {
		return axios.get( API.baseRealTimeQuoteUrl + symbol + API.TokenParam).then(function(res){
			return res.data;
		}).catch(function(err){
			if(failure)
				failure(error);
			else
				console.log(err);
			return '';
		});
	};

	API.baseChartQuoteUrl = 'https://globalquotes.xignite.com/v3/xGlobalQuotes.json/GetChartBars?IdentifierType=Symbol&Identifier=';
	API.StartTimeString = '&StartTime=';
	API.EndTimeString = '&EndTime=';
	API.PrecisionString = '&Precision=';
	API.PeriodString = '&Period=';
	API.AdjustmentMethodString = '&AdjustmentMethod=All';
	API.IncludeExtendedString = '&IncludeExtended=False';

	API.GetChartBars = function(symbol, StartTime, EndTime) {
		var url = API.baseChartQuoteUrl + symbol + API.StartTimeString + 
				encodeURIComponent(StartTime) + API.EndTimeString + encodeURIComponent(EndTime) + API.PrecisionString + "Hours" + 
				API.PeriodString + "24" + API.AdjustmentMethodString + API.IncludeExtendedString + API.TokenParam;
		console.log(url);
		return axios.get(url).then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};

	return API;
}