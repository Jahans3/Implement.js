# Implement.js

WIP

* Create Java-like interfaces for classes or objects
* Use in testing to easily verify object shapes and property types
* Effortlessly and safely parse API responses
* Warnings are suppressed when process.env.NODE_ENV === 'production'

TODO

1. interface function - done
2. enum type
3. extend interfaces
4. unit tests - in progress
5. ensure original object reference is kept
6. final docs
7. reasons to use this library docs
8. alternate property names and ability to rename properties

###### What is Implement.js?
Implements is library that attempts to bring interfaces to JavaScript. Simply define an interface and call `implement` on a class or object to ensure it implements the given interface.
```
const Hello = {
    greeting: 'hello'
    wave () {}
}
const Introduction = interface({
    greeting: type('string')
    handshake: type('function')
}, { error: true })

const HelloIntroduction = implement(Introduction)(Hello) // throws an error!
```

###### Why use Implements.js?

todo

## API

### Implements
Accepts an `Interface` and a class or object, and checks to see if the object implements the given `Interface`.
```
implement(Interface)(object|class) -> object|class
```

###### A note on implementing classes
Since JavaScript classes aren't true classes and most of the properties declared within aren't defined until the class is instantiated we can only consistently check `function` properties on classes. Once [ES7 Property Initializers](https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers) land we will be able to check if static properties declared using that syntax are implemented correctly.

Alternatively, you could pass an instantiated class, which is just a function object. However this may not always work unless every property is declared and defined inside the constructor, as properties declared later on in the class lifecycle cannot reliably be accounted for.

### Interface
Accepts an object, where all the keys are `type` objects, and returns an `Interface`. The Interface is to be used by `implement`.
```
interface(object[, options]) -> Interface
```
###### Options
```
{
    // when true, errors and warnings are triggered when properties other than those on the interface are found, is suppressed if trim is set to true - default: false
    strict: true,

    // remove methods that don’t match the interface - default: false
    trim: true,

    // throws an error when interface isn’t implemented - default: false
    error: true,

    // warns when interface isn’t implemented, provides stack trace - default: true
    warn: false,

    // accepts an interface to extend, the new interface must also implement the extended interface
    // NOTE: extend functionality is not yet complete
    extend: Interface
}
```

###### A note on Interface options behaviour
A nested Interface will inherit the options of the Interface it is called on, meaning if a nested Interface has `strict: true` but the parent Interface has `strict: false` set, an error will not be thrown if the nested Interface implements a property not described on the nested Interface.

### Type
Accepts a string matching any [JavaScript types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#Description), plus `‘array’` and `'any'`.

If the string `‘array’` is passed, a second argument can be passed denoting the type of the elements of the array, if none is passed then the types of the elements will not be checked. The second argument should be an array containing `type` objects.

If the string `‘object’` is passed, a second argument can be passed denoting an interface for the object, if none is passed then the properties of the object will not be checked. The second argument should be an `Interface`. `‘object’` types match the options of the given interface.
```
type(string[, Array<type>|Interface]) -> Type
```

## Examples

##### Standard example
```
import implement, { interface, type } from ‘implement’

const Passenger = interface({
    name: type(‘string’),
    height: type(‘number’)
})

const ChildPassenger = interface({
    hasBabySeat: type(‘boolean’)
}, {
    extend: Passenger // Note: extend functionality not yet complete
})

const Car = interface({
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

##### Refactoring API response in conjunction with `redux-thunk`:
```
import { store } from ‘../store’
import { fetchUsers } from ‘../services/userService’
import implement, { interface, type } from ‘implement’

const User = interface({
    name: type(‘string’),
    id: type(‘number’)
}, { trim: true })

const Users = interface({
    users: type(‘array’, [type('object', User)])
}, { trim: true })

const ErrorRes = interface({
    message: type(‘string’),
    code: type(‘number’)
})

const updateUsers = () => async dispatch => {
    dispatch(fetchUsersBegin())

    try {
        const users = await fetchUsers()
        const MyUsers = implement(Users)(users)

        dispatch(updateUsersSuccess(MyUsers))
    } catch (err) {
        const MyErrorRes = implement(ErrorRes)(err)

        dispatch(updateUsersError(MyErrorRes))
    }
}
```