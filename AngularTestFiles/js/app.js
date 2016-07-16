var app = angular.module("yotpoApp", []);

app.controller("yotpoCtrl", function($scope, $http) {
	loadData();

	// $scope.SendReview = function () {
	// 	$http.post('http://api.yotpo.com/oauth/token',  {"client_id": "8Gu0wvo2873r7uP7A8hFjhGEhWzXBds8Rl3VEJgu",
 // "client_secret": "e6lhE3J89U5kecx8G5jf52QDCzF0iHtzu8zzao4p",
 // "grant_type": ""})
	// 	.success(function (response) {
	// 		console.log("It works!");		
	// 	});
		
		
	// };

	function loadData() {
		$http.get("./widget.html")
		.then(function (response) {
			$scope.widget = response.data;

			$('$scope.widget').append('review');

			console.log('It works!');
		});
	};

});