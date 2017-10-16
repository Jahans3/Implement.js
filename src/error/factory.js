import { invariant, warning } from '../utils/index'

class ErrorFactory {
  constructor({ message }) {
    this.message = message
  }

  get message () {
    return this._message
  }

  set message (message) {
    const messageType = typeof message

    if (messageType === 'string') {
      return this._message = () => message
    } else if (messageType === 'function') {
      const returnType = typeof message()

      if (returnType !== 'string') {
        throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
      }
    } else {
      throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
    }

    this._message = message
  }

  warn (...args) {
    warning(false, this.message(...args))
  }

  throw (...args) {
    invariant(false, this.message(...args))
  }
}

export default ({ message } = {}) => new ErrorFactory({ message })
