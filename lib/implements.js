/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const IMPLEMENTS_TYPES = {
  INTERFACE: '__IS_VALID_IMPLEMENTS_INTERFACE_OBJECT__',
  TYPE: '__IS_VALID_IMPLEMENTS_TYPE_OBJECT__'
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IMPLEMENTS_TYPES;


const VALID_TYPES = ['number', 'object', 'string', 'symbol', 'function', 'boolean', 'array', 'any']
/* harmony export (immutable) */ __webpack_exports__["b"] = VALID_TYPES;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__factory__ = __webpack_require__(7);


const invalidInterface = Object(__WEBPACK_IMPORTED_MODULE_0__factory__["a" /* default */])({
  message: 'Invalid object given as Interface property, must be a valid type() object.'
})
/* harmony export (immutable) */ __webpack_exports__["b"] = invalidInterface;


const invalidType = Object(__WEBPACK_IMPORTED_MODULE_0__factory__["a" /* default */])({
  message: ({ type } = {}) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
})
/* harmony export (immutable) */ __webpack_exports__["d"] = invalidType;


const invalidArrayElement = Object(__WEBPACK_IMPORTED_MODULE_0__factory__["a" /* default */])({
  message: (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
})
/* harmony export (immutable) */ __webpack_exports__["a"] = invalidArrayElement;


const invalidShape = Object(__WEBPACK_IMPORTED_MODULE_0__factory__["a" /* default */])({
  message: 'Invalid object given as a type shape, must be a valid Interface().'
})
/* harmony export (immutable) */ __webpack_exports__["c"] = invalidShape;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__implements__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__implements__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Interface__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return __WEBPACK_IMPORTED_MODULE_1__Interface__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return __WEBPACK_IMPORTED_MODULE_2__type__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IMPLEMENTS_TYPES", function() { return __WEBPACK_IMPORTED_MODULE_3__constants__["a"]; });






/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__implements__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__implements__["a"]; });


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (Interface => object => {
  if (undefined === 'production') return object
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Interface__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Interface__["a"]; });


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ((Interface = {}, { error: shouldThrow = false, warn = false, trim = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* IMPLEMENTS_TYPES */].TYPE]: isType = false } = property

      if (!isType) {
        if (shouldThrow) __WEBPACK_IMPORTED_MODULE_1__error__["b" /* invalidInterface */].throw()
        if (warn) __WEBPACK_IMPORTED_MODULE_1__error__["b" /* invalidInterface */].warn()
      }
    }
  }

  return Interface
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_index__ = __webpack_require__(8);


const messageFactory = ({ message } = {}) => {
  const messageType = typeof message

  if (messageType === 'string') {
    message = () => message
  } else if (messageType !== 'function') {
    const returnType = typeof message()

    if (returnType !== 'string') {
      throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
    }
  } else {
    throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
  }

  return message
}

/* harmony default export */ __webpack_exports__["a"] = (({ message } = {}) => new (function () {
  this.message = messageFactory({ message })
  this.warn = (...args) => { Object(__WEBPACK_IMPORTED_MODULE_0__utils_index__["b" /* warning */])(false, this.message(...args)) }
  this.throw = (...args) => { Object(__WEBPACK_IMPORTED_MODULE_0__utils_index__["a" /* invariant */])(false, this.message(...args)) }
  return this
})());


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__warning__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__warning__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__invariant__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__invariant__["a"]; });




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);


/* harmony default export */ __webpack_exports__["a"] = ((...args) => {
  if (undefined === 'production') return

  return __WEBPACK_IMPORTED_MODULE_0_warning___default()(...args)
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (undefined !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);


/* harmony default export */ __webpack_exports__["a"] = ((...args) => {
  if (undefined === 'production') return

  return __WEBPACK_IMPORTED_MODULE_0_invariant___default()(...args)
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (undefined !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__type__["a"]; });


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(1);




const isValidType = ({ type }) => {
  const validType = __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* VALID_TYPES */].find(t => t === type)

  if (validType) {
    return validType
  }

  return false
}

const typeObject = ({ type, array = false, Interface = false } = {}) => ({
  type,
  array,
  Interface,
  [__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* IMPLEMENTS_TYPES */].TYPE]: true
})

/* harmony default export */ __webpack_exports__["a"] = ((type, shape) => {
  const validType = isValidType({ type })

  if (!validType) {
    return __WEBPACK_IMPORTED_MODULE_1__error__["d" /* invalidType */].throw({ type })
  }

  if (validType && !shape) {
    return typeObject({ type })
  }

  if (validType === 'array') {
    const shapeIsArray = Array.isArray(shape)
    const invalidArrayElement = shapeIsArray && shape.find(t => (!t[__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* IMPLEMENTS_TYPES */].TYPE] && !t[__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* IMPLEMENTS_TYPES */].INTERFACE]))

    if (!shapeIsArray || invalidArrayElement) {
      __WEBPACK_IMPORTED_MODULE_1__error__["a" /* invalidArrayElement */].throw()
    }

    return typeObject({ type, array: shape })
  }

  if (validType === 'object') {
    const isInterface = shape[__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* IMPLEMENTS_TYPES */].INTERFACE]

    if (!isInterface) {
      __WEBPACK_IMPORTED_MODULE_1__error__["c" /* invalidShape */].throw()
    }

    return typeObject({ type, shape })
  }
});


/***/ })
/******/ ]);