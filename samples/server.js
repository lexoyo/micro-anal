// in samples/server.js
import {aggregate} from '../lib/aggregate.js'
import {write, read} from '../lib/store.js'
import {hit} from '../lib/utils.js'

const EXAMPLE_STATES = [{name: 'first'}, {name: 'second'}, {name: 'third'}]
const EXAMPLE_ID = 'a-random-ID'

function randomHit() {
  setTimeout(() => {
    // write(EXAMPLE_ID, {
    //   state: EXAMPLE_STATES[Math.floor(Math.random() * EXAMPLE_STATES.length)],
    // }, new Date())
    // .then(record => console.log('written:', record))
    const result = hit(EXAMPLE_ID, new Date(), {
      state: [EXAMPLE_STATES[Math.floor(Math.random() * EXAMPLE_STATES.length)]],
      num: 1,
    })
    console.log('HIT', EXAMPLE_STATES, result)
    randomHit()
  }, Math.random() * 10000)
}
randomHit()

// this should be in another thread
setInterval(() => {
  read(EXAMPLE_ID)
  .then(data => {
    const aggregated = aggregate(data, new Date())
    console.log('aggregated:', JSON.stringify(aggregated))
  })
}, 100)

