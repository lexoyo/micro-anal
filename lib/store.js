import FileAsync from 'lowdb/adapters/FileAsync.js'
import low from 'lowdb'

// let db
// 
// export async function init(path) {
// 	if(!!db) {
// 		throw 'DB is already initialized'
// 	}
// 	const adapter = new FileAsync(path)
// 	db = await low(adapter)
// }

const PATH = 'db-'

export async function clear(id) {
	const adapter = new FileAsync(PATH + id + '.json')
  const db = await low(adapter)
	return db.setState({}).write()
}

export async function write(id, data) {
	const adapter = new FileAsync(PATH + id + '.json')
  const db = await low(adapter)
	return db.set(id, data).write()
}

export async function read(id) {
	const adapter = new FileAsync(PATH + id + '.json')
  const db = await low(adapter)
	return db.get(id).value()
}

