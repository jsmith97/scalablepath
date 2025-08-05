---
date: '2025-08-05'
publishDate: '2025-08-05'
draft: false
title: 'From Air-Gapped to AI-Ready: The Story of PortSwigger’s Delivery Shift'
tags:
  - platform
  - strategy
  - CI/CD
  - engineering
  - delivery
---
## **A Slow System Meets a Fast World**

The software was brilliant. The research was world-class. The infrastructure and delivery model needed to catch up.

When I joined PortSwigger, engineers were working in air-gapped environments. This was designed with security in mind, though over time it had started to get in the way. Teams often had to work around the controls just to stay productive. There were brilliant minds everywhere. We were spending large amounts of engineering effort building clever but overly complex solutions to problems already solved by open source.

One of those was a self-installing Kubernetes cluster for DAST built on a complex stack of Lambda, ECS and EKS. It was an impressive solution to a difficult challenge, though it had become fragile. Hard to change, hard to reason about and difficult to evolve. Collaborator, which powers Burp Suite’s out-of-band testing, was still running on a single EC2 instance, a constraint we’d return to later.

I worked with the DAST team to simplify their Kubernetes setup using Helm and a CloudFormation-based reference architecture. That removed the tight coupling to infrastructure and made installation less complex. Most importantly, it made it evolvable.

I also worked with the Pro team to move Collaborator to ECS and rebuild it as an auto-patching, highly resilient system using ECS, CloudFormation and TeamCity for automation with CloudWatch providing observability.

These were small steps. They were not decreed from above. They emerged through collaboration with engineers solving real problems together. They pointed toward a different kind of future: distributed systems with clearer boundaries and less operational friction.

## **Cloud Collaborator: Our First Real Platform Test**

Cloud Collaborator wasn’t our first SaaS product, but it was the first time we ran one with the delivery and operational model we now expect.

Before that shift, the service was running on a single, oversized EC2 instance managed by the development team. All data was held in memory. If the server had to be rebooted, we lost any customer interactions that hadn’t yet been retrieved. Patching was manual, had to happen out of hours and there wasn’t much headroom left. We had already maxed out the instance type without going to dedicated bare metal infrastructure.

Before I arrived, the Pro team had spoken to AWS about modernising it. The recommendation was to use Lambda and DynamoDB, though that came with two major problems. First, the cost. Collaborator handles tens of thousands of requests per second. Running it on Lambda and DynamoDB would have pushed us into six-figure annual costs. Second, the technical mismatch. Collaborator relies on handling UDP traffic, which Lambda doesn’t support.

We went a different way. We moved the service to ECS Fargate backed by ElastiCache Redis. That gave us the elasticity we needed without sacrificing UDP support or blowing our hosting budget.

We also had to secure it. Collaborator receives enormous volumes of malicious traffic. We built a simple screening firewall using nftables to filter and protect the service at the edge. Commercial options were either too expensive or could not handle the throughput.

This was not just a lift and shift (or lift and shit, as a colleague once described it).

It was a deliberate, pragmatic response to the brief and the constraints. It needed to patch autonomously, handle high traffic volumes, stay up under load and provide actionable telemetry. We needed rollback, observability and testability. We could not rely on bespoke, undocumented infrastructure that only one person knew how to maintain.

The project was a success. It delivered a stable, scalable service and built confidence across engineering. Looking back, it earned me the trust and mandate to keep going.

## **From Duct Tape to Defaults**

Those early wins earned us the mandate to go further.

We hired another platform engineer and started looking at the day-to-day problems that slowed developers down.

The Nexus repository was a regular point of failure. When it went offline, builds would fail and delivery would stall. Teams worked around it, though the impact was felt across engineering.

We shifted from passive maintenance to deliberate ownership of shared developer tools. We moved Nexus and other internal developer tools into Kubernetes and away from fragile, hand-maintained installs.

Since moving critical developer tools like Nexus into Kubernetes, build failures linked to infrastructure downtime have all but disappeared. We no longer start the day wondering if the repo server is going to stay up.

This gave us a chance to standardise how they were deployed, monitored and maintained. For the first time, these critical systems had owners and observability. It marked the beginning of treating developer tooling as a product in its own right.

We also tackled a long-standing friction point for developers. Working in AWS Workspaces inside an air-gapped network was slow, constrained and expensive. We made the case to move to local development machines. It turned out to be an easy sell. A developer on an M3 MacBook Pro written off over three years was cheaper than the cost of Workspaces over the same period. And with Workspaces, we still had to issue a lower-spec MacBook Air on top. Local development was not just more cost-effective. It was faster, more flexible and easier to support. Moving out of the air-gapped environment also allowed us to start shifting developer tools to cloud services and away from self-hosted options with all the usual compromises.

