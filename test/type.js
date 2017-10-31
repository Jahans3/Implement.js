import { expect } from 'chai'
import { isValidType, typeObject } from '../src/type'
import { Interface, type } from '../src'
import { IMPLEMENT_TYPES } from '../src/constants'

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
    it('should throw an \'InvalidType\' error if a valid type is not passed', done => {
      const invalidType = 'banana'
      const expectedError =  `Invalid type: '${invalidType}' passed to type().`

      try {
        type(invalidType)
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should return a type object when it has an arity of 1 and is given a valid type', done => {
      const validType = 'string'
      const typeObject = type(validType)

      expect(typeObject[IMPLEMENT_TYPES.TYPE]).to.equal(true)
      expect(typeObject.type).to.equal(validType)
      expect(typeObject.Interface).to.equal(false)
      expect(typeObject.array).to.equal(false)
      done()
    })

    it('should throw an \'InvalidShapeArray\' error when \'array\' is passed as the type but an array is not given as the shape', done => {
      const notArray = {}
      const expectedError = 'Shape is not an array or an invalid was element given as a shape.'

      try {
        type('array', notArray)
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should throw an \'InvalidShapeArray\' error when \'array\' is passed as the type but the given array does not contain a type object', done => {
      const arrayWithoutTypes = []
      const expectedError = 'Shape is not an array or an invalid was element given as a shape.'

      try {
        type('array', arrayWithoutTypes)
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.include(expectedError)
        done()
      }
    })

    it('should return a type object with an array of types when \'array\' is passed as the type and an array containing type objects is given as the shape', done => {
      const typedArray = [type('string'), type('number')]
      const typeObject = type('array', typedArray)

      expect(typeObject[IMPLEMENT_TYPES.TYPE]).to.equal(true)
      expect(typeObject.array[0]).to.deep.equal(typedArray[0])
      expect(typeObject.array[1]).to.deep.equal(typedArray[1])
      done()
    })

    it('should throw an \'InvalidShape\' error when \'object\' is passed but an Interface is not passed as the shape', done => {
      const notAnInterface = {}
      const expectedError = 'Invalid object given as a type() shape, must be a valid Interface().'

      try {
        type('object', notAnInterface)
      } catch (err) {
        expect(err instanceof Error).to.equal(true)
        expect(err.message).to.equal(expectedError)
        done()
      }
    })

    it('should return a valid type object with an associated Interface when \'object\' is passed and a valid Interface is passed as the shape', done => {
      const MyInterface = Interface('MyInterface')({
        propertyA: type('string'),
        propertyB: type('number')
      })
      const typeObject = type('object', MyInterface)

      expect(typeObject[IMPLEMENT_TYPES.TYPE]).to.equal(true)
      expect(typeObject.Interface).to.deep.equal(MyInterface)
      done()
    })
  })
})
