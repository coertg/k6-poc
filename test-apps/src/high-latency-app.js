const express = require('express')
const app = express()
const port = 4000

app.get('/high-latency', (req, res) => {
  let latencyMillis = Math.round(Math.random()*2000)
  setTimeout(
    () => res.send(`[${latencyMillis}ms] Hello, this is the high latency app!`),
    latencyMillis
  )
})

app.listen(port, () =>
  console.log(`High latency app listening on port ${port}`)
)