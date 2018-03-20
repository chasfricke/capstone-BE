const express = require('express')
const app = express()
const cors = require('cors')
const queries = require('./queries')
const bodyParser = require('body-parser')
const database = require('./database-connection')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (request, response) => {
    queries.list('nanny_acct_info').catch(console.error)
  })
  
  app.get('/nanny_acct_info', (request, response) => {
    queries
      .list('nanny_acct_info')
      .then(nanny_acct_info => {
        response.json({ nanny_acct_info })
      })
      .catch(console.error)
  })
  
  app.get('/nanny_acct_info/:id', (request, response) => {
    queries
      .read('nanny_acct_info', request.params.id)
      .then(nanny_acct_info => {
        nanny_acct_info ? response.json({ nanny_acct_info }) : response.sendStatus(404)
      })
      .catch(console.error)
  })
  
  app.post('/nanny_acct_info', (request, response) => {
    queries
      .create('nanny_acct_info', request.body)
      .then(nanny_acct_info => {
        response.status(201).json({ nanny_acct_info: nanny_acct_info })
      })
      .catch(console.error)
  })
  
  app.delete('/nanny_acct_info/:id', (request, response) => {
    queries
      .delete('nanny_acct_info', request.params.id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(console.error)
  })
  
  app.put('/nanny_acct_info/:id', (request, response) => {
    queries
      .update('nanny_acct_info', request.params.id, request.body)
      .then(nanny_acct_info => {
        response.json({ nanny_acct_info: nanny_acct_info[0] })
      })
      .catch(console.error)
  })
  
  app.use((request, response) => {
    response.send(404)
  })

module.exports = app