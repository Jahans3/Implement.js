import { expect } from 'chai'
import { isValidType, typeObject } from '../src/type'
import { IMPLEMENT_TYPES } from "../src/constants"

describe('type', () => {
  describe('isValidType', () => {
    it('should return the given type if it is valid', done => {
      const validType = 'string'
      const checkTypeIsValid = isValidType({ type: validType })

      expect(checkTypeIsValid).to.equal('string')

      done()
    })

    it('should return false if an invalid type is given', done => {
      const invalidType = 'banana'
      const checkTypeIsValid = isValidType({ type: invalidType })

      expect(checkTypeIsValid).to.equal(false)

      done()
    })
  })

  describe('typeObject', () => {
    it('should return an object with a unique key indicating it is a type object used by this library', done => {
      const convertToTypeObject = { type: 'number' }
      const convertedTypeObject = typeObject(convertToTypeObject)

      expect(convertedTypeObject[IMPLEMENT_TYPES.TYPE]).to.equal(true)

      done()
    })

    it('should convert the shape argument into an Internet property', done => {
      const convertToTypeObject = { type: 'object', shape: { test: true } }
      const convertedTypeObject = typeObject(convertToTypeObject)

      expect(convertedTypeObject.Interface).to.equal(convertToTypeObject.shape)

      done()
    })
  })
  describe('type', () => {
    // ...
  })
})