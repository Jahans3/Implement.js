import { invariant, warning } from '../utils/index'

export default class ErrorFactory {
  constructor ({ message }) {
    this.message = message
  }

  set options ({ trim = false, error = false, warn = true, strict = false }) {
    this._options = { trim, error, warn, strict }
  }

  get message () {
    return this._message
  }

  set message (message) {
    const messageType = typeof message

    if (messageType === 'string') {
      return this._message = () => message
    } else if (messageType === 'function' && typeof message() === 'string') {
      return this._message = message
    }

    ErrorFactory._error(messageType)
  }

  static _error (type = '') {
    invariant(false, `Implements: ErrorFactory: message arg must be string or function that returns a string, instead got: ${type}`)
  }

  warn (...args) {
    warning(false, this._message(...args))
  }

  throw (...args) {
    invariant(false, this._message(...args))
  }
}
