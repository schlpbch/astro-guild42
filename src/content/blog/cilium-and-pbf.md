---
author: Andreas Schlapbach
speakers:
  - Daniel Borkmann
pubDatetime: 2022-01-17T17:00:00+00:00
title: "Cilium & BPF: a Fundamentally Better Dataplane"
upcoming: false
draft: false
topics:
  - linux
  - kernel
  - operating system
description: This talk provides a deep dive on why BPF is a fundamental shift compared to more traditional kernel subsystems and why it is the best tool for the job in terms of performance, scalability, and operations in the age of containerization.
---

[BPF](https://ebpf.io/what-is-ebpf#what-is-ebpf) is seeing a rapid pace of development in the Linux kernel and tremendous adoption and growth in the user space landscape. Use cases often span the networking, tracing and security space, but their boundaries are blurred and do reach beyond these subsystems.

This talk provides a deep dive on why BPF is a fundamental shift compared to more traditional kernel subsystems and why it is the best tool for the job in terms of performance, scalability, and operations in the age of containerization. We’ll also dive into a few examples of recent kernel advancements from the BPF subsystem.

### Speaker

[Daniel Borkmann](https://www.linkedin.com/in/borkmann/) co-created eBPF and is a kernel developer at [Isovalent](https://isovalent.com/) working on all things eBPF, the Linux kernel and Cilium’s networking datapath. He is a long-term Linux kernel core contributor in the eBPF and networking subsystem for over a decade, and co-maintains both eBPF and XDP.
