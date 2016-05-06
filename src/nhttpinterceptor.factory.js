(function () {
	'use strict';
	
	angular
		.module('nCore.nHttpInterceptor.factory', ['nCore.nHttpInterceptor.provider'])
		.factory('nHttpInterceptorFactory', interceptorFactory);

	/* @ngInject */
	function interceptorFactory(nHttpInterceptor, $rootScope, nLogger) {

		var service = {
			errorHandle: errorHandle
		};

		return service;

		function errorHandle(statuscode) {
			/* Convert it so match the object with keys and errormessages in */
			var getErrorMsg = 'error' + statuscode;

			/* Message it out */
			/* If it exists in translate, then message it, or else message the string */
			if($rootScope.translate[getErrorMsg]) {
				nLogger.error($rootScope.translate[getErrorMsg]);
			} else if(nHttpInterceptor.errorMessages[getErrorMsg]) {
				nLogger.error(nHttpInterceptor.errorMessages[getErrorMsg]);
			}
		}
	}

})();
