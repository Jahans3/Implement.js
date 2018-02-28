export const IMPLEMENT_TYPES = {
  INTERFACE: '__IMPLEMENT_INTERFACE_OBJECT__',
  NAME: '__IMPLEMENT_INTERFACE_NAME__',
  OPTIONS: '__IMPLEMENT_INTERFACE_OPTIONS_OBJECT__',
  TYPE: '__IMPLEMENT_TYPE_OBJECT__'
}

export const IMPLEMENT_TYPES_LIST = (() => {
  const implementTypesList = []

  for (let type in IMPLEMENT_TYPES) {
    implementTypesList.push(IMPLEMENT_TYPES[type])
  }

  return implementTypesList
})()

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

export const VALID_TYPES_LIST = (() => {
  const validTypesList = []

  for (let type in VALID_TYPES) {
    if (VALID_TYPES.hasOwnProperty(type)) {
      validTypesList.push(VALID_TYPES[type])
    }
  }

  return validTypesList
})()

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
