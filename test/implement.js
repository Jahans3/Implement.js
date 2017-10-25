import { expect } from 'chai'
import type from '../src/type'
import Interface from '../src/Interface'
import implement, { trimProperty } from '../src/implement'
import { IMPLEMENT_TYPES } from '../src/constants'

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
    // ...
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
