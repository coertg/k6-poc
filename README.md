# What is this?

This is a proof of concept for building a microservice performance testbench with the following components:
 - [k6](https://k6.io/) - a performance testing tool by Grafana labs. Is used to define/run the tests and collect client-side performance metrics
 - [cAdvisor](https://github.com/google/cadvisor) - a container monitoring tool by Google. Is used to collect server-side performance metrics
 - [Prometheus](https://prometheus.io/) - stores and aggregates metrics
 - [Grafana](https://grafana.com/) - visualizes metrics
 - [Docker](https://www.docker.com/) - almost everything here is run as docker containers

The goal is to have a way of running a test workload against different implementations of the same service, and to then get a detailed comparison of different performance characteristics between the different implementations.

This is a prototype that was built within a limited time, and is far from complete. I'm making this available for others who are interested, and want to experiment themselves. If I get time, I might push improvements, but there are no guarantees.

# How to run
For the test apps to work, we just need to run `npm ci` in the `test-apps` directory.

From there, [DEMO.md](./DEMO.md) shows the different features step by step.

# Background

I worked on this at my job during a week we were given to pursue whatever technical initiatives we wanted.

I was interested in this for a few reasons:
- Understanding the performance impact a change has on a service has always been on my mind. For example: if the developers of one of our important dependencies report that their latest release contains optimisations that improved performance by 50%, how would I know the actual impact on our services? Besides that it probably helps?
- Related to previous point: if we can run performance tests as part of CICD, we could detect changes that affect performance in advance. This could help us catch performance issues before going to prod.
- We often consider new technologies for our stack, and it seems to me like there is a bit of a blind spot when it comes to measuring performance and efficiency. If technology A and technology B perform the same in terms of latency, but technology B uses 20% less CPU, this is defintely something we want to know about!
- In the land of kubernetes where pod resources can be defined very granularly, even small performance wins could lead to real money savings, so having tools to help with this could be impactful.
- This touches on a wide array of topics I've been meaning to learn more about.

This repo was originally forked from the [k6 OSS Workshop](https://github.com/grafana/k6-oss-workshop), an excellent demo/primer on k6 that is worth checking out on its own. It provided me with a working k6+prometheus+grafana setup, and actually has a more complex app against which tests are run, and a lot of great examples and explorations of what k6 offers. The main thing I'm trying to add on top is back end metrics to the test results.
