// Customer module configs
module.exports = {
	"application" : {
		apiUrl:{
			host:"localhost"
			port:"8081"
		},
		mongo:{
			"db" : "myapp"
				auth:{
					user:'',
					password:''
				},
				instances:[{
					host:"localhost",
					port:27017
				}],
				options:{
					auth:{
						
					}
				}
		}
}