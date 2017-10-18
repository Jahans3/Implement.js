import { IMPLEMENT_TYPES } from "../constants"
import * as errors from '../errors'

const getType = property => {
  if (Array.isArray(property)) return 'array'

  return typeof property
}

const implementTypedArray = (array, arrayTypes, ...rest) => {
  const { error, warn, strict } = rest

  array.map(el => {
    if ((!el[IMPLEMENT_TYPES.TYPE] || !el[IMPLEMENT_TYPES.INTERFACE]) && strict) {
      error && errors.InvalidArrayElement.throw()
    }
  })
}

const implementType = (
  object,
  property,
  Interface,
  { warn = true, error = false }
) => {
  const { [property]: { type: expectedType, array: arrayTypes } = {}, [IMPLEMENT_TYPES.NAME]: interfaceName } = Interface
  const type = getType(object[property])

  if (type !== expectedType && expectedType !== 'any') {
    warn && errors.InvalidTypeImplementation.warn({
      property,
      interfaceName,
      type,
      expectedType
    })
  }

  if (type === 'array') {
    implementTypedArray(object[property], arrayTypes, Interface, { error, warn })
  }
}

const implement = Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

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
        implementType(object, prop, Interface, Interface[IMPLEMENT_TYPES.OPTIONS])
      } else if (NestedInterface) {
        implement(NestedInterface)(object[prop])
      }
    }
  }

  return object
}

export default implement
