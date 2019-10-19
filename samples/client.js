// in samples/cli.js
import {write, read} from '../lib/store.js'
import {aggregate} from '../lib/aggregate.js'
const EXAMPLE_ID = 'a-random-ID'

setInterval(() => {
  read(EXAMPLE_ID, new Date())
  .then(state => aggregate(state, new Date()))
  .then(aggregated => {
    const now = new Date()
    console.log('=====')
    const curDay = aggregated[now.getFullYear()][now.getMonth()+1][now.getDate()]
    const curHour = curDay[now.getHours()]
    const curMin = curHour[now.getMinutes()]
    delete curDay[now.getHours()]
    delete curHour[now.getMinutes()]
    console.log('Hits by hours of the current day', curDay)
    console.log('Hits by minutes of the current hour', curHour)
    console.log('Hits by seconds of the current minute', curMin)
  })
}, 500)

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


