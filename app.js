
var App = angular.module('App', ['ui.bootstrap'])

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
    { id: 7, name: 'Beto', Lastname: 'Burns', age: 27 }
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
    if(confirm("Are you sure to remove Customer")){
        angular.forEach($scope.People, function(value, key) {
            if (value.name === index){
                $scope.People.splice(key, 1);
            }
        });
    }
};   
  $scope.openPopupScreen = function() {

    var modalInstance = $modal.open({
      template: '<div class="modal-header">   <a class="close" data-dismiss="modal" ng-click="cancel()"><i class="fa fa-times-circle-o" style="margin:10px;color:black;font-size:35px;"></i></a><h1>Add Customer</h1></div><div class="modal-body">    <form >' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">NAME:</label><input style = "width:300px;"type="text" class="form-control ng-scope ng-pristine ng-valid" ng-model="person.name"></br>' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">LASTNAME:</label><input style = "width:300px;" type="text" class="form-control ng-scope ng-pristine ng-valid" ng-model="person.Lastname"></br>' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">AGE:</label><input style = "width:300px;" type="number"class="form-control ng-scope ng-pristine ng-valid" ng-model="person.age"></br>' +
        ' <button id = "myid" type="button" class="btn btn-success" ng-click="add()"><i class="ace-icon fa fa-check"></i>Add New Customer</button>' +
        '  <button type="reset" class="btn ">Clear</button>' +
        '<div ng-hide = "error_name_message" id="Error_Message_name">'+
        '<p>Please enter a name</p>'+
      '</div>'+
      '<div ng-hide = "error_lastname_message" id="Error_Message_Lastname">'+
        '<p>Please enter a lastname</p>'+
      '</div>'+
      '<div ng-hide = "error_age_message" id="Error_Message_Age">'+
        '<p>Please enter age</p>'+
      '</div>'+
        ' </form>' +
        '</div>' +
        '<div class="modal-footer">' +
        '  <a data-dismiss="modal" aria-hidden="true" class="btn btn-primary" ng-click="cancel()">close</a>' +
        '</div>',
      controller: ModalInstanceCtrl
    });
    modalInstance.result.then(function (newPerson) {
      $scope.People.push(newPerson);
    });
  };

var ModalInstanceCtrl = function($scope, $modalInstance) {
  $scope.person = {name: '', Lastname: '', age: ''};
  $scope.error_name_message = true;
  $scope.error_lastname_message = true;
  $scope.error_age_message = true;

  
  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.add = function() {
    //Pass newPerson to caller from main controller
    if($scope.person.name === ""){  

   $scope.error_name_message= false;
      $("#Error_Message_name").show().delay(1900).fadeOut(900); // don't leave error on screen for long
    }
    else if($scope.person.Lastname === ""){  
      $scope.error_lastname_message = false;
      $("#Error_Message_Lastname").show().delay(1900).fadeOut(900); // don't leave error on screen for long
    }
    else if($scope.person.age === "" || $scope.person.age < 1){  
      $scope.error_age_message = false;
      $("#Error_Message_Age").show().delay(1900).fadeOut(900); // don't leave error on screen for long
    }
    else{
    $modalInstance.close($scope.person);
   }
  };
};
   
});





