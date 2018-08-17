angular.module('utilService',[])

	// super simple service
	// each function returns a promise object 
	.factory('Customers', function($q) {
            
            var customers = [
                {
                  "province":"ON",
                  "city":"Ottawa",
                  "customer_info":{
                    "last_delivery_date":null,
                    "orders_this_month":0,
                    "buyer_average_order":0.0
                  },
                  "country":"Canada",
                  "business_name":"Customer 1"
                },
                {
                  "province":"ON",
                  "city":"Waterloo",
                  "customer_info":{
                    "last_delivery_date":"2018-04-30T12:00:00-00:00",
                    "orders_this_month":1,
                    "buyer_average_order":5.0
                  },
                  "country":"Canada",
                  "business_name":"Customer 2"
                },
                {
                  "province":"ON",
                  "city":"Kingston",
                  "customer_info":{
                    "last_delivery_date":"2015-03-14T12:00:00-00:00",
                    "orders_this_month":1,
                    "buyer_average_order":2.5
                  },
                  "country":"Canada",
                  "business_name":"Customer 3"
                },
                {
                  "province":"ON",
                  "city":"Toronto",
                  "customer_info":{
                    "last_delivery_date":"2018-05-04T12:00:00-00:00",
                    "orders_this_month":5,
                    "buyer_average_order":4.0
                  },
                  "country":"Canada",
                  "business_name":"Customer 4"
                }
            ];
            
            function APICall (dI) {
                return new Promise(function(resolve, reject) {
                    if (dI !== undefined) {
                        customers.splice(dI, 1);
                    }
                    setTimeout(resolve, 3000, customers);
                });
            }
            
            return {
                    get : function(delIndex) {
                            
                            var defer = $q.defer();
                            
                            APICall(delIndex).then(function(response) {
                                defer.resolve(response);
                            }, function(response) {
                                defer.reject(response);
                            });
                            
                            return defer.promise;
                    }
            };
	});

