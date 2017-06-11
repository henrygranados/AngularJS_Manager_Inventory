/***** SERVICES ********/
(function () {
    'use strict';

angular
.module("App")
.factory('customerService', ['$http', function($http) { 
	return $http.get('Partials/jsonData.json')
	.success(function(data) {
		return data; 
	}) 
	.error(function(err) {
		return err; 
	}); 
}]);
})();