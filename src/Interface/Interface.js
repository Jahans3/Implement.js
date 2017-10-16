import { IMPLEMENTS_TYPES } from "../constants"
import * as errors from "../error"

export default (Interface = {}, { error = false, warn = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = Interface[property]

      if (!isType) {
        if (error) errors.InvalidInterface.throw()
        if (warn) errors.InvalidInterface.warn()
      }
    }
  }

  return Interface
}
