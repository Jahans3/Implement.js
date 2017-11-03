import { invariant, warning } from '../utils/index'

export default class ErrorFactory {
  constructor ({ message }) {
    this.message = message
    this._shouldWarn = true
    this._shouldThrow = false
  }

  set options ({ warn, error }) {
    this._shouldWarn = warn
    this._shouldThrow = error
  }

  get shouldWarn () {
    return this._shouldWarn
  }

  get shouldThrow () {
    return this._shouldThrow
  }

  get message () {
    return this._message
  }

  set message (message) {
    const messageType = typeof message

    if (messageType === 'string') {
      this._message = () => message
    } else if (messageType === 'function' && typeof message() === 'string') {
      this._message = message
    } else {
      ErrorFactory._error(messageType)
    }
  }

  static _error (type = '') {
    invariant(false, `Implements: ErrorFactory: message arg must be string or function that returns a string, instead got: '${type}'`)
  }

  warn (...args) {
    warning(!this.shouldWarn, this.message(...args))
  }

  throw (...args) {
    invariant(!this.shouldThrow, this.message(...args))
  }
}