We introduced GitHub Actions to give teams a way to experiment and see what a more modern, flexible pipeline could look like. This also allowed us to introduce GitHub.com as a central part of our developer tooling, moving away from self-hosted GitHub Enterprise. There was no appetite to move existing workloads away from TeamCity and GitHub Enterprise, where teams had deeply embedded workflows and believed the shift would not provide enough value for the investment required. We didn’t push. This was about learning what a better alternative might feel like, without forcing disruption.

To give our customers visibility and confidence in our supply chain, we introduced SBOMs and SLSA build provenance. We also started to bring security into the developer workflow using tools like KICS, Trivy and SemGrep.

These were not big-bang changes. They were deliberate moves to create a safer, faster and more reliable path to production.

## **Building the DAST SaaS Platform**

The DAST SaaS platform was not a greenfield project. It was an attempt to do something we had long assumed was too difficult: take our most complex, stateful, infrastructure-coupled product and make it run reliably in a shared, orchestrated environment.

The DAST app carried years of accumulated complexity. It assumed local storage. It relied on direct host access. It expected infrastructure to adapt to the application, not the other way around. It was never built with multi-tenancy or cloud-native practices in mind.

Untangling that took time. Decoupling the app from its environment took the best part of 12 months. We had to identify hidden assumptions, work through edge cases and coordinate with a team still actively building features. There was no clean rewrite. Just steady, layered separation until the app could run safely on a shared platform.

We didn’t start by rewriting it. We started by reducing the assumptions it made about its environment.

The first step was a proof of concept using PrivateBin, a small, disposable open-source app. It gave us something to automate against while the DAST team worked on removing tight coupling in their code. The goal was simple: could we create, configure and destroy environments cleanly and programmatically?

Once that worked, we built a general-purpose control plane using Crossplane. On top of it, we wrote a set of focused Kubernetes operators using the kopt framework. Each was scoped to a single task: lifecycle orchestration, system integration or customer instance management. For clarity and a bit of fun, we named them after dinosaurs. Deploydocus handled creation. Velocireaper reaped old instances. Tryerrortops surfaced errors.

We weren’t aiming for architectural purity. We were aiming for separation. The application remained complex. The platform didn’t have to be. By keeping boundaries clear and responsibilities well-defined, we gave ourselves a way to contain the mess without pretending it wasn’t there.

We made trade-offs. Some we’re still unwinding. But we got the platform into production. It worked. And it proved a broader point: even heavyweight, legacy software can run on modern infrastructure if you isolate the hard parts and stop them spreading.

That pattern became the foundation for the shared application platform used by BurpAI and others today.

It’s not perfect. But it’s real. And it’s moving in the right direction.

## **Shared Application Platform and BurpAI**

Every team had felt the friction. To deploy even a simple web service, teams had to build pipelines, secure secrets, configure VPCs, pick CIDR blocks, set up DNS, manage TLS, handle deployments and wire up observability. In many cases, they often didn’t do it at all. Almost none of those decisions moved our products forward. They were different for the sake of being different. Slow for the sake of being custom. Quite often, the barrier to entry put teams off doing it entirely.

This was why we started building the shared platform in the first place.

The shared application platform did not begin with a top-down mandate. It began with a small vision to collaborate with teams and build something genuinely useful. The first real use case was a Discord bot.

A small engineering team supporting our marketing efforts needed somewhere to host a tool that automated the administration of the public PortSwigger Discord server. They did not want to spend days picking CIDRs or wiring up IAM. We gave them a simple way to deploy a containerised service with a database, quickly and cleanly. It worked. It was fast. It showed that small apps did not need heavyweight infrastructure to ship.

That early win gave us momentum. When BurpAI came along a few weeks later, it was an easy sell. The team wanted to move fast and focus on what mattered. They were our first full adopter. We worked alongside them to shape the roadmap and improve the developer experience. It became the default choice for teams who wanted to move fast without rebuilding everything themselves.

We worked closely with teams to create consistent, repeatable infrastructure and deployment patterns that were easy to consume with sensible, override-able defaults. We optimised for rapid feedback, continuous delivery, fast deployment and observability from the start. Developers did not have to worry about encryption, IAM or setting up backing services. They choose the service they want and all configuration is injected at runtime as environment variables.

The result was the shared application platform.

It is not a black box. It is a framework. One that gives teams a clear, trusted path to production without making them think about VPCs, infrastructure security or patching workflows. We can build, run and monitor services in minutes, not months.

