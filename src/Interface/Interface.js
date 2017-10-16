import { IMPLEMENTS_TYPES, VALID_TYPES } from "../constants"
import * as error from "../error"

export default (Interface = {}, { error: shouldThrow = false, warn = false, trim = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = property

      if (!isType) {
        if (shouldThrow) error.invalidInterface.throw()
        if (warn) error.invalidInterface.warn()
      }
    }
  }

  return Interface
}
