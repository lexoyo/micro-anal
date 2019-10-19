// in samples/server.js
import {aggregate} from '../lib/aggregate.js'
import {hit} from '../lib/utils.js'

const EXAMPLE_STATES = [{name: 'first'}, {name: 'second'}, {name: 'third'}]
const EXAMPLE_ID = 'a-random-ID'

function randomHit() {
  setTimeout(() => {
    const data = {
      state: [EXAMPLE_STATES[Math.floor(Math.random() * EXAMPLE_STATES.length)]],
      num: 1,
    }
    console.log('Fake hit', data)
    hit(EXAMPLE_ID, new Date(), data)
    .then(result => {
      // keep hitting
      randomHit()
    })
  }, Math.random() * 10000)
}
randomHit()

