

var db = require("../util/dbfactory");

var log = require("../logger/logger");

module.exports.createSchool = function(req,res)
{
	var School = db.schoolDomain(); 
	
	var schoolRecord = new School(req.body);
	
	schoolRecord.save(function(err){
		console.log("New school created successfully", JSON.stringify(School));
		if(err)
        {
            log.error("Failed to save in School");    
        }else{
            res.status(200);
            res.json({
                message:'New School created successfully';
            }).end();
            console.log("Successfully saved in school");
        }
	});
	
	
}