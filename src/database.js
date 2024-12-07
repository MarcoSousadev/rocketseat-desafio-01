import fs  from 'node:fs/promises'

const taskDatabase = new URL ('db.json', import.meta.url)

export class Database {

#database = { }

constructor() {
  fs.readFile(taskDatabase, 'utf-8').then(data =>{
    this.#database = JSON.parse(data)
  }).catch(()=>{
    this.#persist()
  })}

  #persist(){
    fs.writeFile(taskDatabase, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? [] 

    return data
  }

  insert(table) {
    if (Array.isArray(this.#database[table])){
      this.taskDatabase[table].push(data)

    }else {
      this.taskDatabase[table] = [data]
    }

    this.#persist();

    return data
  }

}
