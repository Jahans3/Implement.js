import { IMPLEMENTS_TYPES } from "../constants"
import * as errors from "../error"

export default (Interface = {}, { strict = false, error = false, warn = true, trim = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENTS_TYPES.TYPE]: isType = false } = Interface[property]

      if (!isType) {
        errors.InvalidInterface.throw()
      }
    }
  }

  return Interface
}
