import { invariant, warning } from './utils'

export const invalidObjectError = new (function () {
  this.message = () => 'Invalid object given as Interface property, must be a valid type() object.'
  this.warn = () => {
    warning(false, this.message())
  }
  this.throw = () => {
    invariant(false, this.message())
  }

  return this
})()

export const invalidTypeError = new (function () {
  this.message = ({ type }) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
  this.warn = ({ type }) => {
    warning(false, this.message({ type }))
  }
  this.throw = ({ type }) => {
    invariant(false, this.message({ type }))
  }

  return this
})()

export const invalidArrayElementError = new (function () {
  this.message = (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
  this.warn = () => {
    warning(false, this.message)
  }
  this.throw = () => {
    invariant(false, this.message)
  }

  return this
})()

export const invalidShapeError = new (function () {
  this.message = 'Invalid object given as a type shape, must be a valid Interface().'
  this.warn = () => {
    warning(false, this.message)
  }
  this.throw = () => {
    invariant(false, this.message)
  }

  return this
})()
