import http from "k6/http"
import { check } from "k6"

export default function () {
  const requestFor = url => ({method: 'GET', url})
  const responses = http.batch([
    requestFor('http://localhost:4000/control'),
    requestFor('http://localhost:4001/high-latency'),
    requestFor('http://localhost:4002/high-cpu'),
    requestFor('http://localhost:4003/memory-leak'),
  ])
  responses.forEach(response => {
    check(response, {
      'is status 200': r => r.status === 200,
    })
    if (response.timings.duration > 1900)
      console.warn(`Very slow request: ${response.body}`)
  })
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