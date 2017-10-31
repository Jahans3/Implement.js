import { IMPLEMENT_TYPES} from '../constants'
import * as errors from '../errors'
import { VALID_TYPES_LIST } from '../constants'

export const isValidType = ({ type }) => {
  const validType = VALID_TYPES_LIST.find(t => t === type)

  if (validType) {
    return validType
  }

  return false
}

export const typeObject = ({ type, array = false, shape: Interface = false } = {}) => ({
  type,
  array,
  Interface,
  [IMPLEMENT_TYPES.TYPE]: true
})

export default (type, shape) => {
  const validType = isValidType({ type })

  errors.InvalidType.options = { error: true }
  errors.InvalidShapeArray.options = { error: true }
  errors.InvalidShape.options = { error: true }

  if (!validType) {
    return errors.InvalidType.throw({ type })
  }

  if (validType && !shape) {
    return typeObject({ type })
  }

  if (validType === 'array') {
    const shapeIsArray = Array.isArray(shape)
    const invalidArrayElement = shape.find && !shape.find(t => t[IMPLEMENT_TYPES.TYPE])

    if (!shapeIsArray || invalidArrayElement) {
      errors.InvalidShapeArray.throw()
    }

    return typeObject({ type, array: shape })
  }

  if (validType === 'object') {
    const isInterface = shape[IMPLEMENT_TYPES.INTERFACE]

    if (!isInterface) {
      errors.InvalidShape.throw()
    }

    return typeObject({ type, shape })
  }
}
