---
title: Build a CronJob with Given Specs
parentDir: k8s/examples
slug: k8s/examples/a-cronjob
author: Jake Laursen
excerpt: Set a backoffLimit, a number of task completions, maximum time to completion, and more
tags: ["Kubernetes", "k8s", "cronjob", "cron"]
order: 10
---

Create a CronJob:
- called `throw-dice`
- runs every 1 min
- run in `non-parallel` mode
- completes the task 1x
- uses a `backoffLimit` of `25`
- IF the task does NOT complete within 20 seconds, make sure
  - the job fails
  - the pod terminates
- uses a given pod template image (_below at `pod-template.yaml`_)
  - note - this is an img that returns a val between 1 to 6, where 6 is a "success" and all others are failures

- Build the beginning yaml:
`kubectl create cronjob throw-dice --image=kodekloud/throw-dice --schedule="*/1 * * * *" --dry-run=client -o yaml cj.yaml`
- add `spec.completions: 1`
- add `spec.backoffLimit: 25`
- add `spec.activeDeadlineSeconds: 20`