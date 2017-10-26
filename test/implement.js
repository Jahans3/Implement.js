import { expect } from 'chai'
import type from '../src/type'
import Interface from '../src/Interface'
import implement, { trimProperty, getType } from '../src/implement'
import { IMPLEMENT_TYPES, VALID_TYPES } from '../src/constants'

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
    // ...
  })

  describe('implementType', () => {
    // ...
  })

  describe('implement', () => {
    // ...
  })
})
