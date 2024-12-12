import fs  from 'node:fs/promises'

const taskDatabase = new URL('../db.json', import.meta.url)

export class Database {
  #taskDatabase = {}

  constructor() {
    fs.readFile(taskDatabase, 'utf-8')
      .then(data => {
        this.#taskDatabase = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(taskDatabase, JSON.stringify(this.#taskDatabase))
  }

  select(table, search) {
    let data = this.#taskDatabase[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#taskDatabase[table])) {
      this.#taskDatabase[table].push(data)
    } else {
      this.#taskDatabase[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#taskDatabase[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#taskDatabase[table][rowIndex] = { id, ...data }
      this.#persist
    }
  }

  delete(table, id) {
    const rowIndex = this.#taskDatabase[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#taskDatabase[table].splice(rowIndex, 1)
      this.#persist
    }
  }
}
