const express = require('express')
const app = express()
const port = 4000

let memoryArray = []

function accumulateMemory() {
  for (let i = 0; i < 1000; i++) {
    memoryArray.push(`RAM is cheap [${Math.random()}]`)
  }
}

app.get('/memory-leak', (req, res) => {
  let latencyMillis = Math.round(Math.random()*2000)
  setTimeout(
    () => res.send(`[${latencyMillis}ms, ${memoryArray.length}entries] Hello, this is the memory leak app!`),
    latencyMillis
  )
  accumulateMemory()
})

app.listen(port, () =>
  console.log(`Memory leak app listening on port ${port}`)
)