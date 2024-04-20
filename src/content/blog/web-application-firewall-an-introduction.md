---
author: Andreas Schlapbach
speakers:
  - Franziska Bühler
pubDatetime: 2021-06-14T18:00:00+00:00
title: "Web Application Firewall - An Introduction"
upcoming: false
draft: false
topics:
  - Web Application Firewall
  - OWASP
  - security
  - web development
description: Fränzi Bühler gives an introduction how a Web Application Firewall helps to protect against common security flaws of web applications.
---

Of course, we are always careful to develop securely and to avoid injection or cross site scripting vulnerabilities, for example. But can we always trust the code 100%?
Not surprisingly, injection vulnerabilities are at the top of the current <a href="https://owasp.org/www-project-top-ten/">OWASP Top Ten</a>.

Or do we not even have full control over the web applications used?

This is where a Web Application Firewall (WAF) comes into play. It offers an additional layer of security in front of the application and can prevent attacks from reaching the application in the first place and causing damage.

We look at how a web application firewall works. We get to know the OWASP ModSecurity <a href="https://coreruleset.org/">Core Rule Set</a>, an open source set of rules against web application attacks.

And we look at how we integrate a WAF into a continuous integration pipeline to give the developer early feedback on the functionality of the WAF with the application.

### Speaker

<a href="https://www.linkedin.com/in/franziska-buehler-bb037a163/">Fränzi Bühler</a> (<a href="https://twitter.com/bufrasch">@bufrasch</a>) is a security enthusiast who has been committed to security for over 10 years. While working as a security architect at <a href="https://www.puzzle.ch/">Puzzle ITC</a>, she can live out her passion for both Puzzle and external customers. In her free time, she is an OWASP (Open Web Application Security Project) member and OWASP ModSecurity Core Rule Set developer, helping to make the web application world a little more secure. She also <a href="https://franbuehler.github.io">blogs</a> and speaks at conferences.
