(function () {
	'use strict';

	angular
		.module('MODULENAME')
		.directive('moduleName', moduleName);

	/* @ngInject */
	function moduleName($filter) {

		var DDO = {
			restrict: 'EA',
			link: link,
			templateUrl: 'MODULENAME.template.html'
		};
		return DDO;

		function link(scope, element) {
			console.log('Jeg er et directive!');
		}

	}

})();
