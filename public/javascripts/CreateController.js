ick.controller('CreateController', function ($scope, $routeParams) {


    var onTypeChange = function (selected) {
        if (selected == 'L') {
            $('#sendButton').attr('href', '#/draw');
        } else {
            $('#sendButton').attr('href', '#/competition');
        }


    };

    $scope.data = {
        inputTyp: 'L'
    };

    onTypeChange($scope.data.inputTyp);
    $scope.inputTypeChange = onTypeChange

});