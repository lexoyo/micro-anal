
export const COUNT_KEY = 'count'

export function getTime(date, level) {
  switch(level) {
    case 0: return date.getFullYear()
    case 1: return date.getMonth() + 1
    case 2: return date.getDate()
    case 3: return date.getHours()
    case 4: return date.getMinutes()
    case 5: return date.getSeconds()
  }
  throw 'Unknown level ' + level
}

export function aggregate(obj, date) {
  return doAggregate(obj, date, 0, false, false)
}

export function doAggregate(obj, date, level, isInTheFuture) {
  //if(typeof obj !== 'object' || Array.isArray(obj)) return obj
  //console.log('> ', isInTheFuture ? 'FUTUR' : isInThePast ? 'PAST': 'PRESENT')
  return Object.keys(obj)
  .map(key => {
    const value = obj[key]
    const time = parseInt(key)
    if(time) {
      const currentTime = getTime(date, level)
      return {
        key,
        value: (!isInTheFuture && time < currentTime) ? aggregatePast(value) : doAggregate(value, date, level + 1, isInTheFuture || time > currentTime, time < currentTime),
      }
    }
    else return { key, value }
  })
  .reduce((aggr, next) => {
    aggr[next.key] = next.value
    return aggr
  }, {})
}

/**
 * aggregate all values of obj as the date is passed
 * the resulting object will have all aggregated numbers and arrays as attributes
 */
export function aggregatePast(obj) {
  return Object.keys(obj)
  .reduce((aggr, key) => {
    switch(typeof(obj[key])) {
      case 'number': 
        aggr[key] = (aggr[key] || 0) + obj[key]
        return aggr
      case 'object': 
        if(Array.isArray(obj[key])) {
          aggr[key] = aggregateArray(aggr[key], obj[key])
        } else {
          const child = aggregatePast(obj[key])
          Object.keys(child).forEach(childKey => {
            const childVal = child[childKey]
            if(Array.isArray(childVal)) {
              aggr[childKey] = aggregateArray(aggr[childKey] || [], childVal)
            }
            else if(typeof(childVal) === 'number') {
              aggr[childKey] = (aggr[childKey] || 0) + childVal
            }
          })
        }
        return aggr
    }
    throw 'Unknown element type in data object: ' + typeof(obj[key])
  }, {})
}

export function aggregateArray(aggr, obj) {
  const res = aggr || []
  obj.forEach(el => {
    const found = res.find(candidate => areTheSame(candidate, el))
    if(found) found[COUNT_KEY]++
    else res.push(Object.assign({count: 1}, el))
  })
  return res
}

export function areTheSame(obj1, obj2) {
  const clone1 = Object.assign({}, obj1)
  delete clone1[COUNT_KEY]
  const clone2 = Object.assign({}, obj2)
  delete clone2[COUNT_KEY]
  return JSON.stringify(clone1) === JSON.stringify(clone2)
}

