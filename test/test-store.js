import assert from 'assert'
import {read, write, init, clear} from '../lib/store.js'

const TEST_ID = 'test id'
const TEST_DATA = {
	fake: 'key',
	foo: 'bar',
}

describe('store', function() {
	before(async function() {
		await init('test.json')
		await clear()
	})
  describe('read and write values', function() {
    it('should return null when the value is not present', async function() {
      assert.equal(await read(TEST_ID), null)
    })
    it('should store a value without error', async function() {
      await write(TEST_ID, TEST_DATA)
		})
    it('should read the stored value', async function() {
      assert.equal(await read(TEST_ID), TEST_DATA)
    })
    it('should clear the db', async function() {
      await clear()
      assert.equal(await read(TEST_ID), null)
    })
  })
})

