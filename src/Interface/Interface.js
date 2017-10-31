import uuid from 'uuid/v1'
import { IMPLEMENT_TYPES } from '../constants'
import * as errors from '../errors'

export const extend = ({ Interface, ExtendedInterface }) => {
  delete ExtendedInterface[IMPLEMENT_TYPES.INTERFACE]
  delete ExtendedInterface[IMPLEMENT_TYPES.OPTIONS]
  delete ExtendedInterface[IMPLEMENT_TYPES.NAME]

  return {
    ...ExtendedInterface,
    ...Interface
  }
}

export default (interfaceName = uuid()) => (
  Interface = {},
  { strict = false, error = false, warn = true, trim = false, extend: ExtendedInterface } = {}
) => {
  // Only allow type() objects as Interface() properties
  errors.InvalidInterface.options = { error: true }

  if (ExtendedInterface) {
    Interface = extend({ Interface, ExtendedInterface })
  }

  for (let property in Interface) {
    if (Interface.hasOwnProperty(property)) {
      const { [property]: { [IMPLEMENT_TYPES.TYPE]: isType = false } = {} } = Interface

      // Only allow valid type objects as Interface properties
      if (!isType) {
        errors.InvalidInterface.throw()
      }
    }
  }

  Interface[IMPLEMENT_TYPES.INTERFACE] = true
  Interface[IMPLEMENT_TYPES.OPTIONS] = { strict, error, warn, trim }
  Interface[IMPLEMENT_TYPES.NAME] = interfaceName

  return Interface
}
