import { IMPLEMENTS_TYPES, VALID_TYPES } from "../constants"
import { invalidObjectError } from "../errors"

export default (Interface = {}, { error, warn, trim } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = property

      if (!isType) {
        if (error) invalidObjectError.throw()
        if (warn) invalidObjectError.warn()
        if (trim) delete Interface[property]
      }
    }
  }

  return Interface
}
