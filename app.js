var App = angular.module('sortApp', ['ui.bootstrap'])

App.controller('mainController', function($scope, $modal, $log, $filter) {
  $scope.sortType     = 'id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPerson  = '';     // set the default search/filter term
  
  // Array - List of People   
  $scope.People = [
    { id: 1, name: 'Mike', Lastname: 'White', age: 26 },
    { id: 2, name: 'Carl', Lastname: 'Barns', age: 41 },
    { id: 3, name: 'Deb', Lastname: 'McDonals',age: 78 },
    { id: 4, name: 'Tommy', Lastname: 'Humbs', age: 32 },
    { id: 5, name: 'Mary', Lastname: 'Browns', age: 18 },
    { id: 6, name: 'Alex', Lastname: 'Sams', age: 50 },
    { id: 7, name: 'Beto', Lastname: 'Burns', age: 27 },
    { id: 8, name: 'Liz', Lastname: 'Marls', age: 23}
  ];  

  /*
  This function adds a new customer
  */
   $scope.addPerson = function(){
    var customer = {
        name: $scope.name,
        Lastname: $scope.Lastname,
        age: $scope.age,
    };
    
    $scope.People.push(customer);
  };
   /*
  This function removes a customer
   */
   $scope.removePerson = function(index){
    $scope.People.splice(index, 1);
   };  
  $scope.openPopupScreen = function() {

    var modalInstance = $modal.open({
      template: '<div class="modal-header">   <a class="close" data-dismiss="modal" ng-click="cancel()">X</a><h1>Add Customer</h1></div><div class="modal-body">    <form >' +
        '  <label>Name:</label><input type="text" class="span3" ng-model="name"></br>' +
        ' <label>Lastname:</label><input type="text" class="span3" ng-model="Lastname"></br>' +
        ' <label>Age:</label><input type="number" class="span3" ng-model="age"></br>' +
        ' <button type="button" class="btn btn-success" ng-click="add()">Add In List</button>' +
        '  <button type="reset" class="btn ">Clear</button>' +
        ' </form>' +
        '</div>' +
        '<div class="modal-footer">' +
        '  <a data-dismiss="modal" aria-hidden="true" class="btn btn-primary" ng-click="cancel()">close</a>' +
        '</div>',
      controller: ModalInstanceCtrl
    });

  };

  $scope.newPerson = {
   //Bind ng-model from modal input to properties of this
};

$scope.add = function() {
    //Pass newPerson to caller from main controller
    $modalInstance.close($scope.newPerson);
};



var ModalInstanceCtrl = function($scope, $modalInstance) {
  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
   
});
