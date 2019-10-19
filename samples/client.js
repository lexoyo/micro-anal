// in samples/cli.js
import {read} from '../lib/store.js'
const EXAMPLE_ID = 'a-random-ID'

setInterval(() => {
  read(EXAMPLE_ID, new Date())
  .then(state => console.log('State', JSON.stringify(state)))
}, 1000)

