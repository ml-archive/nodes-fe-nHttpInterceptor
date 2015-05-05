# Nodes http inceptor


## Implement it in config.js

```javascript
(function () {
	'use strict';

	var core = angular.module('config', ['nHttpInceptor']);


	core.config(configure);

	/* @ngInject */
	function configure($httpProvider, nhttpinceptorProvider) {

		/* nhttpinceptor */

		// Set up the error messages custom
		// You can set error401 to a translate key, fx "errorRandomMsg". It will then output the translate key,
		// and if it does not exist, then it will output "errorRandomMsg"
		nhttpinceptorProvider.configure({
			error401: "Du har ikke adgang til dette."
		});

		//The inceptor
		$httpProvider.interceptors.push(function($q, nHttpInceptor) {
			return {
				responseError: function(res) {

					nHttpInceptor.errorHandle(res.status);

					return $q.reject(res);
				}
			};
		});
		/* nhttpinceptor */

	}

})();
```
