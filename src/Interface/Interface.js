import { IMPLEMENT_TYPES } from "../constants"
import * as errors from "../errors"

export default (Interface = {}, { strict = false, error = false, warn = true, trim = false } = {}) => {
  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [IMPLEMENT_TYPES.TYPE]: isType = false } = Interface[property]

      if (!isType) {
        errors.InvalidInterface.throw()
      }
    }
  }

  Interface[IMPLEMENT_TYPES.OPTIONS] = { strict, error, warn, trim }

  return Interface
}
