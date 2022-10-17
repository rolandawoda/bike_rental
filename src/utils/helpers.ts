// Makes a random string
export const makeid: (length: number) => string = (length) => {
    let result = ''
    const characters = '0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  
  // Picks keys from an object
  export const pick: (
    object: unknown,
    keys: string[]
  ) => Record<string, unknown> = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // @ts-ignore
        obj[key] = object[key]
      }
      return obj
    }, {})
  }
  
  // Validate mongoDb id
  export const isObjectId: (value: string, helpers: any) => string = (
    value,
    helpers
  ) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id')
    }
    return value
  }
  