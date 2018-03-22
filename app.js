const express = require('express')
const app = express()
const cors = require('cors')
const queries = require('./queries')
const bodyParser = require('body-parser')
const database = require('./database-connection')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => {
    queries.list('nanny_account_info').catch(console.error)
  })
  
  app.get('/nanny_account_info', (request, response) => {
    queries
      .list('nanny_account_info')
      .then(nanny_account_info => {
        response.json({ nanny_account_info })
      })
      .catch(console.error)
  })
  
  app.get('/nanny_account_info/:id', (request, response) => {
    queries
      .read('nanny_account_info', request.params.id)
      .then(nanny_account_info => {
        nanny_account_info ? response.json({ nanny_account_info }) : response.sendStatus(404)
      })
      .catch(console.error)
  })
  
  app.post('/nanny_account_info', (request, response) => {
    queries
      .create('nanny_account_info', request.body)
      .then(nanny_account_info => {
        response.status(201).json({ nanny_account_info: nanny_account_info })
      })
      .catch(console.error)
  })
  
  app.delete('/nanny_account_info/:id', (request, response) => {
    queries
      .delete('nanny_account_info', request.params.id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(console.error)
  })
  
  app.put('/nanny_account_info/:id', (request, response) => {
    queries
      .update('nanny_account_info', request.params.id, request.body)
      .then(nanny_account_info => {
        response.json({ nanny_account_info: nanny_account_info[0] })
      })
      .catch(console.error)
  })
  
  app.use((request, response) => {
    response.sendStatus(404)
  })

module.exports = app