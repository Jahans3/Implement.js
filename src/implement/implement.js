import { IMPLEMENT_TYPES, VALID_TYPES } from '../constants'
import * as errors from '../errors'

export const trimProperty = ({ object, property, interfaceName, warn = true } = {}) => {
  warn && errors.TrimAlert.warn({ property, interfaceName })

  delete object[property]
}

export const getType = property => {
  if (Array.isArray(property)) return VALID_TYPES.ARRAY

  return typeof property
}

export const implementTypedArray = ({ object = {}, typedArray = [], Interface, property } = {}) => {
  const {
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, strict = false, trim = false } = {},
    [IMPLEMENT_TYPES.NAME]: interfaceName
  } = Interface
  const { [property]: array = object } = object
  const anyType = typedArray.find(item => item.type === VALID_TYPES.ANY)

  if (strict && typedArray.length && !array.length && !anyType) {
    const errorDetails = { interfaceName, property }

    warn && errors.EmptyArray.warn(errorDetails)
    error && errors.EmptyArray.throw(errorDetails)
  }

  array.forEach(el => {
    const type = getType(el)
    const validTypes = typedArray.filter(item => item.type === type)

    if (!anyType && !validTypes.length && (trim || strict)) {
      const errorDetails = { interfaceName, property }

      !trim && warn && errors.InvalidArrayElement.warn(errorDetails)
      !trim && error && errors.InvalidArrayElement.throw(errorDetails)

      trim && warn && errors.TrimArrayElementAlert.warn({ property, interfaceName })

      return trim ? undefined : el
    }

    validTypes.map(validType => {
      const { Interface: TypeInterface = false } = validType

      if (TypeInterface) {
        implement(TypeInterface)(el)
      } else if (validType === VALID_TYPES.ARRAY) {
        implementTypedArray({ object: el, typedArray: validType, Interface })
      } else {
        implementType({ arrayValue: el, Interface, arrayType: validType })
      }

      return true
    })

    return el
  })

  array.filter(el => el)
}

export const implementType = ({ object = {},  property = {},  Interface = {}, arrayType = {}, arrayValue = {} } = {}) => {
  const {
    [property]: { type: expectedType, array: typedArray } = arrayType,
    [IMPLEMENT_TYPES.NAME]: interfaceName,
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, trim = false } = {}
  } = Interface
  const { [property]: propertyValue = arrayValue } = object
  const type = getType(propertyValue)

  if (type !== expectedType && expectedType !== VALID_TYPES.ANY) {
    const errorDetails = { property,  interfaceName,  type,  expectedType }

    warn && errors.InvalidTypeImplementation.warn(errorDetails)
    error && errors.InvalidTypeImplementation.throw(errorDetails)
    trim && trimProperty({ object, property, interfaceName, warn })
  }

  if (type === VALID_TYPES.ARRAY) {
    implementTypedArray({ object, typedArray, Interface, property })
  }
}

const implement = Interface => object => {
  const { [IMPLEMENT_TYPES.OPTIONS]: { error = false, warn = true, strict = false, trim = false } = {} } = Interface

  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      const { [property]: interfaceProp = {} } = Interface
      const {
        array: typedArray,
        Interface: NestedInterface,
        [IMPLEMENT_TYPES.TYPE]: interfaceType,
        [IMPLEMENT_TYPES.NAME]: interfaceName
      } = interfaceProp

      if (!interfaceProp) {
        if (strict && !trim) {
          const errorDetails = { interfaceName, property }

          warn && errors.UnexpectedPropertyFound.warn(errorDetails)
          error && errors.UnexpectedPropertyFound.throw(errorDetails)
        } else if (trim) {
          trimProperty({ object, property, interfaceName, warn })
        }
      }

      if (interfaceType && !NestedInterface) {
        implementType({ object, property, Interface, typedArray })
      } else if (NestedInterface) {
        implement(NestedInterface)(object[property])
      }
    }
  }

  return object
}

export default implement
