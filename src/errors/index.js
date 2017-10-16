import ErrorFactory from "./factory"

export const InvalidTypeImplementation = new ErrorFactory({
  message: ({ objectName, interfaceName, type, property, expectedType } = {}) => (`
    Object: ${objectName} failed to implement interface: ${interfaceName}.
    Invalid type: ${type} given to ${property}, expected: ${expectedType}.
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

export const InvalidArrayElement = new ErrorFactory({
  message: (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
})

export const InvalidShape = new ErrorFactory({
  message: 'Invalid object given as a type shape, must be a valid Interface().'
})
