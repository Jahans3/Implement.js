import { IMPLEMENT_TYPES, VALID_TYPES } from "../constants"
import * as errors from '../errors'

const trimProperty = ({ object, property, interfaceName } = {}) => {
  errors.TrimAlert.warn({ property, interfaceName })

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
    const anyType = typedArray.find(item => item.type === VALID_TYPES.ANY)
    const validTypes = typedArray.filter(item => item.type === type)

    if (!anyType && !validTypes.length && strict) {
      const errorDetails = { interfaceName, property }

      warn && errors.InvalidArrayElement.warn(errorDetails)
      error && errors.InvalidArrayElement.throw(errorDetails)

      return trim ? undefined : el
    }

    // for each validTypes type object
    //    attempt to implement the element
    //    suppress all errors
    //    if errors.length === types.length
    //      throw invalid array element error

    validTypes.map(validType => {
      implementType({  })
    })

    const { Interface: TypeInterface = false } = validType

    if (TypeInterface) {
      implement(TypeInterface)(el)
    } else if (validType === VALID_TYPES.ARRAY) {
      implementTypedArray({ object: el, typedArray: validType, Interface })
    }

    return el
  })
}

const implementType = ({ object = {},  property = {},  Interface = {} } = {}) => {
  const {
    [property]: { type: expectedType, array: typedArray } = {},
    [IMPLEMENT_TYPES.NAME]: thisInterfaceName,
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, trim = false } = {}
  } = Interface
  const interfaceName = thisInterfaceName
  const type = getType(object[property])

  if (type !== expectedType && expectedType !== VALID_TYPES.ANY) {
    const errorDetails = { property,  interfaceName,  type,  expectedType }

    warn && errors.InvalidTypeImplementation.warn(errorDetails)
    error && errors.InvalidTypeImplementation.throw(errorDetails)
    trim && trimProperty({ object, property, interfaceName })
  }

  if (type === VALID_TYPES.ARRAY) {
    implementTypedArray({ object, typedArray, Interface, property })
  }
}

const implement = Interface => object => {
  if (process.env.NODE_ENV === 'production') return object

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
