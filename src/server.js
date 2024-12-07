import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { title } from 'node:process'

const tasks = []

const server = http.createServer((req, res) =>{

  const { method, url} = req

  if(method === 'GET' && url === '/tasks'){
    res.setHeader('Content-type', 'application/json').end(JSON.stringify(tasks))
  }
  if(method === 'POST' && url === '/tasks' ){
    tasks.push({
      id:randomUUID(),
      title:null,
      descriptiom: null,
      completed_at: null,
      created_at: null,
      updated_at:null,  

  })
  return res.writeHead(201).end()
}
return res.end()
  
})

server.listen(3333)