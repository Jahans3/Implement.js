// export { default } from './implement'
// export { default as Interface } from './Interface'
// export { default as type } from './type'
export { IMPLEMENT_TYPES } from './constants'

import type from './type'
import Interface from './Interface'
import implement from './implement'

const Car = Interface({
  colour: type('string'),
  doors: type('number')
}, {
  error: true
})

const ford = {
  colour: 'blue',
  doors: 4,
  wheels: 'alloy'
}

const FordCar = implement(Car)(ford)

console.log(FordCar)
