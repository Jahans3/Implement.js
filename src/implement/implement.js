import { IMPLEMENT_TYPES } from "../constants"
import * as errors from '../errors'

const implementType = (
  object,
  property,
  { [property]: { type: expectedType }, [IMPLEMENT_TYPES.NAME]: interfaceName },
  { warn = true, error = false }
) => {
  const type = typeof object[property]

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

  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      const { [prop]: interfaceProp = {} } = Interface
      const { Interface: NestedInterface, [IMPLEMENT_TYPES.TYPE]: interfaceType } = interfaceProp

      if (!interfaceProp) {
        // if (strict && !trim) throw errors
        // else if (trim) delete prop from obj
        // check strict mode/trim: if (trim) { dont errors }
        // determine whether or not to throw errors
      }

      if (interfaceType && !NestedInterface) {
        implementType(object, prop, Interface, { warn, error })
      } else if (NestedInterface) {
        implement(NestedInterface)(object[prop])
      }
    }
  }
}

export default implement
