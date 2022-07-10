---
title: Get Amazon Elastic Kubernetes Service Prepared to Deploy A Cluster
author: Jake Laursen
excerpt: Setup the AWS CLI, IAM Permissions, Create an EKS Cluster, and more
tags: learning, AWS, Kubernetes, 
parentDir: misc
slug: misc/aws-k8s-prereqs
order: 7
---

# Prepare AWS EKS For Kubernetes Deployments
This post is meant to follow [these docs](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html) directly from Amazon. These directions, unfortunately, do not cover all the pre-reqs to make it happen. Those are covered below!  

As examples of pre-reqs, the first direction in that doc is to `create your cluster`. Upon attempting to run that command in the cli, it returns  
```bash
Unable to locate credentials. You can configure credentials by running "aws configure".
```

Then, running `aws configure` requires an `AWS Access Key ID [None]`
 
## Create an Amazon AWS Account
I already had one setup :/ 

## Install the aws CLI
Based on [the docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
```bash
# pull the installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"

# install it!
sudo installer -pkg ./AWSCLIV2.pkg -target /

# check it out
which aws
# should return something like...
/usr/local/bin/aws

# check the cli tool version$$
aws --version
aws-cli/2.7.14 Python/3.9.11 Darwin/21.1.0 exe/x86_64 prompt/off
```

## Create an IAM User 
As the [Amazon docs read](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html),
`An AWS Identity and Access Management (IAM) user is an entity that you create in AWS to represent the person or application that uses it to interact with AWS.`  
[Here](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) are the directions on how to create the user. I  accidentally followed the console directions rather than the CLI directions.  

##

## Create Access ID