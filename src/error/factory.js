import { invariant, warning } from '../utils/index'

const messageFactory = ({ message } = {}) => {
  const messageType = typeof message

  if (messageType === 'string') {
    message = () => message
  } else if (messageType === 'function') {
    const returnType = typeof message()

    if (returnType !== 'string') {
      throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
    }
  } else {
    throw Error(`Implements: errorFactory: message arg must be string or function that returns a string, instead got: ${messageType}`)
  }

  return message
}

export default ({ message } = {}) => new (function () {
  this.message = messageFactory({ message })
  this.warn = (...args) => { warning(false, this.message(...args)) }
  this.throw = (...args) => { invariant(false, this.message(...args)) }
  return this
})()
