var app = angular.module('appLuckyDraw', []); 
app.controller('contLuckyDraw', function($scope, $interval) {
    $scope.disableDraw = false;
    $scope.isLoading = false;
    $scope.max_ticket = 0;
    $scope.ticket = 0;
    $scope.count = 0;
    $scope.rewardList = [
        {title:'S', rate:1},
        {title:'A', rate:2},
        {title:'B', rate:7},
        {title:'C', rate:20},
        {title:'D', rate:30},
        {title:'E', rate:40},
    ];
    $scope.box = [];
    $scope.rewardList.forEach(function(item){
        var i = 0;
        while(i < item.rate){
            $scope.box.push(item.title);
            i++;
        }
    });
    $scope.results = [];

    $scope.reset = function(){
        $scope.disableDraw = false;
        $scope.isLoading = false;
        $scope.max_ticket = 10;
        $scope.ticket = 10;
        $scope.count = 0;
        $scope.results = [];
        for(i=0;i<$scope.max_ticket;i++){
            $scope.results.push({result:'Reward'});
        }
    };
    $scope.reset();

    $scope.drawing = function(repeat = false){
        if($scope.ticket > 0){
            var result = Math.floor(Math.random() * 100);

            var progress = 0;
            $scope.results[$scope.count].result = progress+'%';
            var loading = $interval(function () {
                progress += 10;
                $scope.results[$scope.count].result = progress+'%';
                if (progress >= 100) {
                    $interval.cancel(loading);
                    $scope.results[$scope.count].result = 'Rank '+$scope.box[result];
                    $scope.ticket--;
                    $scope.count++;
                    if(repeat == true){$scope.drawing(true);}
                    else{$scope.isLoading = false;}
                    if($scope.ticket == 0){$scope.disableDraw = true;}
                }
            }, 100);
        }
    }

    $scope.draw = function() {
        if($scope.isLoading == true){
            return false;
        }else{
            $scope.isLoading = true;
            $scope.drawing();
        }
    };

    $scope.draw10 = function() {
        if($scope.isLoading == true){
            return false;
        }else{
            if($scope.ticket==10){
                $scope.isLoading = true;
                $scope.drawing(true);
            }
        }
    };

});