angular.module('addParamsToUrl', [])
    .controller('addParamsPopupController', ['$scope', function($scope){
        try{
            $scope.enable = JSON.parse(localStorage['enable']);
        }catch(e) {
            $scope.enable = false;
        }
        $scope.$watch('enable', function(newValue){
            localStorage['enable'] = JSON.stringify(newValue);
        });
    }]);