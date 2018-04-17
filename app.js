const express = require('express')
const app = express()
const cors = require('cors')
const queries = require('./queries')
const bodyParser = require('body-parser')
const database = require('./database-connection')
const nodemailer = require('nodemailer')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


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

  //Nodemailer

  app.post('/api/form', (request, response) => {
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
            from: 'test@testaccount.com',
            to: 'ssvw2yzwjvwdryyb@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'new message',
            text: request.body.user_message,
            html: htmlEmail    
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
})



module.exports = app