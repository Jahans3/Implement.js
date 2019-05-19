# Implement.js [![npm version](https://badge.fury.io/js/implement-js.svg)](https://badge.fury.io/js/implement-js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

* Create interfaces to enforce, remove, or rename properties of objects
* Use in testing to easily verify object shapes and property types
* Effortlessly and safely parse API responses by renaming or removing properties
* Errors and warnings are suppressed when `process.env.NODE_ENV === 'production'`

### Docs
* [What is Implement.js](#what-is-implementjs)
* [Setup](#setup)
* [API](#api)
    * [implements](#implements)
    * [Interface](#interface)
    * [type](#type)
    * [ES6 Modules / CommonJS](#es6-modules--commonjs)
* [Examples](#examples)
    * [Standard usage](#standard-usage)
    * [Renaming and refactoring API responses](#renaming-and-refactoring-api-responses)

## What is Implement.js?
Implement.js is a library that attempts to bring interfaces to JavaScript in the form of *runtime* type-checking.

Simply define an interface using `Interface` and call `implement` on an object to check if it implements the given interface.
```javascript
const Hello = {
    greeting: 'hello'
    wave () {}
}
const Introduction = Interface('Introduction')({
    greeting: type('string')
    handshake: type('function')
}, { error: true })

const HelloIntroduction = implement(Introduction)(Hello) // throws an error!
```

## Setup
### Install
```
yarn add implement-js
```

### Build
```
yarn build
```

## API

### Implement
Accepts an `Interface` and an object, then checks to see if the object implements the given `Interface`.
```javascript
implement(Interface)(object) -> object
```

###### Implementing classes
Since `class` is just a constructor function waiting to be called and not truly an object, we cannot check if it implements a given `Interface`. Also, due to the dynamic nature of class properties, even once instantiated we cannot reliably implement interfaces against them.

### Interface
Takes a string to be used as a name, if none is provided it generates a uuid, returns a function that accepts an object where all the keys are `type` objects, and returns an `Interface`. The `Interface` is to be used by `implement`.
```javascript
Interface([name])(object[, options]) -> Interface object
```
###### Options
```javascript
{
    // when true, errors and warnings are triggered when properties
    // other than those on the Interface are found, is suppressed if
    // trim is set to true - default: false
    strict: true,

    // remove methods that don’t match the Interface - default: false
    trim: true,

    // throws an error when Interface isn’t implemented - default: false
    error: true,

    // warns when Interface isn’t implemented - default: true
    warn: false,

    // accepts an Interface to extend, the new Interface must also
    // implement the extended Interface
    extend: Interface,

    // accepts an object where all property values are strings used to
    // rename the corresponding properties on the given object
    rename: { seats: 'chairs' }
}
```

### Type
Accepts a string matching any [JavaScript types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#Description), plus `‘array’` and `'any'`.

If `‘array’` is passed, a second argument can be passed denoting the type of the elements of the array, if none is passed then the types of the elements will not be checked. The second argument should be an array containing `type` objects.

If `‘object’` is passed, a second argument can be passed containing an `Interface` for the object, if none is passed then the properties of the object will not be checked. The second argument should be an `Interface`.
```javascript
type(string[, Array<type>|Interface]) -> Type
```

### ES6 Modules / CommonJS
```javascript
// ES6
import implement, { Interface, type } from 'implement-js'

// CommonJS modules
const implementjs = require('implement-js')
const implement = implementjs.default
const { Interface, type } = implementjs
```

## Examples

##### Standard usage
```javascript
import implement, { Interface, type } from 'implement-js'

const Passenger = Interface('Passenger')({
    name: type(‘string’),
    height: type(‘number’)
})

const ChildPassenger = Interface('ChildPassenger')({
    hasBabySeat: type(‘boolean’)
}, {
    extend: Passenger
})

const Car = Interface('Car')({
    speed: type(’number’),
    passengers: type(‘array’, [type('object', Passenger), type('object', ChildPassenger)]),
    beep: type(‘function’)
}, { error: true })

// Successful implementation
const MyCar = implement(Car)({
    speed: 0,
    passengers: [],
    beep () {}
})

// Bad implementation - does not implement the beep method
const AnotherCar = implement(Car)({
    speed: 0,
    passengers: []
})
```

##### Unit tests
```javascript
import implement from 'implement-js'
import CarService from '../services/CarService'
import { Vehicle } from '../Interfaces'

describe('CarService', () => {
    describe('getCar', () => {
        it('should implement the Vehicle Interface', done => {
            const someCar = CarService.getCar()

            // Ensure someCar implements Vehicle Interface
            implement(Vehicle)(someCar)

            done()
        })
    })
})
```

##### Renaming and refactoring API responses:
```javascript
import { store } from ‘../store’
import { fetchUsers } from ‘../services/userService’
import implement, { Interface, type } from 'implement-js'

const User = Interface('User')({
    name: type(‘string’),
    id: type(‘number’)
}, { trim: true })

const Users = Interface('Users')({
    users: type(‘array’, [type('object', User)])
}, {
    trim: true,
    rename: { API_RESPONSE_USERS_LIST: 'users' }
})

const updateUsers = () => async dispatch => {
    dispatch(fetchUsersBegin())

    try {
        const users = await fetchUsers()
        const MyUsers = implement(Users)(users)

        dispatch(updateUsersSuccess(MyUsers))
    } catch (err) {
        dispatch(updateUsersError(err))
    }
}
```

### Code Style
```
eslint-config-standard
```

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
