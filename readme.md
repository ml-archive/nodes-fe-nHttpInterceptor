# Nodes http inceptor
_Not maintained by Nodes anymore_

[![Build Status](https://travis-ci.org/nodes-frontend/nHttpInterceptor.svg?branch=master)](https://travis-ci.org/nodes-frontend/nHttpInterceptor)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/nodes-frontend/nHttpInterceptor/badge.svg?branch=master)](https://coveralls.io/github/nodes-frontend/nHttpInterceptor?branch=master)
[![devDependency Status](https://david-dm.org/nodes-frontend/nHttpInterceptor/dev-status.svg)](https://david-dm.org/nodes-frontend/nHttpInterceptor#info=devDependencies)
[![Dependency Status](https://david-dm.org/nodes-frontend/nHttpInterceptor.svg)](https://david-dm.org/nodes-frontend/nHttpInterceptor)

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


## messages
Messages(nMessages) is a part of the Nodes Galactic core.
