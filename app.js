const express = require('express')
const app = express()
const cors = require('cors')
const queries = require('./queries')
const queries_family = require('./queries_family')
const bodyParser = require('body-parser')
const database = require('./database-connection')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')
const morgan = require('morgan')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))


app.get('/', (request, response) => {
    queries
      .list('nanny_account_info')
      .catch(next)
  })

//nanny_account_info

  app.get('/nanny_account_info', (request, response, next) => {
    queries
      .list('nanny_account_info')
      .then(nanny_account_info => {
        response.json({ nanny_account_info })
      })
      .catch(next)
  })
  
  app.get('/nanny_account_info/:id', (request, response, next) => {
    queries
      .read('nanny_account_info', request.params.id)
      .then(nanny_account_info => {
        nanny_account_info ? response.json({ nanny_account_info }) : response.sendStatus(404)
      })
      .catch(next)
  })
  
  app.post('/nanny_account_info', (request, response, next) => {
    queries
      .create('nanny_account_info', request.body)
      .then(nanny_account_info => {
        response.status(201).json({ nanny_account_info: nanny_account_info })
      })
      .catch(next)
  })
  
  app.delete('/nanny_account_info/:id', (request, response, next) => {
    queries
      .delete('nanny_account_info', request.params.id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(next)
  })
  
  app.put('/nanny_account_info/:id', (request, response, next) => {
    queries
      .update('nanny_account_info', request.params.id, request.body)
      .then(nanny_account_info => {
        response.json({ nanny_account_info: nanny_account_info[0] })
      })
      .catch(next)
  })
  
//family_account_info

app.get('/family_account_info', (request, response, next) => {
  queries_family
    .list('family_account_info')
    .then(family_account_info => {
      response.json({ family_account_info })
    })
    .catch(next)
})

app.get('/family_account_info/:id', (request, response, next) => {
  queries_family
    .read('family_account_info', request.params.id)
    .then(family_account_info => {
      family_account_info ? response.json({ family_account_info }) : response.sendStatus(404)
    })
    .catch(next)
})

app.post('/family_account_info', (request, response, next) => {
  queries_family
    .create('family_account_info', request.body)
    .then(family_account_info => {
      response.status(201).json({ family_account_info: family_account_info })
    })
    .catch(next)
})

app.delete('/family_account_info/:id', (request, response, next) => {
  queries_family
    .delete('family_account_info', request.params.id)
    .then(() => {
      response.sendStatus(204)
    })
    .catch(next)
})

app.put('/family_account_info/:id', (request, response, next) => {
  queries_family
    .update('family_account_info', request.params.id, request.body)
    .then(family_account_info => {
      response.json({ family_account_info: family_account_info[0] })
    })
    .catch(next)
})


//Nodemailer

  app.post('/api/form', (request, response, next) => {
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${request.body.user_name}</li>
                <li>Email: ${request.body.user_email}</li>
            </ul>
            <h3>Message</h3>
            <p>${request.body.user_message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ssvw2yzwjvwdryyb@ethereal.email',
                pass: 'xNHuNGjBa4k6HcB48Z'
            }
        })

        let mailOptions = {
            from: request.body.user_email,
            to: request.body.nannyData.email_address,
            replyTo: request.body.user_email,
            subject: request.body.user_subject,
            text: request.body.user_message,
            html: htmlEmail    
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return next(err)
            }
            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
            response.send(info)
        })
    })
})

// These 2 `app.use` MUST be last `.use`'s
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important (automatic) browser requests
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({error: 'Url not found', status: 404, url})
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

module.exports = app