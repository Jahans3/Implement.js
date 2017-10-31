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
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should discard the Interface()-specific properties of the ExtendedInterface', done => {
      const interfaceName = 'FastCar'
      const Car = Interface('Car')({ seats: type('number') })
      const FastCar = Interface(interfaceName)({
        speed: type('number')
      }, { extend: Car })

      expect(FastCar[IMPLEMENT_TYPES.NAME]).to.equal(interfaceName)
      done()
    })

    it('should not mutate the ExtendedInterface', done => {
      const interfaceName = 'Car'
      const interfaceOptions = { error: true, strict: true }
      const Car = Interface(interfaceName)({
        seats: type('number')
      }, interfaceOptions)

      Interface('FastCar')({
        speed: type('number')
      }, { extend: Car })

      expect(Car[IMPLEMENT_TYPES.NAME]).to.equal(interfaceName)
      expect(Car[IMPLEMENT_TYPES.OPTIONS].error).to.equal(interfaceOptions.error)
      expect(Car[IMPLEMENT_TYPES.OPTIONS].strict).to.equal(interfaceOptions.strict)
      expect(Car[IMPLEMENT_TYPES.INTERFACE]).to.equal(true)
      done()
    })

    it('should return a an object containing keys from both objects, prioritising the new Interface()', done => {
      const interfaceTypes = { seats: type('number'), wheels: type('number') }
      const extendedInterfaceTypes = { speed: type('number'), seats: type('string') }
      const Car = Interface('Car')(interfaceTypes)
      const FastCar = Interface('FastCar')(extendedInterfaceTypes, { extend: Car })

      expect(FastCar.wheels).to.equal(interfaceTypes.wheels)
      expect(FastCar.seats).to.equal(extendedInterfaceTypes.seats)
      expect(FastCar.speed).to.equal(extendedInterfaceTypes.speed)
      done()
    })
  })

  describe('Interface', () => {
    it('should throw an \'EmptyInterface\' error if an object containing no properties is given as the Interface', done => {
      const expectedError = 'Empty object given to Interface(), my be an object containing only valid type() objects'

      try {
        Interface('Car')({})
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal(expectedError)
        done()
      }
    })

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
