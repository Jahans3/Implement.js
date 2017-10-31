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
      const warningSpy = chai.spy.on(errors.TrimArrayElementAlert, 'warn')
      const myArray = [1, 2, 3, 4, 5]

      trimArrayElement({ array: myArray, index: 2, element: 3, property: 'myArray', interfaceName: 'Test' })

      expect(myArray.length).to.equal(4)
      expect(myArray).to.satisfy(array => array.every(el => el !== 3))
      expect(warningSpy).to.have.been.called()
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
    // ...
  })

  describe('implement', () => {
    // ...
  })
})
