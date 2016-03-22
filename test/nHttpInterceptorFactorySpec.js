var nHttpInterceptorFactory;
var nLogger;
var $rootScope;

describe('nHttpInterceptorFactory', function() {

	beforeEach(function() {
		module('nCore.nHttpInterceptor.factory');

		module(function($provide) {
			$provide.provider('nHttpInterceptor', function() {

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

				this.$get = function() {
					return {
						errorMessages: defaults
					};
				};
			});

			$provide.service('nLogger', function() {
				return {
					log: function(message, data) {},
					error: function(message, data) {}
				}
			});
		});

		inject(['nHttpInterceptorFactory', 'nLogger', '$rootScope', function(_nHttpInterceptorFactory, _nLogger, $rootScope) {
			nHttpInterceptorFactory = _nHttpInterceptorFactory; // to use the instance in other parts
			nLogger 				= _nLogger;
			$rootScope.translate 	= {};
		}]);
	});

	// What should the feature do?
	it('should return errorHandle', function() {

		// What is the actual output?
		var actual = nHttpInterceptorFactory.errorHandle;

		// What is the expected output?
		expect(actual).toEqual( jasmine.any(Function) );
	});

	// What should the feature do?
	it('should call nLogger.error using message from defaults, if translation does not exist', function() {

		spyOn(nLogger, 'error');

		nHttpInterceptorFactory.errorHandle(404);

		// What is the actual output?
		var actual = nLogger.error;

		// What is the expected output?
		var expected = 'Not found';

		expect(actual).toHaveBeenCalledWith(expected);
	});

	// What should the feature do?
	it('should call nLogger.error using message from translation', function() {

		inject(['$rootScope', function($rootScope) {
			$rootScope.translate 	= {
				error404: 'Ops! Not found'
			};
		}]);

		spyOn(nLogger, 'error');

		nHttpInterceptorFactory.errorHandle(404);

		// What is the actual output?
		var actual = nLogger.error;

		// What is the expected output?
		var expected = 'Ops! Not found';

		expect(actual).toHaveBeenCalledWith(expected);
	});
});