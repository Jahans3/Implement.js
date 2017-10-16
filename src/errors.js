import { invariant, warning } from './utils'

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

const errorFactory = ({ message } = {}) => new (function () {
  this.message = messageFactory({ message })
  this.warn = (...args) => { warning(false, this.message(...args)) }
  this.throw = (...args) => { invariant(false, this.message(...args)) }
  return this
})()

export const invalidInterfaceError = errorFactory({ message: 'Invalid object given as Interface property, must be a valid type() object.' })

export const invalidTypeError = errorFactory({
  message: ({ type } = {}) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
})

export const invalidArrayElementError = errorFactory({
  message: (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
})

export const invalidShapeError = errorFactory({
  message: 'Invalid object given as a type shape, must be a valid Interface().'
})
