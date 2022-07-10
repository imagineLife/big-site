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

Then, running `aws configure` requires an `AWS Access Key ID [None]`.  

- [Prepare AWS EKS For Kubernetes Deployments](#prepare-aws-eks-for-kubernetes-deployments)
  - [Create an Amazon AWS Account](#create-an-amazon-aws-account)
  - [Install the aws CLI](#install-the-aws-cli)
  - [Create an IAM User](#create-an-iam-user)
  - [Create an Amazon EKS Cluster](#create-an-amazon-eks-cluster)
    - [Create Access Keys for the New Administrator User](#create-access-keys-for-the-new-administrator-user)
    - [Create A VPC](#create-a-vpc)
    - [Create a cluster IAM role](#create-a-cluster-iam-role)
    - [Use the Console to create the cluster](#use-the-console-to-create-the-cluster)
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


## Create an Amazon EKS Cluster
Note: this is not the k8s cluster. This is different.  

### Create Access Keys for the New Administrator User
- Go to the IAM user page [here](https://console.aws.amazon.com/iam/?&state=hashArgs%23)
- go to "Users"
- Select the new Admin user
- select the "security credentials" tab
- in the "Access keys" section, click "Create access key"
- **This is super sensitive**
  - A modal appears with the 2 pieces of info which can be downloaded in acsv or copied directly. These are critical to use :) 

### Create A VPC
Well - after all that - now the first step in the [Original Doc](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html) can be followed!

```bash
aws cloudformation create-stack \
  --region us-east-2 \
  --stack-name my-eks-vpc-stack \
  --template-url https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml
```
For me, this returned a `{StackId: <long-saml-looking-string>}`

### Create a cluster IAM role
Follow the doc for this - create a json file, run a couple aws cli commands:  

The json doc, cluster-role-trust-policy.json:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
The two commands:
```bash

# create the role
aws iam create-role \
  --role-name myAmazonEKSClusterRole \
  --assume-role-policy-document file://"cluster-role-trust-policy.json"

# attach Amazon EKS managed IAM policy to the role
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy \
  --role-name myAmazonEKSClusterRole
```

### Use the Console to create the cluster
Follow the [AWS eks clusters gui directions](https://console.aws.amazon.com/eks/home#/clusters) to create the cluster:
- name it
- for the "Cluster Service Role", choose the `myAmazonEKSClusterRole`
- the next setting to edit is the id of the VPC, created in a previous step. A dropdown should show a familiar option here
- go through the next several promtpts and click `Create`
- the cluster will appear with the status `Creating`: use the in-page refresh button to check until the cluster is up && running

