(function() {
	'use strict';

	angular
		.module('nHttpInterceptor.provider', [])
		.provider('nHttpInterceptor', interceptorProvider);

	/* @ngInject */
	function interceptorProvider() {
		/*jshint validthis: true */

		/* Defaults messages on error */
		var defaults = {
			error304: 'Not modified',
			error401: 'Unauthorized',
			error403: 'Forbidden',
			error404: 'Not found',
			error412: 'Precondition failed',
			error440: 'No accept header',
			error441: 'No token was provided',
			error442: 'Invalid token',
			error443: 'Token has expired',
			error445: 'Invalid 3rd party token',
			error500: 'Interal server error'
		};

		this.configure = function(config) {
			angular.extend(defaults, config);
		};

		this.$get = [function() {
			return {
				errorMessages: defaults
			};
		}];
	}

})();
