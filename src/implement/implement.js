import { IMPLEMENT_TYPES, IMPLEMENT_TYPES_LIST, VALID_TYPES } from '../constants'
import * as errors from '../errors'

export const renameProperty = ({ Interface, property, newName }) => {
  const propertyValue = Interface[property]

  Interface[property] = undefined
  Interface[newName] = propertyValue

  return newName
}

export const shallowMatchKeys = ({ Interface, object, warn = true, error = false } = {}) => {
  const interfaceKeys = Object.keys(Interface)
  const objectKeys = Object.keys(object)
  const propertiesNotImplemented = []

  errors.InterfaceNotImplemented.options = { warn, error }

  interfaceKeys.map(key => {
    if (!objectKeys.includes(key) && !IMPLEMENT_TYPES_LIST.includes(key)) {
      propertiesNotImplemented.push(key)
    }
  })

  if (propertiesNotImplemented.length) {
    const interfaceName = Interface[IMPLEMENT_TYPES.NAME]
    const errorDetails = { interfaceName, properties: JSON.stringify(propertiesNotImplemented) }

    errors.InterfaceNotImplemented.warn(errorDetails)
    errors.InterfaceNotImplemented.throw(errorDetails)
  }
}

export const filterFalseyMutable = ({ array = [] } = {}) => {
  array.forEach((el, i) => {
    if (!el) array.splice(i, 1)
  })
}

export const trimArrayElement = ({ array = [], index, element, property, interfaceName, warn = true } = {}) => {
  errors.TrimArrayElementAlert.options = { warn }
  errors.TrimArrayElementAlert.warn({ element, property, interfaceName })

  array[index] = undefined

  filterFalseyMutable({ array })
}

export const trimProperty = ({ object, property, interfaceName, warn = true } = {}) => {
  errors.TrimAlert.options = { warn }
  errors.TrimAlert.warn({ property, interfaceName })

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

  errors.InvalidArrayElement.options = { warn, error }
  errors.EmptyArray.options = { warn, error }

  if (strict && typedArray.length && !array.length && !anyType) {
    const errorDetails = { interfaceName, property }

    errors.EmptyArray.warn(errorDetails)
    errors.EmptyArray.throw(errorDetails)
  }

  array.map((el, i) => {
    const type = getType(el)
    const validTypes = typedArray.filter(item => item.type === type)

    if (!anyType && !validTypes.length && (trim || strict)) {
      const errorDetails = { interfaceName, property }

      !trim && errors.InvalidArrayElement.warn(errorDetails)
      !trim && errors.InvalidArrayElement.throw(errorDetails)

      if (trim) {
        trimArrayElement({ array, index: i, element: el, property, interfaceName, warn })
      }

      return
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
    })
  })
}

export const implementType = ({ object = {}, property = {}, Interface = {}, arrayType = {}, arrayValue = {} } = {}) => {
  const {
    [property]: { type: expectedType, array: typedArray } = arrayType,
    [IMPLEMENT_TYPES.NAME]: interfaceName,
    [IMPLEMENT_TYPES.OPTIONS]: { warn = true, error = false, trim = false } = {}
  } = Interface
  const { [property]: propertyValue = arrayValue } = object
  const type = getType(propertyValue)

  errors.InvalidTypeImplementation.options = { warn, error }

  if (type !== expectedType && expectedType !== VALID_TYPES.ANY) {
    const errorDetails = { property, interfaceName, type, expectedType }

    errors.InvalidTypeImplementation.warn(errorDetails)
    errors.InvalidTypeImplementation.throw(errorDetails)

    trim && trimProperty({ object, property, interfaceName, warn })
  }

  if (type === VALID_TYPES.ARRAY) {
    implementTypedArray({ object, typedArray, Interface, property })
  }
}

export default function implement (Interface) {
  return object => {
    const { [IMPLEMENT_TYPES.OPTIONS]: { error = false, warn = true, strict = false, trim = false, rename = {} } = {} } = Interface

    errors.UnexpectedPropertyFound.options = { warn, error }

    shallowMatchKeys({ object, Interface, warn, error })

    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        const { [property]: interfaceProp = {} } = Interface
        const newName = rename[property]
        const {
          array: typedArray,
          Interface: NestedInterface,
          [IMPLEMENT_TYPES.TYPE]: interfaceType,
          [IMPLEMENT_TYPES.NAME]: interfaceName
        } = interfaceProp

        if (newName) {
          property = renameProperty({ Interface, property, newName })
        }

        if (!Object.keys(interfaceProp).length) {
          if (strict && !trim) {
            const errorDetails = { interfaceName, property }

            errors.UnexpectedPropertyFound.warn(errorDetails)
            errors.UnexpectedPropertyFound.throw(errorDetails)
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
}
