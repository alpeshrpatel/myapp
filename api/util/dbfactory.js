var mongoose = require( 'mongoose' ); 
var log = require("../logger/logger");


var db, School; 


module.exports = {
		connect: function(url,options,cb)
		{
			if(!db)
			{
				console.log(url+" : " + options);
				mongoose.connect(url);
				db = mongoose.connection;
				db.on("error", function(error){
					console.log("disconnect from mongo");
					mongoose.disconnect();
				});
				
				db.on("disconnected",function(){
					var lastReconnectAttempt;
					console.log("Reconencting");
					var now = new Date().getTime();
					if(lastReconnectAttempt && now - lastReconnectAttempt  < 10000)
						{
							var delay = 10000 - now - lastReconnectAttempt;
							console.log("Reconencting tp mongodb  in " + delay + "milliseconds");
							setTimeout(function(){
								console.log("Reconencting to Mongo");
								var lastReconnectAttempt = new Date().getTime();
								mongoose.conenct(url,options,{server:{auto_reconnect:true}});
							},delay);
						}else{
							console.log("reconnecting to mongo");
							lastReconnectAttempt = now;
							mongoose.connect(url,options,{server:{auto_reconnect:true}});
						}
					});
				
				db.on("open", function(){
					
                    //=========Define all schema here ===================
                    var schoolSchema = require("../model/school");
					School  = mongoose.model("School", schoolSchema);
                    
                   //=========Define all schema here =================== 
					if(cb){
						return cb();
					}
				});
			}else if(cb){
				return cb();
			}
		}, 
		
		schoolDomain : function()
		{
			if(School)
				{
				return School;
				}else{
					console.log("DB connection is not established. Connect to DB before doing any DB operations");
				}
		}, 
		
		closeConnection : function(callback)
		{
			mongoose.disconnect(function(){
				callback();
			});
		}
		
		
		
		
		
};