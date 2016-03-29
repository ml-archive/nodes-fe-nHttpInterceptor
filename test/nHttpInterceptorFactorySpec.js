let nHttpInterceptorFactory;
let nLogger;
let $rootScope;

describe('nHttpInterceptorFactory', () => {

	beforeEach(() => {
		module('nCore.nHttpInterceptor.factory');

		module(($provide) => {
			$provide.provider('nHttpInterceptor', class {
				constructor() {
					this.defaults = {
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
				}

				$get() {
					return {
						errorMessages: this.defaults
					};
				};
			});

			$provide.service('nLogger', () => {
				return {
					log: (message, data) => {},
					error: (message, data) => {}
				}
			});
		});

		inject(['nHttpInterceptorFactory', 'nLogger', '$rootScope', (_nHttpInterceptorFactory, _nLogger, $rootScope) => {
			nHttpInterceptorFactory = _nHttpInterceptorFactory; // to use the instance in other parts
			nLogger 				= _nLogger;
			$rootScope.translate 	= {};
		}]);
	});

	// What should the feature do?
	it('should return errorHandle', () => {

		// What is the actual output?
		const actual = nHttpInterceptorFactory.errorHandle;

		// What is the expected output?
		expect(actual).toEqual( jasmine.any(Function) );
	});

	// What should the feature do?
	it('should call nLogger.error using message from defaults, if translation does not exist', () => {

		spyOn(nLogger, 'error');

		nHttpInterceptorFactory.errorHandle(404);

		// What is the actual output?
		const actual = nLogger.error;

		// What is the expected output?
		const expected = 'Not found';

		expect(actual).toHaveBeenCalledWith(expected);
	});

	// What should the feature do?
	it('should call nLogger.error using message from translation', () => {

		inject(['$rootScope', ($rootScope) => {
			$rootScope.translate 	= {
				error404: 'Ops! Not found'
			};
		}]);

		spyOn(nLogger, 'error');

		nHttpInterceptorFactory.errorHandle(404);

		// What is the actual output?
		const actual = nLogger.error;

		// What is the expected output?
		const expected = 'Ops! Not found';

		expect(actual).toHaveBeenCalledWith(expected);
	});
});