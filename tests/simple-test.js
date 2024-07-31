import http from "k6/http"

const controlAppUrl = 'http://localhost:4000/control'
const highLatencyAppUrl = 'http://localhost:4001/high-latency'

export default function () {
  let res = http.get(highLatencyAppUrl)
  console.log(`${res.body}`)
}

export const options = {
  stages: [
    // ramp up from 0 to 20 VUs over the next 5 seconds
    { duration: '5s', target: 20 },
    // run 20 VUs over the next 20 seconds
    { duration: '20s', target: 20 },
    // ramp down from 20 to 0 VUs over the next 5 seconds
    { duration: '5s', target: 0 },
  ],
}