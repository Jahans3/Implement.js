import { IMPLEMENTS_TYPES } from "../constants"
import * as error from "../error"

export default (Interface = {}, { error: shouldThrow = false, warn = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = property

      if (!isType && (shouldThrow || warn)) {
        error.InvalidInterface.throw()
      }
    }
  }

  return Interface
}
