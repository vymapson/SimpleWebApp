angular.module('customerController', [])

	// inject the util service factory into our controller
	.controller('simpController', ['$scope', '$q', 'Customers', function($scope, $q, Customers) {
                        
            $("#customerDetailsDialog").dialog({ 
                autoOpen: false, 
                modal: true, 
                resizable: false,
                width: '564px',
                open: function (event, ui) {
                    $(this).parent().find('.ui-dialog-titlebar')
                            .css({'background-color':'white', 'background-image': 'none', 'border': 'none'});

                            var custSel = $(this).data('custSel');
                            Customers.get().then(function(cc_list){
                               populateCustDetail(cc_list[custSel]);
                            }).catch(function(error){
                               //error routine
                            });
                            
                }
            });
            
            $scope.openCustomerDetails = function(customer) {
                
                $("#customerDetailsDialog").dialog('open');
                $("#customerDetailsDialog").data('custSel', $scope.customers.indexOf(customer));
            };
            
            $("#customerDeleteDialog").dialog({ 
                autoOpen: false, 
                modal: true, 
                resizable: false, 
                open: function (event, ui) {
                    $(this).parent().find('.ui-dialog-titlebar').hide();
                },
                buttons: [
                    {
                        text: "DELETE",
                        classes: 'dialogButton',
                        click: function() {
                           $(this).dialog("close");
                           var custSel = $(this).data('custSel');
                           Customers.get(custSel).then(function(cc_list){
                               $scope.customers = cc_list;
                           }).catch(function(error){
                               //error routine
                           });
                        }
                    },
                    {
                        text: "CANCEL",
                        classes: 'dialogButton',
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
            
            $scope.deleteCustomer = function(customer) {
       
                $('#customerDeleteDialog').dialog('open');
                $('#customerDeleteDialog').data('custSel', $scope.customers.indexOf(customer));
            };
            
            $scope.loading = true;

            Customers.get().then(function(cc_list){
                $scope.customers = cc_list;
                $scope.loading = false;
            }).catch(function(error){
                //error routine
            });
            
            var populateCustDetail = function (custInfo) {
                $('#customerDetailsDialog').parent().find('.ui-dialog-title').text(custInfo.business_name).css({'font-family':'arial', 'font-size':'18px'});
                
                var locationString = custInfo.city + ', ' + custInfo.province;
                $('#custDetLocation').text(locationString);

                var buyerAverageOrder = '$' + custInfo.customer_info.buyer_average_order;
                $('#custDetAvOrder').text(buyerAverageOrder);
                
                var lastDelDateString = custInfo.customer_info.last_delivery_date;
                if (lastDelDateString !== null) {
                    var lastDelDate = new Date(lastDelDateString);
                    
                    var lastDelDateStringFormatted = lastDelDate.toLocaleString("en-us", { month: "long" }) + ', ' + lastDelDate.getDate() + ' ' +  lastDelDate.getFullYear();
                    $('#custDetLastDel').text(lastDelDateStringFormatted);
                } else {
                    $('#custDetLastDel').text('none');
                }
                
                $('#custDetTotOrders').text(custInfo.customer_info.orders_this_month);

            };

	}]);


