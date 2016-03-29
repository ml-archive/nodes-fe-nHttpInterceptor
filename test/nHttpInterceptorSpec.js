describe('nHttpInterceptor', () => {

	let nHttpInterceptorProvider;
	let nHttpInterceptor;

	beforeEach(() => {
		module('nCore.nHttpInterceptor.provider');
	});

	// What should the feature do?
	it('should return defaults', () => {

		inject(['nHttpInterceptor', (_nHttpInterceptor) => {
			nHttpInterceptor = _nHttpInterceptor; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nHttpInterceptor;

		// What is the expected output?
		const expected = {
			errorMessages: {
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
			}
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should configure custom error message', () => {

		// load the provider with module to be able to call its configuration methods
		module(['nHttpInterceptorProvider', (_nHttpInterceptorProvider) => {
			nHttpInterceptorProvider = _nHttpInterceptorProvider; // to use the provider in other parts
			nHttpInterceptorProvider.configure({error0: 'Oops! Something went wrong'});
		}]);

		inject(['nHttpInterceptor', (_nHttpInterceptor) => {
			nHttpInterceptor = _nHttpInterceptor; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nHttpInterceptor;

		// What is the expected output?
		expect(actual.errorMessages.error0).toBeDefined();
	});
});
