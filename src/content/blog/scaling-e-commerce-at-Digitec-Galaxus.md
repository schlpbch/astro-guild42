---
author: Andreas Schlapbach
speakers:
  - Andreas Caspers
  - Boško Stupar
pubDatetime: 2024-11-18T18:00:00+00:00
upcoming: true
title: "Scaling E-commerce: Architecture and Innovation at Digitec Galaxus"
topics:
  - e-commerce
  - devops
  - agile
  - architecture

description: Join us for a technical deep-dive into how Digitec/Galaxus is building its platform serving for over 4 million customers while maintaining clean, maintainable code
---

Join us for a technical deep-dive into how [Digitec](https://www.digitec.ch/en)/[Galaxus](https://www.galaxus.ch/en) is building its platform serving over 4 million customers while maintaining clean, maintainable code. This talk reveals their pragmatic approach to modern architecture, where they combine monolithic and microservices patterns to handle their scale (up to 90k daily purchases, more than 7M active products) without sacrificing development velocity.

We explore their distributed systems architecture, diving deep into the communication patterns that power their platform - from synchronous service-to-service calls to event-driven architectures. You learn how they optimize inter-service communication through various approaches, including their partial monolith hosting solution that enables efficient in-process calls where it makes sense. We cover how they manage data consistency, balance real-time requirements with async operations, and handle the trade-offs between different communication styles. The talk also showcases their practical ML implementations (from automated data cleansing to smart customer service), and how their engineering teams own their DevOps processes to push 100+ deployments daily.

Key topics include:

- Architecture deep-dive: .NET backend, React/Next.js frontend
- Communication patterns in distributed systems: sync, async, and everything in between
- Real-world challenges and solutions in service communication
- Practical ML implementations in production
- Infrastructure as code and DevOps culture in practice

For developers and architects interested in real-world architecture at scale, expect concrete examples and honest insights from their engineering trenches.

### Speakers

[Andreas Caspers](https://www.linkedin.com/in/andreascaspers/) is domain architect of the online-shop core at Galaxus/Digitec.

[Boško Stupar](https://www.linkedin.com/in/stuparbosko) is domain architect of logistics at Galaxus/Digitec.
