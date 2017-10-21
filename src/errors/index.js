import ErrorFactory from "./factory"

export const TrimAlert = new ErrorFactory({
  message: ({ property, interfaceName } = {}) => (`
    Trimming property: '${property}' from Interface(): '${interfaceName}'.
  `)
})

export const UnexpectedPropertyFound = new ErrorFactory({
  message: ({ property, interfaceName } = {}) => (`
    Unexpected property: '${property}' found on Interface(): '${interfaceName}'.
  `)
})

export const InvalidArrayElement = new ErrorFactory({
  message: ({ interfaceName, property } = {}) => (`
    Failed to implement interface: '${interfaceName}'.
    Invalid array element given to property: '${property}'.
    Strict mode was enabled and element was not a valid type() or failed to implement an Interface().
  `)
})

export const InvalidTypeImplementation = new ErrorFactory({
  message: ({ interfaceName, type, property, expectedType } = {}) => (`
    Failed to implement Interface(): '${interfaceName}'.
    Invalid type: '${type}' given to property: '${property}', expected: '${expectedType}'.
  `)
})

export const InvalidInterface = new ErrorFactory({
  message: 'Invalid object given as Interface property, must be a valid type() object.'
})

export const InvalidType = new ErrorFactory({
  message: ({ type } = {}) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
})

export const InvalidShapeArray = new ErrorFactory({
  message: (`
    Shape is not an array or an invalid was element given as a shape.
    Elements must be a valid type() or Interface().
  `)
})

export const InvalidShape = new ErrorFactory({
  message: 'Invalid object given as a type shape, must be a valid Interface().'
})
