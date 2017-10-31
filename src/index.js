// export { default } from './implement'
// export { default as Interface } from './Interface'
// export { default as type } from './type'
// export { IMPLEMENT_TYPES, VALID_TYPES } from './constants'

import type from './type'
import Interface from './Interface'
import implement from './implement'
export default implement
export { type, Interface }

const Seat = Interface('Seat')({
  colour: type('string'),
  height: type('number')
}, {
  error: true,
  strict: true
})

const SeatBelt = Interface('SeatBelt')({
  beltColour: type('string'),
  beltLength: type('number')
}, {
  error: true
})

const Car = Interface('Car')({
  colour: type('string'),
  doors: type('number'),
  Seats: type('array', [type('object', Seat), type('object', SeatBelt), type('number'), type('string')])
}, {
  error: true,
  strict: true,
  trim: true
})

const ford = {
  colour: 'blue',
  doors: 4,
  wheels: 'alloy',
  Seats: [{ colour: 'red', height: 0, t: 't' }, { beltColour: 'black', beltLength: 5 }, '2', 2]
}

const FordCar = implement(Car)(ford)
