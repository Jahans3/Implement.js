import { expect } from 'chai'
import ErrorFactory from '../src/errors/factory'

describe('errors', () => {
  describe('ErrorFactory', () => {
    it('should be a function', done => {
      expect(typeof ErrorFactory).to.equal('function')
      done()
    })

    it('should throw an error if it is not instantiated with a message', done => {
      const expectedError = 'Implements: ErrorFactory: message arg must be string or function that returns a string, instead got: \'undefined\''

      try {
        new ErrorFactory({})
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal(expectedError)
        done()
      }
    })
  })
})