import { IMPLEMENTS_TYPES} from "../constants"
import * as errors from "../error"
import { VALID_TYPES } from '../constants'

const isValidType = ({ type }) => {
  const validType = VALID_TYPES.find(t => t === type)

  if (validType) {
    return validType
  }

  return false
}

const typeObject = ({ type, array = false, Interface = false } = {}) => ({
  type,
  array,
  Interface,
  [IMPLEMENTS_TYPES.TYPE]: true
})

export default (type, shape) => {
  const validType = isValidType({ type })

  if (!validType) {
    return errors.InvalidType.throw({ type })
  }

  if (validType && !shape) {
    return typeObject({ type })
  }

  if (validType === 'array') {
    const shapeIsArray = Array.isArray(shape)
    const invalidArrayElement = shapeIsArray && shape.find(t => (!t[IMPLEMENTS_TYPES.TYPE] && !t[IMPLEMENTS_TYPES.INTERFACE]))

    if (!shapeIsArray || invalidArrayElement) {
      errors.InvalidArrayElement.throw()
    }

    return typeObject({ type, array: shape })
  }

  if (validType === 'object') {
    const isInterface = shape[IMPLEMENTS_TYPES.INTERFACE]

    if (!isInterface) {
      errors.InvalidShape.throw()
    }

    return typeObject({ type, shape })
  }
}
