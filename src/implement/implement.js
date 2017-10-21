import { IMPLEMENT_TYPES, VALID_TYPES } from "../constants"
import * as errors from '../errors'

const trimProperty = ({ object, property, interfaceName } = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    errors.TrimAlert.warn({ property, interfaceName })
  }

  delete object[property]
}

const getType = property => {
  if (Array.isArray(property)) return VALID_TYPES.ARRAY

  return typeof property
}

const implementTypedArray = ({ object = {}, typedArray = [], Interface, property }) => {
  const {
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, strict = false, trim = false } = {},
    [IMPLEMENT_TYPES.NAME]: interfaceName
  } = Interface
  const { [property]: array = object } = object

  object[property] = array.map(el => {
    const type = getType(el)
    const validType = typedArray.find(item => {
      return item.type === type || item.type === VALID_TYPES.ANY || item[IMPLEMENT_TYPES.INTERFACE]
    })
    const TypeInterface = validType === VALID_TYPES.OBJECT && validType.Interface

    if (!validType && strict) {
      const errorDetails = { interfaceName, property }

      warn && errors.InvalidArrayElement.warn(errorDetails)
      error && errors.InvalidArrayElement.throw(errorDetails)
    }

    if (TypeInterface) {
      implement(TypeInterface)(el)
    } else if (validType === VALID_TYPES.ARRAY) {
      implementTypedArray({ object: el, typedArray: validType, Interface })
    }

    return trim ? undefined : el
  })
}

const implementType = ({ object = {},  property = {},  Interface = {}, parentInterfaceName = null } = {}) => {
  const {
    [property]: { type: expectedType, array: typedArray } = {},
    [IMPLEMENT_TYPES.NAME]: thisInterfaceName,
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, trim = false } = {}
  } = Interface
  const interfaceName = parentInterfaceName || thisInterfaceName
  const type = getType(object[property])

  if (type !== expectedType && expectedType !== VALID_TYPES.ANY) {
    const errorDetails = { property,  interfaceName,  type,  expectedType }

    warn && errors.InvalidTypeImplementation.warn(errorDetails)
    error && errors.InvalidTypeImplementation.throw(errorDetails)
    trim && delete object[property]
  }

  if (type === VALID_TYPES.ARRAY) {
    implementTypedArray({ object, typedArray, Interface, property })
  }
}

const implement = Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      const {
        [property]: interfaceProp = {},
        [IMPLEMENT_TYPES.OPTIONS]: { error = false, warn = true, strict = false, trim = false } = {}
      } = Interface
      const {
        array: typedArray,
        Interface: NestedInterface,
        [IMPLEMENT_TYPES.TYPE]: interfaceType,
        [IMPLEMENT_TYPES.NAME]: interfaceName
      } = interfaceProp

      if (!interfaceProp) {
        if (strict && !trim) {
          const errorDetails = { interfaceName, property }

          error && errors.UnexpectedPropertyFound.throw(errorDetails)
          warn && errors.UnexpectedPropertyFound.warn(errorDetails)
        } else if (trim) {
          trimProperty({ object, property, interfaceName })
        }
      }

      if (interfaceType && !NestedInterface && !typedArray) {
        implementType({ object, property, Interface })
      } else if (NestedInterface) {
        implement(NestedInterface)(object[property])
      } else if (typedArray) {
        implementTypedArray({ object, typedArray, Interface, property })
      }
    }
  }

  return object
}

export default implement
