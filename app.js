var App = angular.module('App', ['ui.bootstrap'])

App.controller('mainController', function($scope, $modal, $log, $filter) {

  $scope.sortType     = 'id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPerson  = '';     // set the default search/filter term


  // Array - List of People   
  setTimeout(function(){
    $scope.$apply(function(){
    $scope.People = [
    { name: 'Mike', Lastname: 'White', age: 26 },
    { name: 'Carl', Lastname: 'Barns', age: 41 },
    { name: 'Deb', Lastname: 'McDonals',age: 78 },
    { name: 'Tommy', Lastname: 'Humbs', age: 32 },
    { name: 'Mary', Lastname: 'Browns', age: 18 },
    { name: 'Alex', Lastname: 'Sams', age: 50 },
    { name: 'Beto', Lastname: 'Burns', age: 27 },
    { name: 'Kathy', Lastname: 'Sams', age: 43 }
  ];  
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
var modalTemplate= '<div class="modal-header">   <a class="close" data-dismiss="modal" ng-click="cancel()"><i class="fa fa-times-circle-o" style="margin:10px;color:black;font-size:35px;"></i></a><h1>.</h1></div><div class="modal-body"><form >' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">NAME:</label><input style = "width:200px;"type="text" class="form-control ng-scope ng-pristine ng-valid" ng-model="person.name"></br>' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">LASTNAME:</label><input style = "width:200px;" type="text" class="form-control ng-scope ng-pristine ng-valid" ng-model="person.Lastname"></br>' +
        ' <label class="col-sm-3 control-label no-padding-right ng-binding">AGE:</label><input style = "width:200px;" type="number"class="form-control ng-scope ng-pristine ng-valid" ng-model="person.age"></br>' +
        ' <button id = "myid" type="button" class="btn btn-success" ng-click="add()"><i class="ace-icon fa fa-check"></i>Save</button>' +
        '  <button type="reset" class="btn ">Clear</button>' +
        ' </form>' +
        '</div>' +
        '<div class="modal-footer">' +
        '  <a data-dismiss="modal" aria-hidden="true" class="btn btn-primary" ng-click="cancel()">close</a>' +
        '</div>';
  //$scope.People = [];  

  $scope.openPopupScreen = function(people) {

    var modalInstance = $modal.open({
      template: modalTemplate ,
      controller: ModalInstanceCtrl,
      resolve: {
        person: function(){
          return people;
        }
      }
    });
    modalInstance.result.then(function (newPerson) {
      $scope.People.push(newPerson);
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

  $scope.add = function() {
    $modalInstance.close($scope.person);
  };
}; 
   
});
