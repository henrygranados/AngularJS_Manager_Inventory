(function(){
  'use strict';

  angular
  .module('App')
  .controller('MainController', ['$scope', 'customerService' , '$modal',  function($scope, customerService, $modal) {

    customerService.success(function(data) {

  $scope.sortType     = 'id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPerson  = '';

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
  $scope.removePerson = function(customerName, person, searchPerson){
    if(confirm("Are you sure to remove Customer")){
      angular.forEach($scope.People.customers, function(value, key) {
        if (value.name === customerName){
          $scope.People.customers.splice(key, 1);
          $scope.searchPerson = null;
        }
      });
    }
  };

  $scope.openPopupScreen = function(people, userIndex) {
    var modalInstance = $modal.open({
      templateUrl: "Partials/partial1.html" ,
      controller: ModalInstanceCtrl,
      resolve: {
        person: function(){
          return angular.copy(people); // making a copy to user's object to pass it to Modal
        }
      }
    });

    modalInstance.result.then(function (newPerson) {

        if(userIndex === undefined){
            if(newPerson.name === "" && newPerson.lastname === "" && newPerson.age === ""){
              return;
            }else{
                $scope.People.customers.push(newPerson);
            }
        }else{
          // replacing new updates for old object
            angular.extend($scope.People.customers[userIndex], newPerson);
        }
    });
  };

  var ModalInstanceCtrl = function($scope, $modalInstance, person) {
    console.log(person);
    $scope.person = person || {name: '', lastname: '', age: ''};

    // Declaring 3 variables to deal with button in Modal
    $scope.buttonClear = false;
    $scope.buttonSave = false;
    $scope.buttonUpdate = false;
    if($scope.person.name !== ""){
         $scope.buttonClear = true;
         $scope.buttonSave = true;
    }

    $scope.buttonUpdate = ($scope.person.name === "") ? "Close" : "Update";
    $scope.ok = function() {
      $modalInstance.close($scope.selected.item);
    };

    $scope.UpdateUser = function (newItem) {
        if(newItem !== null){
            $modalInstance.close($scope.person);
        }
    }

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.add = function() {
        $modalInstance.close($scope.person);
    };
  };

});

}]);
}());


