const express = require('express');
const router = express.Router();
const queries_family = require('../db/queries_family');

router.get('/', (request, response, next) => {
    queries_family
      .list('family_account_info')
      .then(family_account_info => {
        response.json({ family_account_info })
      })
      .catch(next)
  })
  
  router.get('/:id', (request, response, next) => {
    queries_family
      .read('family_account_info', request.params.id)
      .then(family_account_info => {
        family_account_info ? response.json({ family_account_info }) : response.sendStatus(404)
      })
      .catch(next)
  })
  
  router.post('/', (request, response, next) => {
    queries_family
      .create(request.body)
      .then(family_account_info => {
        response.status(201).json({ family_account_info: family_account_info })
      })
      .catch(next)
  })
  
  router.delete('/:id', (request, response, next) => {
    queries_family
      .delete('family_account_info', request.params.id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(next)
  })
  
  router.put('/:id', (request, response, next) => {
    queries_family
      .update('family_account_info', request.params.id, request.body)
      .then(family_account_info => {
        response.json({ family_account_info: family_account_info[0] })
      })
      .catch(next)
  })

module.exports = router;