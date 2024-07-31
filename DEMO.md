## 1. Client-perspective metrics with k6

<img alt="" src="./media/stopwatch-1-racer.jpg" width="400" />

https://k6.io

k6 allows us to define and run test scenarios against our services, and provides some ways to look at the results.

We can view it as a coordinator of a racing event that provides a racetrack, times the athletes, and writes down the results.


Let's start simple:
 - a "control" athlete: [control-app.js](./test-apps/src/control-app.js)
 - an athlete we told to just walk instead of running: [high-latency-app.js](./test-apps/src/high-latency-app.js)
 - a very simple racetrack: [simple-test.js](./tests/simple-test.js)

Let's get the athletes ready to race:
```bash
docker compose up control-app high-latency-app  -d --build
```

We can check that they are ready: http://localhost:4000/control / http://localhost:4001/high-latency

Now we can have the control athlete run the race:
```bash
k6 run ./tests/simple-test.js
```

Let's update the test to run against the high-latency app: [simple-test.js](./tests/simple-test.js)

Now we can run the test, and also look at the results in a new way, [the builtin k6 dashboard](http://localhost:5665):
```bash
K6_WEB_DASHBOARD=true k6 run ./tests/simple-test.js --duration 30s
```

This even works with prometheus and grafana:

Start prometheus and grafana:
```bash
docker compose up prometheus grafana -d
```

Run the test again:
```bash
k6 run --out=experimental-prometheus-rw --tag testid=ab2 ./tests/simple-test.js
```

And let's see how this looks in grafana: http://localhost:3000/d/ccbb2351-2ae2-462f-ae0e-f2c893ad1028/k6-prometheus

## 2. But what about the backend? (cAdvisor)

<img alt="" src="./media/fitness-tracker.jpg" width="500" />

https://github.com/google/cadvisor

cAdvisor is a tool that can monitor the resource usage of running docker containers.

We can see it as putting a fitness tracker on each athlete to track things like heartbeat and respiration while they race.

We can add it to our [docker-compose file](./docker-compose.yaml).

And start it:
```bash
docker compose up cadvisor -d
```

And look at its builtin dashboard: http://localhost:8080

We can also connect it to prometheus and grafana: [prometheus.yaml](./config/prometheus.yaml)

And see the same stats on grafana: http://localhost:3000/d/ae3c41d7-cea5-4cca-a918-5708706b4d1a/cadvisor-docker-insights?orgId=1&refresh=5s&from=now-5m&to=now

## 3. Testing several services simultaneously

<img alt="" src="./media/usain.jpg" width="500" />

We can define a test that will run against several services at the same time: [ab-test.js](./tests/ab-test.js)

Here are some more apps we have defined:
 - [high-cpu-app.js](./test-apps/src/high-cpu-app.js)
 - [memory-leak-app.js](./test-apps/src/memory-leak-app.js)

Let's start them:
```bash
docker compose up high-cpu-app memory-leak-app -d --build
```

Let's run the test:
```bash
k6 run --out=experimental-prometheus-rw --tag testid=ab2 ./tests/ab-test.js
```

And let's see how this looks in grafana: http://localhost:3000/d/70dbccfa-2966-41da-ae61-91b9af87dcf3/k62b-cadvisor-prometheus?orgId=1

## And that's it!

### More things to try
 - set up a nicer grafana dashboard to make comparisons easier
 - limit resource usage per app, maybe make resources part of test definitions
 - setup SQS
 - test one of our real apps
 - use the k6 docker image instead of installing locally
 - incorporate profilers
 - we could use k8s to orchestrate this


<img alt="" src="./media/stopwatch-1-racer.jpg" width="400" />