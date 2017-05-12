var xignite 	= require("./Xignite");
var ordertypes 	= require("./OrderType");
var status		= require("./Status");
var transactiontype		= require("./TransactionType");
var alerts		= require('../Database/SQL/XigniteAlerts');
var order		= require('../Database/SQL/OrderData');
var transaction = require('../Database/SQL/TransactionData');
var portfolio	= require('../Database/SQL/PortfolioData');
market = {};
var starting_cash = 100000;

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
				var port = result[0];
				var count = parseInt(o["Count"]);
				var costBasis = price * count;
				var newCostBasis = 0;
				var newCount = 0;
				var newCash = cashOnHand;
				var startingCash = starting_cash; // hard coded up top for now
				if(transactiontype[o["TransactionType"]] == transactiontype["BUY"] || transactiontype[o["TransactionType"]] == transactiontype["BUYCOVER"]){
					newCount = result.length > 0 ? parseInt(port["Count"]) + count : count;
					newCostBasis = result.length > 0 ? parseInt(port["CostBasis"]) + costbasis : costBasis;
					newCash = cashOnHand - costBasis;
				}else if(transactiontype[o["TransactionType"]] == transactiontype["SELL"] || transactiontype[o["TransactionType"]] == transactiontype["SELLSHORT"]) {
					newCount = parseInt(port["Count"]) - count;
					newCostBasis = parseInt(port["CostBasis"]) - costBasis;
					newCash = cashOnHand + costBasis;
				}
				portfolio.UpdatePortfolio(o["UserId"], bankId, newCash, startingCash,function(){},function(error){
					console.log("Error Updating cash after execution");
				});
				if(result.length > 0){
					portfolio.UpdatePortfolio(o["UserId"], port["PortfolioId"], newCount, newCostBasis,function(){},function(error){
						console.log("Error updating portfolio asset");
					});
				} else {
					portfolio.AddToPortfolio(o["UserId"], o["Asset"], o["Count"], o["GameId"], newCostBasis,function(){ },function(error){
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
	if(transactiontype[o["TransactionType"]] == transactiontype["BUY"] || transactiontype[o["TransactionType"]] == transactiontype["BUYCOVER"]){
		portfolio.GetAssetFromPortfolio(o["UserId"], o["GameId"], "USD", function(result){
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
	} else if(transactiontype[o["TransactionType"]] == transactiontype["SELL"] || transactiontype[o["TransactionType"]] == transactiontype["SELLSHORT"]) {
		portfolio.GetAssetFromPortfolio(o["UserId"], o["GameId"], o["Asset"], function(result){
			if(parseInt(result[0].Count) > parseInt(o["Count"])){
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