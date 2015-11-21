angular.module('authApp', ['ui.router', 'satellizer'])
.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
})

.config( function ($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.tpl.html',
            controller: 'LoginCtrl as login'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.tpl.html',
            controller: 'RegisterCtrl as register'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.tpl.html',
            controller: 'DashboardCtrl as dashboard'
        });

    $urlRouterProvider.otherwise('/login');

    $authProvider.loginUrl = 'http://localhost:8000/api/v1/auth/login';
    $authProvider.signupUrl = 'http://localhost:8000/api/v1/auth/register';
})
.factory('UserService', function ($http) {
    return {

    };
})

.controller('LoginCtrl', function ($state, $auth) {
    var vm = this;

    vm.user = {};

    vm.login = function __login() {
        $auth.login({
            email: vm.user.email,
            password: vm.user.password
        }).then(function (response) {
            console.log(response);
            $state.go('dashboard');
        }).catch(function (response) {
            console.log(response);
            window.alert('Error: Login failed');
        });
    };
})

.controller('RegisterCtrl', function ($state, $auth) {
    var vm = this;
    
    vm.user = {};

    vm.register = function __register() {
        $auth.signup({
            name: vm.user.name,
            email: vm.user.email,
            password: vm.user.password
        }).then(function (response) {
            console.log(response);
            $state.go('dashboard');
        }).catch(function (response) {
            console.log(response);
            window.alert('Error: Register failed');
        });
    };
})
.controller('DashboardCtrl', function ($state, $auth) {
    var vm = this;
    
    vm.logout = function __logout() {
        $auth.logout();
        $state.go('login');
    };
})
;
