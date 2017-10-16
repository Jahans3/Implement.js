import { IMPLEMENT_TYPES } from "../constants"
import * as errors from '../errors'

const implementType = (property, { type: interfaceType }, { warn = true, error = false }) => {
  const type = typeof property

  if (type !== interfaceType) {
    // { objectName, interfaceName, type, property, expectedType }
    warn && errors.InvalidTypeImplementation.warn({ type })
  }
}

const implement = Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

  const { [IMPLEMENT_TYPES.OPTIONS]: { strict = false, trim = false, warn = true, error = false } = {} } = Interface

  // iterate over object properties and see if the interface is implemented

  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      const objectProp = object[prop]
      const interfaceProp = Interface[prop]
      const interfaceType = interfaceProp && interfaceProp[IMPLEMENT_TYPES.TYPE]
      const nestedInterface = interfaceProp && interfaceProp[IMPLEMENT_TYPES.INTERFACE]

      if (!interfaceProp) {
        // if (strict && !trim) throw errors
        // else if (trim) delete prop from obj
        // check strict mode/trim: if (trim) { dont errors }
        // determine whether or not to throw errors
      }

      if (interfaceType) {
        // check type is implemented correctly
        implementType(objectProp, interfaceProp, { warn, error })
      } else if (nestedInterface) {
        // implement(inter)
      }
    }
  }
}

export default implement
