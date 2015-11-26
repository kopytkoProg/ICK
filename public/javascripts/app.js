/**
 * Created by michal on 26.11.2015.
 */


var ick = angular.module('ick', [
    'ngRoute'
]);


ick.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'indexPartial/index.html'
        }).
        when('/test', {
            templateUrl: 'test'
        }).
        when('/management', {
            templateUrl: 'indexPartial/management.html'
        }).
        when('/create', {
            templateUrl: 'indexPartial/create.html',
            controller: 'CreateController'
        }).
        when('/competition', {
            templateUrl: 'indexPartial/competition.html'
        }).
        when('/draw', {
            templateUrl: 'indexPartial/draw.html'

        }).
        when('/rate', {
            templateUrl: 'indexPartial/rate.html'

        }).
        when('/entryList', {
            templateUrl: 'indexPartial/entryList.html'

        }).
        when('/rankingList', {
            templateUrl: 'indexPartial/rankingList.html'

        }).
        when('/winnerList', {
            templateUrl: 'indexPartial/winnerList.html'

        }).
        when('/entry', {
            templateUrl: 'indexPartial/entry.html'

        }).
        when('/winnerList_2', {
            templateUrl: 'indexPartial/winnerList_2.html'

        }).otherwise({
            redirectTo: '/'
        });



    }]);