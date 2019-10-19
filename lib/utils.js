import {getTime} from '../lib/aggregate.js'
import {read, write} from './store.js'

export async function hit(id, date, data) {
  const content = await read(id) || {}
  let obj = content
  for(let level = 0; level <= 5; level++) {
    const time = getTime(date, level)
    obj[time] = obj[time] || {}
    obj = obj[time]
  }
  Object.assign(obj, data)
  return write(id, content)
}

