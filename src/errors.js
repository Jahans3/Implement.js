import { invariant, warning } from './utils'

const applyLogs = context => {
  if (!context.message) context.message = () => {}

  context['warn'] = (...args) => {
    warning(false, context.message(...args))
  }
  context['throw'] = (...args) => {
    invariant(false, context.message(...args))
  }
}

export const invalidObjectError = new (function () {
  this.message = () => 'Invalid object given as Interface property, must be a valid type() object.'
  return applyLogs(this)
})()

export const invalidTypeError = new (function () {
  this.message = ({ type }) => (`
    Invalid type: '${type}' passed to type().
    Must be one of 'number', 'object', 'string', 'symbol', 'function', 'boolean', or 'array'.
  `)
  return applyLogs(this)
})()

export const invalidArrayElementError = new (function () {
  this.message = () => (`
    Shape is not an array or an invalid was element given as a type shape.
    Elements must be a valid type() or Interface().
  `)
  return applyLogs(this)
})()

export const invalidShapeError = new (function () {
  this.message = 'Invalid object given as a type shape, must be a valid Interface().'
  return applyLogs(this)
})()
