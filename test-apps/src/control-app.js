const express = require('express')
const app = express()
const port = 4000

app.get('/control', (req, res) => {
  res.send('Hello, this is the control app!')
})

app.listen(port, () => {
  console.log(`Control app listening on port ${port}`)
})