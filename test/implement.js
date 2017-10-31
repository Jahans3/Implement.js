import { expect } from 'chai'
import { implementTypedArray, implementType, trimProperty, getType } from '../src/implement'
import { VALID_TYPES } from '../src/constants'
import implement, { Interface, type } from "../src";


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

  describe('implementTypedArray', () => {
    it('should throw an error in strict mode with errors enabled if an no matching type is passed', done => {
      const seatsTypedArray = [type('string')]
      const seatsProperty = 'seats'
      const Car = Interface('Car')({
        [seatsProperty]: type('array', seatsTypedArray)
      }, { strict: true, error: true, warn: false })
      const MyCar = { [seatsProperty]: [4] }

      try {
        implementTypedArray({ object: MyCar, Interface: Car, typedArray: seatsTypedArray, property: seatsProperty })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(`Invalid array element given to property: '${seatsProperty}'.`)
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

      try {
        implementTypedArray({ object: MyCar, Interface: Car, typedArray: seatsTypedArray, property: seatsProperty })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(`Property '${seatsProperty}' array should contain at least one element, instead empty array was found.`)
        done()
      }
    })
  })

  describe('implementType', () => {
    // ...
  })

  describe('implement', () => {
    // ...
  })
})
