const express = require('express')
const app = express()
const port = 4000

function stressCPU(runUntil) {
  const checkExitCondition = () => new Date().getTime() < runUntil
  while (checkExitCondition()) {
    Math.sqrt(Math.random())
  }
}

app.get('/high-cpu', (req, res) => {
  let latencyMillis = Math.round(Math.random()*2000)
  let runUntil = new Date().getTime() + latencyMillis
  setTimeout(
    () => res.send(`[${latencyMillis}ms] Hello, this is the high CPU app!`),
    latencyMillis
  )
  stressCPU(runUntil)
})

app.listen(port, () =>
  console.log(`High CPU app listening on port ${port}`)
)