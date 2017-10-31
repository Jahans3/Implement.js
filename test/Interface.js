import { expect } from 'chai'
import { Interface, type } from '../src'
import { IMPLEMENT_TYPES, UUID_PATTERN } from '../src/constants'

describe('Interface', () => {
  describe('extend', () => {
    it('should throw an error if the given object is not a valid Interface()', done => {
      const interfaceName = 'Car'
      const notInterface = { hello: type('string') }
      const expectedError = `Interface(): '${interfaceName}' attempted to extended invalid Interface().`

      try {
        Interface(interfaceName)({
          seats: type('string')
        }, {
          extend: notInterface
        })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal(expectedError)
        done()
      }
    })
  })

  describe('Interface', () => {
    it('should throw an \'InvalidInterface\' error if an Interface is given a property that is not a valid type object', done => {
      const expectedError = 'Invalid object given as Interface() property, must be a valid type() object.'

      try {
        Interface('Test')({
          name: type('string'),
          count: 'number'
        })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal(expectedError)
        done()
      }
    })

    it('should use a UUID instead if no Interface name is passed', done => {
      const MyInterface = Interface()({
        count: type('number'),
        message: type('string')
      })

      expect(MyInterface[IMPLEMENT_TYPES.NAME]).to.match(UUID_PATTERN)
      done()
    })

    it('should return a valid Interface object with options, a name, and a flag', done => {
      const interfaceName = 'Test'
      const interfaceOptions = { trim: true, strict: true, error: true, warn: false }
      const MyInterface = Interface(interfaceName)({
        count: type('number'),
        message: type('string')
      }, interfaceOptions)

      expect(MyInterface[IMPLEMENT_TYPES.INTERFACE]).to.equal(true)
      expect(MyInterface[IMPLEMENT_TYPES.NAME]).to.equal(interfaceName)
      expect(MyInterface[IMPLEMENT_TYPES.OPTIONS]).to.deep.equal(interfaceOptions)
      done()
    })
  })
})
