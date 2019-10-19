// in samples/cli.js
import {write, read} from '../lib/store.js'
import {aggregate} from '../lib/aggregate.js'
const EXAMPLE_ID = 'a-random-ID'

setInterval(() => {
  read(EXAMPLE_ID, new Date())
  .then(state => aggregate(state, new Date()))
  .then(state => console.log('State', JSON.stringify(state)))
}, 1000)

// this should be in another thread, and should be blocking if we read / aggregate / write
// setInterval(() => {
//   read(EXAMPLE_ID)
//   .then(data => {
//     if(data) {
//       const aggregated = aggregate(data, new Date())
//       write(EXAMPLE_ID, aggregated)
//       console.log('aggregated:', JSON.stringify(aggregated))
//     }
//   })
// }, 100)


