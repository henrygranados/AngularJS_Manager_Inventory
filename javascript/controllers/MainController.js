(function(){
  'use strict';

  angular
  .module('App')
  .controller('MainController', ['$scope', 'customerService' , '$modal',  function($scope, customerService, $modal) {

    customerService.success(function(data) { 

  $scope.sortType     = 'id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPerson  = '';  
     // set the default search/filter term


  // Array - List of People   
  setTimeout(function(){
    $scope.$apply(function(){
      $scope.People = data;
    });
  },1000);
 /*
 This function shows loading customer's data
 */
 $scope.items = [{name: "One"}];
 setTimeout(function() {
  $scope.$apply(function() {
    $scope.items[0].lateLoader = ' ';  
 });
}, 1000);
 
   /*
  This function removes a customer
  */
  $scope.removePerson = function(customerName, searchPerson){
    if(confirm("Are you sure to remove Customer")){
      angular.forEach($scope.People.customers, function(value, key) {
        if (value.name == customerName){
          $scope.People.customers.splice(key, 1);
          $scope.searchPerson = null;
        }
      });
    }
  }; 

  $scope.openPopupScreen = function(people) {

    var modalInstance = $modal.open({
      templateUrl: "javascript/partials/partial1.html" ,
      controller: ModalInstanceCtrl,
      resolve: {
        person: function(){
          return people;
        }
      }
    });
    modalInstance.result.then(function (newPerson) {

      angular.forEach($scope.People.customers, function(value, key) {
        if (value.name == newPerson.name){
          $scope.People.customers.splice(key, 1);
        }
      });

      $scope.People.customers.push(newPerson);
    });
  };

  var ModalInstanceCtrl = function($scope, $modalInstance, person) {
    console.log(person);
    $scope.person = person || {name: '', Lastname: '', age: ''};


    $scope.ok = function() {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.add = function(newItem) {
      if(newItem == null || newItem == ''){

        angular.forEach($scope.People.customers, function(value, key) {
          if (value.name == newItem){
            $scope.People.customers.splice(key, 1);
          }
        }); 
      }
      else{
        $modalInstance.close($scope.person);
      }
    };
  }; 

});

}]);
}());


