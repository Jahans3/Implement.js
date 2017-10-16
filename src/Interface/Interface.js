import { IMPLEMENTS_TYPES, VALID_TYPES } from "../constants"
import { invalidInterfaceError } from "../errors"

export default (Interface = {}, { error = false, warn = false, trim = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = property

      if (!isType) {
        if (error) invalidInterfaceError.throw()
        if (warn) invalidInterfaceError.warn()
      }
    }
  }

  return Interface
}
