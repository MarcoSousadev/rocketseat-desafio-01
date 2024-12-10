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

  select(table) {
    const data = this.#taskDatabase[table] ?? []

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
}
