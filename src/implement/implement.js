import { IMPLEMENT_TYPES } from "../constants"
import * as errors from '../errors'

const implementType = (
  object,
  property,
  { [property]: { type: expectedType }, [IMPLEMENT_TYPES.NAME]: interfaceName },
  { warn = true, error = false }
) => {
  const type = typeof property

  if (type !== expectedType) {
    warn && errors.InvalidTypeImplementation.warn({
      property,
      interfaceName,
      type,
      expectedType
    })
  }
}

const implement = Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

  const { [IMPLEMENT_TYPES.OPTIONS]: { strict = false, trim = false, warn = true, error = false } = {} } = Interface

  // iterate over object properties and see if the interface is implemented

  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      const interfaceProp = Interface[prop]
      const interfaceType = interfaceProp && interfaceProp[IMPLEMENT_TYPES.TYPE]
      const NestedInterface = interfaceProp && interfaceProp[IMPLEMENT_TYPES.INTERFACE]

      if (!interfaceProp) {
        // if (strict && !trim) throw errors
        // else if (trim) delete prop from obj
        // check strict mode/trim: if (trim) { dont errors }
        // determine whether or not to throw errors
      }

      if (interfaceType) {
        // check type is implemented correctly
        implementType(object, prop, Interface, { warn, error })
      } else if (NestedInterface) {
        const nestedProperty = object[prop]
        implement(NestedInterface)(nestedProperty)
      }
    }
  }
}

export default implement
