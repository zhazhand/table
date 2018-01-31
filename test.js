describe("HTTP service test", function() {

    // Arrange
    var mockScope, controller, backend;

    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.inject(function($httpBackend) {

        backend = $httpBackend;


        backend.expect("GET", "tasks.json").respond(
            [{
                "name": "Today_task1",
                "obj_status": "active"
            }, {
                "name": "Today_task2",
                "obj_status": "active",
                "description": "Тестовые данные"
            }, {
                "name": "Today_task3",
                "obj_status": "deleted"
            }]);
    }));

    beforeEach(angular.mock.inject(function($controller, $rootScope, $http) {
        mockScope = $rootScope.$new();
        $controller("myCtrl", {
            $scope: mockScope,
            $http: $http
        });

        backend.flush();
    }));

    // Act and Assess
    it("Ajax запрос", function() {

        backend.verifyNoOutstandingExpectation();
    });

    it("Обработка данных", function() {
        expect(mockScope.tasks).toBeDefined();
        expect(mockScope.tasks.length).toEqual(3);
    });

    it("Последовательность данных в ответе", function() {
        expect(mockScope.tasks[0].name).toEqual("Today_task1");
        expect(mockScope.tasks[1].name).toEqual("Today_task2");
        expect(mockScope.tasks[2].name).toEqual("Today_task3");
    });

    it("Наличие данных в ответе", function() {
        expect(mockScope.tasks[0].obj_status).toEqual("active");
        expect(mockScope.tasks[1].description).toEqual("Тестовые данные");
        expect(mockScope.tasks[2].obj_status).toEqual("deleted");
    });
});

describe("Controller Test", function () {

    // Arrange
    var mockScope = {};
    var controller;

    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {    
        // создание нового scope
        mockScope = $rootScope.$new();

        controller = $controller("myCtrl", {
            $scope: mockScope
        });
    }));

    // Act and Assess
    it("Создание свойства page", function () {
        // Если контроллер работает правильно, то после его создания будет содержать значение page = 1
        expect(mockScope.page).toEqual(1);
    })
    it("Переход на другое представление", function () {
        // после запуска функции next значение свойства page должно быть равным 2
        mockScope.next();
        expect(mockScope.page).toEqual(2);
    });
});