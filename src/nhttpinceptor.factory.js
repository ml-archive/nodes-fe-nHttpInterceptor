(function () {
	'use strict';

	angular
		.module('nHttpInceptor.factory', ['nHttpInceptor.provider'])
		.factory('nHttpInceptor', nHttpInceptor);

	/* @ngInject */
	function nHttpInceptor(nhttpinceptor, $rootScope) {

		var service = {
			errorHandle: errorHandle
		};

		return service;

		function errorHandle(statuscode) {
			/* Convert it so match the object with keys and errormessages in */
			var getErrorMsg = "error" + statuscode;

			/* Message it out */
			/* If it exists in translate, then message it, or else message the string */
			if($rootScope.translate[nhttpinceptor.errorMessages[getErrorMsg]]) {
				console.log($rootScope.translate[nhttpinceptor.errorMessages[getErrorMsg]]);
			} else {
				console.log(nhttpinceptor.errorMessages[getErrorMsg]);
			}
		}
	};

})();
