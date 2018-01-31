angular.module("app", [])
.controller('myCtrl', function($scope, $http) {


    $http.get("tasks.json") //получаем JSON файл с помощью сервиса $http
    .success(function(response) {
        $scope.tasks = response;
    });

    $scope.currentView = "Полученные данные";
    $scope.page = 1;

    $scope.stylePrior = {
        color: 'rebeccapurple',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    $scope.pointer = {
        cursor: 'pointer'
    };

    $scope.borderInp = {
        borderColor: 'transparent'
    };

    $scope.next = function(n) { //переход по клику на страницу задачи
        $scope.currentView = "Редактировать";
        $scope.page = 2;
        $scope.item = n;
    };

    $scope.inlineeditor = function() {
        $scope.x = false;
        $scope.borderInp = {
            borderColor: ''
        }
    };

    $scope.previous = function() { //переход по клику на первую страницу
        $scope.currentView = "Полученные данные";
        $scope.page = 1;
    };

    $scope.x = true; //по умолчанию строка без возможности редактирования

    $scope.ok = function() { //отправляем задачу на сервер 
        $scope.x = true;
        $http.put('http://www.example.com/buckets', $scope.item)
            .then(function(response) {
                console.log('success', response.data)
            }, function(response) {
                console.log('error');
            });
    }
});