import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const taskDatabase = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = taskDatabase.select(
        'tasks',
        search
          ? {
              taskTitle: search,
              description: search,
              completed_at: search,
              created_at: search,
              updated_at: search
            }
          : null
      )

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { taskTitle, description, completed_at, created_at, updated_at } =
        req.body
      const tasks = {
        id: randomUUID(),
        taskTitle,
        description,
        completed_at: null,
        created_at,
        updated_at
      }

      taskDatabase.insert('tasks', tasks)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { taskTitle, description, completed_at, created_at, updated_at } =
        req.body

      taskDatabase.update('tasks', id, {
        taskTitle,
        description,
        completed_at,
        created_at,
        updated_at
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const task = taskDatabase.select('tasks', { id: parseInt(id) })[0]

      if (!task) {
        return res.status(400).json({ error: 'Task not found' })
      }

      const taskCompleted = {
        ...task,
        completed_at: task.completed_at ? null : new Date().toLocaleDateString()
      }

      taskDatabase.update('tasks/:id/complete', id, taskCompleted)

      return res.writeHead(204).end()
    }
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      taskDatabase.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]
