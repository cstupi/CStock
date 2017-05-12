var xignite 	= require("./Xignite");
var ordertypes 	= require("./OrderType");
var status		= require("./Status");
var transactiontype		= require("./TransactionType");
var alerts		= require('../Database/SQL/XigniteAlerts');
var order		= require('../Database/SQL/OrderData');
var transaction = require('../Database/SQL/TransactionData');
var portfolio	= require('../Database/SQL/PortfolioData');
market = {};

market.PlaceLimitOrder = function(userid, gameid, symbol, transactionType,count, valueBooleanString, expiration, callbackEndpoint, callback, failure){
	order.AddOrder(transactionType, ordertypes["LIMIT"], status["PENDING"], expiration, null, new Date(), symbol, count, null, gameid, userid, function(orderid){
		xignite.PlaceLimitOrder(symbol, valueBooleanString, expiration, callbackEndpoint, function(data){
			alerts.AddAlert(data.AlertIdentifier, orderid, function(){
				callback();
			}, failure);
		}, failure);
	}, failure);
}
// We cant actually get the price at time of alert so lets hope it stays relevant in time? :(
market.ExecuteLimitOrder = function(AlertId, timestamp, callback, failure){
	alerts.GetAlert(AlertId, function(results){
		for(let i in results){
			result = resulsts[i];
			order.GetOrder(result["OrderId"], function(o){
				xignite.GetMarketQuote(o["Asset"], function(data){
						CheckAndExecuteOrder(o, data[0].Last);
					}, function(error){
						console.log("Error running market:" + error);
				});
			});
		}
	});
}
market.PlaceMarketOrder = function(userid, gameid, symbol, transactionType, count, callback, failure){
	order.AddOrder(transactionType, ordertypes["MARKET"],  status["PENDING"], null, null, new Date(), symbol, count, null, gameid, userid, function(data){
			callback(data);
		}, failure);
}

function ExecuteOrder(o, price, cashOnHand, bankId){
	transaction.AddTransaction(o["UserId"], transactiontype[o["TransactionType"]],o["Count"],price, new Date(), status["COMPLETE"],o["OrderId"], o["GameId"], function(){
		order.UpdateStatus(o["OrderId"], o["UserId"],status["COMPLETE"], new Date(),  function(){
			portfolio.GetAssetFromPortfolio(o["UserId"], o["GameId"], o["Asset"],function(result){
				var count = parseInt(o["Count"]);
				var costbasis = price * count;
				
				portfolio.UpdatePortfolio(o["UserId"], bankId, cashOnHand-costbasis, result[0]["CostBasis"],function(){},function(error){
					console.log("Error Updating cash after execution");
				});
				if(result.length > 0){
					portfolio.UpdatePortfolio(o["UserId"], result[0]["PortfolioId"], parseInt(result[0]["Count"]) + count, parseInt(result[0]["CostBasis"]) + costbasis,function(){},function(error){
						console.log("Error updating portfolio asset");
					});
				} else {
					portfolio.AddToPortfolio(o["UserId"], o["Asset"], o["Count"], o["GameId"], costbasis,function(){ response.status(200).send(); },function(error){
						console.log("Error adding portfolio asset");
					});
				}
			}, function(error){
				console.log("Error getting asset to update portfolio");
			});
		}, function(error){
				console.log("Error updating order status: " + error);
		});
	}, function(error){
		console.log("Error updating transaction: " + error);
	});

}
function CheckAndExecuteOrder(o, price){
	portfolio.GetAssetFromPortfolio(o["UserId"], o["gameid"], "USD", function(result){
		if(parseInt(result[0].Count) > (price * parseInt(o["Count"]))){
			ExecuteOrder(o, price, parseInt(result[0].Count), result[0].PortfolioId);
		} else {
			order.UpdateStatus(o["OrderId"], o["UserId"],status["INVALID"], new Date(),  function(){}, function(error){
				console.log("Error updating order status: " + error);
			});
		}
	}, function(error){
		console.log("Error updating order status: " + error);
	});
}
function RunMarket(orders){
	for(let i in orders){
		o = orders[i];
		xignite.GetMarketQuote(o["Asset"], function(data){
			CheckAndExecuteOrder(o, data[0].Last);
		}, function(error){
			console.log("Error running market:" + error);
		});
	}
	console.log("Finished processing orders at: " + new Date());
}
market.Start = function(){
	setInterval(function(){
		console.log("Running Market");
		order.GetAllPendingMarketOrders(RunMarket, function(){ 
			console.log("Error getting orders for market");
		});
	}, 30000);
}
module.exports = market;