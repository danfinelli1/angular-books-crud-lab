console.log('sanitiy check app.js');

angular
  .module('pokemon', ['ngRoute']) //
  .controller('pokemonController', pokemonController)
  .config(config);


config.$inject = ['$routeProvider', '$locationProvider']

function config($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/pokemon.html',
      controllerAs: 'pokemonCtrl',
      controller: 'pokemonController'
    })
    .when('/newPoke', {
        templateUrl: 'templates/newPoke.html',
        controllerAs: 'pokemonCtrl',
        controller: 'pokemonController'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

pokemonController.$inject = ['$http'];
function pokemonController ($http) {
  var vm = this;
  vm.newPoke={};
$http({
  method: 'GET',
  url: 'http://super-crud.herokuapp.com/pokemon'
}).then(function successCallback(response) {
  vm.pokemon = response.data.pokemon;
}, function errorCallback(response) {
  console.log('There was an error getting the data', response);
});

vm.createPoke = function(poke){
  $http({
    method: 'POST',
    url: 'http://super-crud.herokuapp.com/pokemon',
    data: vm.newPoke
  }).then(function succCallBack(res){
    vm.pokemon.push(res.data);
  }, function errCallback(res){
    console.log('error posting');
  });
}

}
