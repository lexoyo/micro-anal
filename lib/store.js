import FileAsync from 'lowdb/adapters/FileAsync.js'
import low from 'lowdb'

let db

export async function init(path) {
	if(!!db) {
		throw 'DB is already initialized'
	}
	const adapter = new FileAsync(path)
	db = await low(adapter)
}

export async function clear() {
	db.setState({}).write()
}

export async function write(id, data) {
	db.set(id, data).write()
}

export async function read(id) {
	return db.get(id).value()
}

