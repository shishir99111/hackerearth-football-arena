/**
 * The demo application that will allow to showcase the use of 
 * angular-dynamic-layout
 */
var gridApp = angular.module('gridApp', ['dynamicLayout', 'vesparny.fancyModal']);
const API_PREFIX = '/api/v1';


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
gridApp.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

/**
 * An example of controller that can be used to manipulate a specific card
 *
 * This broadcasts a layout event and catched the callback when all 
 * animations are completed
 */
gridApp.controller('cardController', ['$scope', '$rootScope', '$timeout', '$http', '$fancyModal',
  function($scope, $rootScope, $timeout, $http, $fancyModal) {


    $scope.open = function() {
      $fancyModal.open({ templateUrl: 'app/partials/player_info.html', scope: $scope });
    };

    $scope.details = function(name) {
      $scope.playerInfo = {};
      $http.get(`${API_PREFIX}/footballer/${name}`, {})
        .then(function(response) {
          $scope.playerInfo = response.data;
          $scope.isLoading = false;
          $scope.open();
        });
    }
  }
]);

/**
 * The main controller that is responsible for created the cards, filters, 
 * rankers
 */
gridApp.controller('GridContainer', ['$scope', '$http', function($scope, $http) {
  $scope.pageLimit = 40;
  $scope.sortOrder = 'rating';
  $scope.activePage = 1;
  $scope.isLoading = true;
  $scope.filter = {
    ball_control: '',
    dribbling: '',
    sliding_tackle: '',
    marking: '',
    standing_tackle: '',
    shot_power: ''
  };

  function getCardData(params) {
    $scope.cards = [];
    $http.get(`${API_PREFIX}/footballers`, { params })
      .then(function(response) {
        $scope.nOfPage = parseInt(response.data.recordsTotal / $scope.pageLimit) + 1;
        $scope.filteredRecords = response.data.recordsFiltered;
        $scope.totalRecords = response.data.recordsTotal;
        if (response.data.records.length !== 0) {
          response.data.records.forEach(function(footballer) {
            $scope.cards.push({
              id: 1,
              template: "app/partials/card.html",
              tabs: ["home", "work"],
              data: footballer
            });
          })
          $scope.noData = false;
        } else {
          $scope.noData = true;
        }
        $scope.isLoading = false;
      });
  }

  // first call to populate data
  getCardData({ page: 1, limit: $scope.pageLimit, sort: $scope.sortOrder, ...$scope.filter });

  // get data of page specified
  $scope.nextPage = function(page) {
    $scope.isLoading = true;
    $scope.activePage = page;
    getCardData({ page: page, limit: $scope.pageLimit, sort: $scope.sortOrder, search: $scope.searchText, ...$scope.filter });
  }

  // sorting of data on the basis of given parameter
  $scope.sortData = function(param) {
    $scope.isLoading = true;
    $scope.sortOrder = param;
    getCardData({ page: $scope.activePage, limit: $scope.pageLimit, sort: $scope.sortOrder, search: $scope.searchText, ...$scope.filter });
  }

  // populating data on the basis of footballers name
  $scope.search = function() {
    $scope.isLoading = true;
    $scope.activePage = 1;
    getCardData({ page: $scope.activePage, limit: $scope.pageLimit, sort: $scope.sortOrder, search: $scope.searchText, ...$scope.filter });
  }
}]);