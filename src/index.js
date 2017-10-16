export { default } from './implements'
// export { default as Interface } from './Interface'
// export { default as type } from './type'
export { IMPLEMENTS_TYPES } from './constants'

import type from './type'
import Interface from './Interface'

const Car = Interface({
  colour: type('string'),
  doors: type('number')
}, {
  error: true
})

console.log(Car)
