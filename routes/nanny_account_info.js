const express = require('express');
const router = express.Router();
const queries = require('../db/queries');


router.get('/', (request, response, next) => {
    queries
      .list('nanny_account_info')
      .then(nanny_account_info => {
        response.json({ nanny_account_info })
      })
      .catch(next)
  })
  
  router.get('/:id', (request, response, next) => {
    queries
      .read('nanny_account_info', request.params.id)
      .then(nanny_account_info => {
        nanny_account_info ? response.json({ nanny_account_info }) : response.sendStatus(404)
      })
      .catch(next)
  })
  
  router.post('/', (request, response, next) => {
    queries
      .create('nanny_account_info', request.body)
      .then(nanny_account_info => {
        response.status(201).json({ nanny_account_info: nanny_account_info })
      })
      .catch(next)
  })
  
  router.delete('/:id', (request, response, next) => {
    queries
      .delete('nanny_account_info', request.params.id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(next)
  })
  
  router.put('/:id', (request, response, next) => {
    queries
      .update('nanny_account_info', request.params.id, request.body)
      .then(nanny_account_info => {
        response.json({ nanny_account_info: nanny_account_info[0] })
      })
      .catch(next)
  })

  module.exports = router;