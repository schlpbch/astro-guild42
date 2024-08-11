---
author: Andreas Schlapbach
speakers:
  - David Buchmann
  - Thijs Feryn
pubDatetime: 2023-06-30T17:00:00+00:00
title: HTTP Caching & Varnish
topics:
  - web development
  - infrastructure
description: Whether with CDN, a reverse proxy or to avoid problems with browser caching, the basis for correct caching are the HTTP caching specifications.
---

Whether with CDN, a reverse proxy or to avoid problems with browser caching, the basis for correct caching are the HTTP caching specifications. In the first part of the talk, David Buchmann shows us how to properly use the caching headers to achieve the desired result.

## Caching with Varnish: from web acceleration to content delivery

When your website is under pressure due to a massive influx of traffic and a severe increase of concurrent requests, you are generally presented with two options: optimize your stack or scale your infrastructure. Luckily there’s a third option and that is using a reverse caching proxy to offload the pressure from your origin servers.

In the second part Thijs Feryn will introduce us to Varnish, a well-known and well respected HTTP cache. He will talk about common strategies to improve the performance of your website and to make it more resilient when the pressure is on. Thijs will cover Varnish’s built-in features and capabilities and he will focus heavily on Varnish’s built-in programming language called “Varnish Configuration Language” (VCL), that allows you to tailor the behavior of the cache to your exact needs.

As the domains of application of the HTTP protocol expand beyond basic websites, so do the acceleration solutions. In a globally connected world where end-user quality of experience is front end center, he will also show us how Varnish can be used to build an Edge CDN that accelerates websites, APIs and OTT video streaming platforms.

### Speakers

[David Buchmann](https://www.xing.com/profile/David_Buchmann) is a web developer at Liip AG. He is an expert in PHP and APIs.

[Thijs Feryn](https://www.linkedin.com/in/thijsferyn/) is a technical evangelist at Varnish Software, the company behind the Varnish Cache open source technology.
