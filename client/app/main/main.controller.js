'use strict';

angular.module('testManagerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.projects = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      //socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/projects').then(function(projects) {
      $scope.projects = projects.data;
      //socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.saveChanges = function() {
      _.forEach($scope.projects, function(project){
        $http.put('/api/projects/'+project._id, project).then(function(res){
          console.log(res);
        });
      });
      $scope.editMode = false;
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
