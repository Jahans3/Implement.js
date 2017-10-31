import uuid from 'uuid/v1'
import { IMPLEMENT_TYPES } from '../constants'
import * as errors from '../errors'

export const extend = ({ Interface = {}, ExtendedInterface = {}, interfaceName }) => {
  errors.InvalidExtendedInterface.options = { error: true }

  if (!ExtendedInterface[IMPLEMENT_TYPES.INTERFACE]) {
    const errorDetails = { interfaceName }
    errors.InvalidExtendedInterface.throw(errorDetails)
  }

  const NextInterface = {
    ...ExtendedInterface,
    ...Interface
  }

  delete NextInterface[IMPLEMENT_TYPES.NAME]
  delete NextInterface[IMPLEMENT_TYPES.INTERFACE]
  delete NextInterface[IMPLEMENT_TYPES.OPTIONS]

  return NextInterface
}

export default (interfaceName = uuid()) => (
  Interface = {},
  { strict = false, error = false, warn = true, trim = false, extend: ExtendedInterface, rename = {} } = {}
) => {
  errors.EmptyInterface.options = { error: true }
  errors.InvalidInterface.options = { error: true }

  if (!Object.keys(Interface).length) {
    errors.EmptyInterface.throw()
  }

  if (ExtendedInterface) {
    Interface = extend({ Interface, ExtendedInterface, interfaceName })
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
  Interface[IMPLEMENT_TYPES.OPTIONS] = { strict, error, warn, trim, rename }
  Interface[IMPLEMENT_TYPES.NAME] = interfaceName

  return Interface
}
