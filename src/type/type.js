import { IMPLEMENT_TYPES} from "../constants"
import * as errors from "../errors"
import { VALID_TYPES } from '../constants'

const isValidType = ({ type }) => {
  const validType = VALID_TYPES.find(t => t === type)

  if (validType) {
    return validType
  }

  return false
}

const typeObject = ({ type, array = false, shape: Interface = false } = {}) => ({
  type,
  array,
  Interface,
  [IMPLEMENT_TYPES.TYPE]: true
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
    const invalidArrayElement = shape.find && shape.find(t => (!t[IMPLEMENT_TYPES.TYPE] && !t[IMPLEMENT_TYPES.INTERFACE]))

    if (!shapeIsArray || invalidArrayElement) {
      errors.InvalidShape.throw()
    }

    return typeObject({ type, array: shape })
  }

  if (validType === 'object') {
    const isInterface = shape[IMPLEMENT_TYPES.INTERFACE]

    if (!isInterface) {
      errors.InvalidShapeArray.throw()
    }

    return typeObject({ type, shape })
  }
}
