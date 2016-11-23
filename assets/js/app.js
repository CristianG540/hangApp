var hangApp = angular.module('hangApp', ['ngRoute', 'ui.bootstrap']);

hangApp.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'mainCtrl'
      })
      .when('/play', {
        templateUrl : 'templates/play.html',
        controller  : 'playCtrl'
      })
      .otherwise({
        redirectTo: '/',
        caseInsensitiveMatch: true
      });
  }
]);

hangApp.controller('mainCtrl', function($scope, $location) {
  $scope.message = 'Hola, Mundo!';
  $scope.go = function ( path ) {
    $location.path( path );
  };
});

hangApp.controller('playCtrl', function($scope) {
  var words = [
    'Rails', 'AngularJS', 'Bootstrap', 'Ruby', 'JavaScript',
    'authentication', 'function', 'array', 'object', 'sublime',
    'github', 'agile', 'route', 'database', 'model', 'view',
     'controller', 'terminal', 'array', 'data', 'inheritance',
    'Heroku', 'scope',  'closure'
  ];

  $scope.missesAllowed = 6;

  var getRandomWord = function() {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
  };

  var makeLetters = function(word) {
    return _.map(word.split(''), function(character) {
      return { name: character, chosen: false };
    });
  };

  var revealSecret = function() {
    _.each($scope.secretWord, function(letter) {
      letter.chosen = true;
    });
  };

  var checkForEndOfGame = function() {
    $scope.win = _.reduce($scope.secretWord, function(acc, letter) {
      return acc && letter.chosen;
    }, true);

    if (!$scope.win && $scope.numMisses === $scope.missesAllowed) {
      $scope.lost = true;
      revealSecret();
    }
  };

  $scope.reset = function() {
    _.each($scope.letters, function(letter) {
      letter.chosen = false;
    });
    $scope.secretWord = makeLetters(getRandomWord());
    $scope.numMisses = 0;
    $scope.win = false;
    $scope.lost = false;
  };

  $scope.reset();

  $scope.try = function(guess) {
    guess.chosen = true;
    var found = false;
    _.each($scope.secretWord,
           function(letter) {
             if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
               letter.chosen = true;
               found = true;
             }
           });
    if (!found) {
      $scope.numMisses++;
    }
    checkForEndOfGame();
  };

  $scope.letters = makeLetters("abcdefghijklmnopqrstuvwxyz");
});


/*todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
  $scope.formData = {};
  $scope.todos = [];

  TodoService.getTodos().then(function(response) {
    $scope.todos = response;
  });

  $scope.addTodo = function() {
    TodoService.addTodo($scope.formData).then(function(response) {
      $scope.todos.push($scope.formData);
      $scope.formData = {};
    });
  };

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    });
  };
}]);*/
