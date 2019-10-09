import assert from 'assert'
import { aggregate, doAggregate, aggregateArray, aggregatePast, getTime, areTheSame } from '../lib/aggregate.js'

const TEST_OBJ = {
  "1999": {
    "12": {
      "31": {
        "23": {
          "58": {
            "0": {
              testNum: 1,
              testArr: [{testName: 'testName1', count: 1}],
            },
            "1": {
              testNum: 2,
              testArr: [{testName: 'testName1', count: 1}, {testName: 'testName2', count: 1}],
            },
          },
        },
      },
    },
  },
}

const TEST_AGGREGATED_MIN = {
  "1999": {
    "12": {
      "31": {
        "23": {
          "58": {
            testNum: 3,
            testArr: [{testName: 'testName1', count: 2}, {testName: 'testName2', count: 1}],
          },
        },
      },
    },
  },
}

const TEST_AGGREGATED_YEAR = {
  "1999": {
    testNum: 3,
    testArr: [{testName: 'testName1', count: 2}, {testName: 'testName2', count: 1}],
  },
}

describe('aggregate', function() {
	before(async function() {
	})
  describe('from level to time value', function() {
    const date = new Date(1999, 11, 31, 23, 59, 59)
    it('should return the year', function() {
      assert.equal(getTime(date, 0), 1999)
    })
    it('should return the month', function() {
      assert.equal(getTime(date, 1), 12)
    })
    it('should return the day', function() {
      assert.equal(getTime(date, 2), 31)
    })
    it('should return the hour', function() {
      assert.equal(getTime(date, 3), 23)
    })
    it('should return the minute', function() {
      assert.equal(getTime(date, 4), 59)
    })
    it('should return the second', function() {
      assert.equal(getTime(date, 5), 59)
    })
	})
  describe('utils functions', function() {
    it('should find same keys', function() {
      assert.equal(areTheSame({ key1: 'val1', count: 1 }, {key1: 'val1', count: 33}), true)
      assert.equal(areTheSame({ key1: 'val1', count: 1 }, {key1: 'val1'}), true)
      assert.equal(areTheSame({ key1: 'val1' }, {key1: 'val1'}), true)
      assert.equal(areTheSame({ key1: 'val1' }, {key1: 'val2'}), false)
      assert.equal(areTheSame({ key1: 'val1', key2: 'val2' }, {key1: 'val1'}), false)
      assert.equal(areTheSame({ key1: 'val1' }, {key1: 'val1', key2: 'val2'}), false)
      assert.equal(areTheSame({ key1: 'val1', key2: 'val2' }, {key1: 'val1', key2: 'val2'}), true)
    })
    it('should aggregate arrays of objects', function() {
      assert.deepEqual(aggregateArray([{key1: 'val1', count: 1}], [{key1: 'val1', count: 1}]), [{key1: 'val1', count: 2}])
      assert.deepEqual(aggregateArray([{key1: 'val1', count: 1}], [{key1: 'val2', count: 1}]), [{key1: 'val1', count: 1}, {key1: 'val2', count: 1}])
    })
	})
  describe('aggregate past values', function() {
    it('should aggregate past values', function() {
      const aggregated = aggregatePast(TEST_OBJ, new Date(1999, 11, 31, 23, 59, 59))
      assert(aggregated, 'aggregated past value is null')
      assert.equal(aggregated.testNum, 3)
      assert(aggregated.testArr)
      assert.equal(aggregated.testArr.length, 2)
      assert.equal(aggregated.testArr.find(el => el.testName === 'testName1').count, 2)
    })
	})
  describe('aggregate future values', function() {
    it('should do nothing to values as they are in the future', function() {
      const aggregated = doAggregate(TEST_OBJ, new Date(1900, 11, 31, 23, 59, 59), 0, false, false)
      assert.deepEqual(aggregated, TEST_OBJ)
    })
    it('it should aggregate everything when it is in the past', function() {
      const aggregated = doAggregate(TEST_OBJ, new Date(9999, 11, 31, 23, 59, 59), 0)
      assert.deepEqual(aggregated, TEST_AGGREGATED_YEAR)
    })
	})
  describe('aggregate values', function() {
    it('should aggregate values', function() {
      const aggregatedMin = aggregate(TEST_OBJ, new Date(1999, 11, 31, 23, 59, 59))
      assert(aggregatedMin, 'Aggregated value is null')
      assert.deepEqual(aggregatedMin, TEST_AGGREGATED_MIN, 'Aggregated value for the current min is wrong: ' + JSON.stringify(aggregatedMin))
      assert.deepEqual(aggregate(TEST_OBJ, new Date(4000, 1, 0, 0, 0, 0)), TEST_AGGREGATED_YEAR)
    })
  })
})

