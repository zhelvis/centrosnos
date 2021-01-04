const express = require('express')
const app = express()

const PORT = 8081

app.use(express.static('public'))

app.get('/', (_req, res) => {
  res.sendFile('index.html')
})

const createPageRoute = (page) =>
  app.get(`/${page}`, (_req, res) => {
    res.sendFile(`public/${page}.html`, { root: __dirname })
  })

createPageRoute('policy')
createPageRoute('disclaimer')
createPageRoute('nooffer')

app.listen(PORT, () => {
  console.log(`app started at port ${PORT}`)
})
