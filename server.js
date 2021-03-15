const path = require('path')
const fastify = require('fastify')()
const nodemailer = require('nodemailer')
const nunjucks = require('nunjucks')

const { port, mail } = require('./config')
const utm = require('./utm')
const data = require('./data.json')

nunjucks.configure(['./src/pages', './src/components'])

let transporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  secure: true,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
})

const getHomePageSchema = {
  querystring: {
    type: 'object',
    properties: {
      utm_content: { type: 'string', enum: Object.keys(utm) },
    },
  },
}

fastify.get('/', { schema: getHomePageSchema }, (request, reply) => {
  const utmContent = request.query.utm_content

  if (utmContent) {
    reply
      .type('text/html')
      .send(
        nunjucks.render(
          `main.html`,
          Object.assign(data, { subtitle: utm[utmContent] })
        )
      )
  } else {
    reply.sendFile(`main.html`)
  }
})

const introFeedbackSchema = {
  body: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: { type: 'string' },
    },
  },
}

fastify.post(
  '/feedback/intro',
  { schema: introFeedbackSchema },
  async (request, _reply) => {
    return await transporter.sendMail({
      from: mail.user,
      to: mail.to,
      subject: 'Заявка с сайта ЦЕНТРОСНОС',
      html: `
              <p><i>Форма: Интро<i></p>
              <p>Телефон: ${request.body.phone}</p>
          `,
    })
  }
)

const feedbackSchema = {
  body: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: { type: 'string' },
      name: { type: 'string' },
      message: { type: 'string' },
    },
  },
}

fastify.post(
  '/feedback',
  { schema: feedbackSchema },
  async (request, _reply) => {
    const { name, message, phone } = request.body

    return await transporter.sendMail({
      from: mail.user,
      to: mail.to,
      subject: 'Заявка с сайта ЦЕНТРОСНОС',
      html: `
            <p><i>Форма: Основная<i></p>
            <p>Телефон: ${phone}</p>
            ${!!name ? `<p>Имя: ${name}</p>` : ''}
            ${!!message ? `<p>Сообщение:</p><p>${message}</p>` : ''}
        `,
    })
  }
)

const createPageRoute = (page) =>
  fastify.get(`/${page}`, (_request, reply) => {
    reply.sendFile(`${page}.html`)
  })

createPageRoute('policy')
createPageRoute('disclaimer')
createPageRoute('nooffer')

fastify.listen(port, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