Today, the shared platform supports more than 40 internal and customer-facing services and has become the default choice for new deployments.

Since then, it has hosted dozens of internal apps that might once have lived on hand-managed EC2 instances like Collaborator. The team that manages our website is also migrating over.

Adoption was never mandated, but it wasn’t entirely organic either. Teams came on board because they saw the value, had a good first experience or found fewer reasons to build things themselves. Sometimes we removed friction. Sometimes we removed alternatives. Mostly, we made it the easiest way to get things done.

The biggest challenge was never technical. It was cultural. We had to show teams that continuous delivery was not just possible, it was better. Now, those who have experienced it do not want to go back.

We sometimes get asked, “Are you trying to build a Heroku?”

No. Heroku was a PaaS. We’re building something broader: a foundation that supplies both a PaaS-like experience and an internal developer platform in one coherent system. It gives teams the speed and simplicity of Heroku, but with the flexibility, transparency and control required for security-critical software.

It’s not a magic button. It’s a framework: sensible defaults, shared patterns, and composable tools that let teams move fast without giving up ownership. You don’t have to reinvent pipelines, IAM, or observability. But you can still shape your own architecture.

It’s not locked down. It’s not top-down. It’s the platform you’d build yourself if you had the time.

## **DAST, Pro and the Push to Full CI/CD**

DAST and Burp Suite Pro are our flagship products. They are complex, powerful and trusted by thousands of security professionals around the world. They were also built in a very different delivery era.

These tools were built in a time when slower, stable cadences were the norm. They have complex codebases, deep integrations and global user bases. Historically, they shipped monthly or less, and that made sense in the world we were in.

That world has changed.

AI is accelerating product development. Competitors are iterating faster. Customer expectations around feedback loops, responsiveness and fix turnaround have shifted. The gap between writing code and delivering value is now a competitive risk.

The risk is no longer moving too fast. It is falling too far behind.

We are now starting the work of bringing DAST and Pro onto our modern delivery infrastructure.

We are not rewriting them. We are beginning to rebuild the release model around them. As part of this, we are coalescing around GitHub.com and GitHub Actions as our core delivery stack. Teams working on DAST and Pro are moving away from self-hosted GitHub Enterprise and TeamCity, aligning with the rest of the organisation on a consistent, cloud-based tooling model. This is not just a tooling change. It is a shift toward shared standards, faster feedback and simpler automation.

That means shared build pipelines, continuous validation, better artefact management and improved telemetry. That telemetry is now centralised and fed into our data platform, giving teams a clearer view of how releases behave in the real world. It also means smaller, safer changes and faster recovery when things go wrong.

Even installer-based desktop software benefits from this. Today, a feature built in BurpAI can move from commit to deploy-ready in 13 minutes, but it still takes time to reach stable Pro builds. We’re working to streamline that path end-to-end, reduce delays and improve confidence at every stage. We’re also improving our ability to track and reduce Lead Time for Change.

Our goal is continuous delivery, not continuous deployment. We want every change to be safe and ready to release at any time, without forcing a release the moment a pipeline goes green. Teams still control when they release. We are following the principle outlined at [minimumcd.org](https://minimumcd.org/), where the emphasis is on confidence and readiness, not automation for its own sake.

We also know that faster delivery is not always better. Many of our enterprise customers need time to validate and test updates before rolling them out. CI/CD does not force releases. It gives us the ability to deliver when the time is right, with greater confidence that the system will behave as expected.

For a long time, delivery was something every team had to figure out for themselves. Then it became something we could centralise and optimise. Now it has become something we cannot afford to leave behind.

This is not the end of the journey. It is how we make sure we can keep moving forward.

## **Closing Reflection**

Four years ago, delivery at PortSwigger was fragmented. Teams navigated different workflows, made local optimisations and built around infrastructure that didn’t always support where we needed to go.

We set out to change that. Not through sweeping mandates, but through small, deliberate steps. We solved real problems, earned trust and started building shared foundations. Over time, those foundations became a platform. Not a black box, but a framework for moving quickly, safely and consistently.

That platform did not come from a top-down vision. It came from collaboration. Engineers, product teams and platform specialists solving day-to-day problems in a way that could scale.

Today, delivery is no longer a team-by-team problem to solve. It is a shared capability we continue to invest in.

That matters. The pace of software development is accelerating. AI is shifting what is possible. The bottleneck is no longer building features. It is how fast we can deliver them, learn from them and respond.

We are building the systems that let us keep up. Not just with code, but with the speed of change.
