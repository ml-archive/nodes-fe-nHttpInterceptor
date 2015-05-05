(function () {
	'use strict';

	angular
		.module('nHttpInterceptor.factory', ['nHttpInterceptor.provider'])
		.factory('nHttpInterceptor', nHttpInterceptor);

	/* @ngInject */
	function nHttpInterceptor(nHttpInterceptor, $rootScope, messages) {

		var service = {
			errorHandle: errorHandle
		};

		return service;

		function errorHandle(statuscode) {
			/* Convert it so match the object with keys and errormessages in */
			var getErrorMsg = "error" + statuscode;

			/* Message it out */
			/* If it exists in translate, then message it, or else message the string */
			if($rootScope.translate[nHttpInterceptor.errorMessages[getErrorMsg]]) {
				messages.create({
					type: 'alert',
					content: $rootScope.translate[nHttpInterceptor.errorMessages[getErrorMsg]]
				})
			} else {
				messages.create({
					type: 'alert',
					content: nHttpInterceptor.errorMessages[getErrorMsg]
				})
			}
		}
	};

})();
