import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const taskDatabase = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/tasks') {
    const tasks = taskDatabase.select

    return res.end(JSON.stringify(tasks))
  }
  if (method === 'POST' && url === '/tasks') {
    const { taskTitle, description, completed_at, created_at, updated_at } =
      req.body
    const tasks = {
      id: randomUUID(),
      taskTitle,
      description,
      completed_at,
      created_at,
      updated_at
    }

    taskDatabase.insert('tasks', tasks)

    return res.writeHead(201).end()
  }
  return res.end()
})

server.listen(3333)