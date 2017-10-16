import errorFactory from "./factory"

export const invalidInterface = errorFactory({
  message: 'Invalid object given as Interface property, must be a valid type() object.'
})

export const invalidType = errorFactory({
  message: ({ type } = {}) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
})

export const invalidArrayElement = errorFactory({
  message: (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
})

export const invalidShape = errorFactory({
  message: 'Invalid object given as a type shape, must be a valid Interface().'
})
