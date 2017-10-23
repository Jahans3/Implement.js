// export { default } from './implement'
// export { default as Interface } from './Interface'
// export { default as type } from './type'
export { IMPLEMENT_TYPES, VALID_TYPES } from './constants'

import type from './type'
import Interface from './Interface'
import implement from './implement'

const Seat = Interface('Seat')({
  colour: type('string'),
  height: type('number')
}, {
  error: true,
  strict: true
})

const Car = Interface('Car')({
  colour: type('string'),
  doors: type('number'),
  Seat: type('array', [type('object', Seat), type('number')])
}, {
  error: true,
  strict: true,
  trim: true
})

const ford = {
  colour: 'blue',
  doors: 4,
  wheels: 'alloy',
  Seat: [{ colour: 'red', height: 0, t: 't' }]
}

const FordCar = implement(Car)(ford)
console.log(ford)
console.log('-----------------------')
console.log(FordCar)