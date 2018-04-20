const express = require('express')
const cors = require('cors')
const queries = require('./db/queries')
const queries_family = require('./db/queries_family')
const bodyParser = require('body-parser')
const database = require('./database-connection')
const nodemailer = require('nodemailer')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const nannies = require('./routes/nanny_account_info')
const families = require('./routes/family_account_info')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))

app.use('/nanny_account_info', nannies)
app.use('/family_account_info', families)

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

module.exports = app;