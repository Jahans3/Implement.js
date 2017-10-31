import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { implementTypedArray, implementType, trimProperty, getType, filterFalseyMutable, trimArrayElement } from '../src/implement'
import { VALID_TYPES } from '../src/constants'
import implement, { Interface, type } from '../src'
import * as errors from '../src/errors'

chai.use(spies)

describe('implement', () => {
  describe('trimProperty', () => {
    it('should delete a property from an object', done => {
      const interfaceName = 'Test'
      const property = 'testprop'
      const object = { [property]: true }

      trimProperty({ object, property, interfaceName, warn: false })

      expect(object[property]).to.equal(undefined)
      done()
    })
  })

  describe('getType', () => {
    it('should return the result of a typeof check', done => {
      const string = '12345'
      const typeofString = getType(string)

      expect(typeofString).to.equal(VALID_TYPES.STRING)
      done()
    })

    it('should return \'array\' type when an array is passed', done => {
      const array = []
      const typeofArray = getType(array)

      expect(typeofArray).to.equal(VALID_TYPES.ARRAY)
      done()
    })
  })

  describe('filterFalseyMutable', () => {
    it('should mutate the given array in order to filter all falsey elements from an array', done => {
      const myArray = [1, 2, undefined, 3, 4, 5]

      filterFalseyMutable({ array: myArray })

      expect(myArray.length).to.equal(5)
      expect(myArray).to.satisfy(array => array.every((el, i) => el === i + 1))
      done()
    })
  })

  describe('trimArrayElement', () => {
    it('should delete an element from the given array at the specified index', done => {
      const spy = chai.spy.on(errors.TrimArrayElementAlert, 'warn')
      const myArray = [1, 2, 3, 4, 5]

      trimArrayElement({ array: myArray, index: 2, element: 3, property: 'myArray', interfaceName: 'Test' })

      expect(myArray.length).to.equal(4)
      expect(myArray).to.satisfy(array => array.every(el => el !== 3))
      expect(spy).to.have.been.called()
      done()
    })
  })

  describe('implementTypedArray', () => {
    it('should throw an error in strict mode with errors enabled if an no matching type is passed', done => {
      const seatsTypedArray = [type('string')]
      const seatsProperty = 'seats'
      const Car = Interface('Car')({
        [seatsProperty]: type('array', seatsTypedArray)
      }, { strict: true, error: true, warn: false })
      const MyCar = { [seatsProperty]: [4] }
      const expectedError = `Invalid array element given to property: '${seatsProperty}'.`

      try {
        implementTypedArray({ object: MyCar, Interface: Car, typedArray: seatsTypedArray, property: seatsProperty })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should throw an error in strict mode with errors enabled if an empty array is passed for an array type()', done => {
      const seatsTypedArray = [type('string')]
      const seatsProperty = 'seats'
      const Car = Interface('Car')({
        [seatsProperty]: type('array', seatsTypedArray)
      }, { strict: true, error: true, warn: false })
      const MyCar = { [seatsProperty]: [] }
      const expectedError = `Property: '${seatsProperty}' array should contain at least one element, instead empty array was found.`

      try {
        implementTypedArray({ object: MyCar, Interface: Car, typedArray: seatsTypedArray, property: seatsProperty })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should remove array elements that don\'t match the Interface() when trim is enabled', done => {
      const seatsTypedArray = [type('string')]
      const seatsProperty = 'seats'
      const interfaceName = 'Car'
      const Car = Interface(interfaceName)({
        [seatsProperty]: type('array', seatsTypedArray)
      }, { error: true, warn: false, trim: true })
      const MyCar = { [seatsProperty]: ['hello', 5] }

      implementTypedArray({ object: MyCar, Interface: Car, typedArray: seatsTypedArray, property: seatsProperty })

      expect(MyCar[seatsProperty][0]).to.equal('hello')
      expect(MyCar[seatsProperty][1]).to.equal(undefined)
      expect(MyCar[seatsProperty].length).to.equal(1)
      done()
    })
  })

  describe('implementType', () => {
    it('should trim the property if it does not match the given type and trim is true', done => {
      const seatsProperty = 'seats'
      const Car = Interface('Car')({
        [seatsProperty]: type('string')
      }, { error: false, trim: true })
      const MyCar = { [seatsProperty]: 5 }

      implementType({ object: MyCar, Interface: Car, property: seatsProperty })

      expect(MyCar.seats).to.equal(undefined)
      done()
    })

    it('should call \'InvalidTypeImplementation\' warning if it does not match the given type', done => {
      const spy = chai.spy.on(errors.InvalidTypeImplementation, 'warn')
      const seatsProperty = 'seats'
      const Car = Interface('Car')({
        [seatsProperty]: type('string')
      }, { error: false, trim: true })
      const MyCar = { [seatsProperty]: 5 }

      implementType({ object: MyCar, Interface: Car, property: seatsProperty })

      expect(spy).to.have.been.called()
      done()
    })
  })

  describe('implement', () => {
    it('should accept an Interface() and return a curried function', done => {
      const Car = Interface('Car')({ seats: type('string') })
      const implementCar = implement(Car)

      expect(typeof implementCar).to.equal('function')
      done()
    })

    it('should trim a property on the given object not present on the Interface() when trim is true', done => {
      const Car = Interface('Car')({ seats: type('string') }, { trim: true })
      const MyCar = implement(Car)({ doors: 4, seats: 'leather' })

      expect(MyCar.doors).to.equal(undefined)
      done()
    })

    it('should call \'UnexpectedPropertyFound\' if a property does not appear on the Interface() when strict is true', done => {
      const spy = chai.spy.on(errors.UnexpectedPropertyFound, 'warn')
      const Car = Interface('Car')({ seats: type('string') }, { strict: true })

      implement(Car)({ seats: 'leather', doors: 4 })
      expect(spy).to.have.been.called()
      done()
    })

    it('should return the given object unchanged even if there are properties not appearing on the given Interface()', done => {
      const Car = Interface('Car')({ seats: type('string') })
      const someCar = { doors: 4, seats: 'leather' }
      const MyCar = implement(Car)(someCar)

      expect(MyCar).to.deep.equal(someCar)
      done()
    })
  })
})
