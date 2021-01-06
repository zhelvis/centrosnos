const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const { port, mail } = require('./config')

let transporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  secure: true,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
})

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json({ extended: true }))

app.get('/', (_req, res) => {
  res.sendFile('index.html')
})

app.post('/', async (req, res) => {
  const { name, phone, message } = req.body
  if (!phone) res.status(400).end()

  try {
    await transporter.sendMail({
      from: mail.user,
      to: mail.to,
      subject: 'Заявка с сайта ЦЕНТРОСНОС',
      html: `
          <p>Имя: ${name}</p>
          <p>Телефон: ${phone}</p>
          <p>Сообщение:</p>
          <p>${message}</p>
      `,
    })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }

  res.end()
})

const createPageRoute = (page) =>
  app.get(`/${page}`, (_req, res) => {
    res.sendFile(`public/${page}.html`, { root: __dirname })
  })

createPageRoute('policy')
createPageRoute('disclaimer')
createPageRoute('nooffer')

app.listen(port, () => {
  console.log(`app started at port ${port}`)
})
