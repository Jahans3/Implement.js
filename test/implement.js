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

      trimProperty({ object, property, interfaceName })

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
    it('should throw an error in strict mode if an no matching type is passed', () => {
      const Car = Interface('Car')({
        seats: type('array',[type('string')])
      })

      try {
        implement(Car)({ seats: 4 })
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal('Invalid array element given to property: \'seats\'.')
        done()
      }
     })
    it('should throw an error in strict mode if no type is passed', () => {})
  })

  describe('implementType', () => {
    // ...
  })

  describe('implement', () => {
    // ...
  })
})
