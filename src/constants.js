export const IMPLEMENT_TYPES = {
  INTERFACE: '__IMPLEMENT_INTERFACE_OBJECT__',
  NAME: '__IMPLEMENT_INTERFACE_NAME__',
  OPTIONS: '__IMPLEMENT_INTERFACE_OPTIONS_OBJECT__',
  TYPE: '__IMPLEMENT_TYPE_OBJECT__'
}

export const VALID_TYPES = {
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
  SYMBOL: 'symbol',
  FUNC: 'function',
  BOOL: 'boolean',
  ARRAY: 'array',
  ANY: 'any'
}

export const VALID_TYPES_LIST = (types => {
  const validTypesList = []

  for (let type in types) {
    if (types.hasOwnProperty(type)) validTypesList.push(types[type])
  }

  return validTypesList
})(VALID_TYPES)
