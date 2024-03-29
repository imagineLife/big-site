---
title: Get Amazon Elastic Kubernetes Service Prepared to Deploy A Cluster
author: Jake Laursen
excerpt: Setup the AWS CLI, IAM Permissions, Create an EKS Cluster, and more
tags: ["learning", "aws", "Kubernetes"]
parentDir: misc
slug: misc/aws-k8s-prereqs
order: 7
---

**NOTE**: I put this down, incomplete for now.  
Setting K8s up on Amazon, compared to setting up on [google](k8s/intro-to-k8s-in-the-cloud), is significatnly more complicated: keys, roles, permissions... maybe great details, but in execution it seems to be done significantly less transparently && the docs are not much help.  
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
    - [Create an SSH KeyPair](#create-an-ssh-keypair)
    - [Use the Console to Create A Node Group](#use-the-console-to-create-a-node-group)
  - [Some docs and References](#some-docs-and-references)
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


### Create an SSH KeyPair
This will allow ssh access to the K8s cluster. this step was only discovered in later steps where an SSH key pair will be required...
- go [here](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#KeyPairs:)
- click "create key pair"
- name it: **k8s-key-pair**
- use rsa type
- use `.pem` file format
- should trigger the creation of the key pair, represented in the "key pairs" list view
  - a fingerprint
  - and ID
  - a file will be requested to be downloaded :) 

### Use the Console to Create A Node Group
The cluster will get a node!
- in the cluster detail view (_EKS > Clusters > <your-cluster-name>_), there is a row of tabs where one says "Compute". Click that one
- In the Compute contents are a handful of parts, and the particular one of interest here is the "Node groups" section. In that section is a "Add node group" button - click that
- Assign a name, demo-node-group
- Create a new role
  - in AIM console
    - This one did not appear after creating, the NodeGroup use case
      - AWS service
      - Use-Cases: EKS - NodeGroup
      - policy name is AWSServiceRoleForAmazonEKSNodeGroup
    - Trying again, the EKS use case - no dice - already created
      - AmazonEKSServiceRolePolicy policy name
    - Trying again, the Cluster permission
      - named EKSClusterRole
  - well, after several failed attempts, clicking the info icon to reveal [a doc on how to do just this](https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html#create-worker-node-role) appeared: following this
    - use case = EC2
    - named **AmazonEKSNodeRole**
    - **this role will show up in the "Configure node group section!**
- Follow several prompts for defaults until reaching the "Node group network configuration" page
- Enable a toggle reading **"Configure SSH access to nodes"**
  - A modal appeared reading `When enabling this option, managed node groups will create a security group on your behalf with port 22 inbound access. If launching your worker in a public subnet, it’s strongly recommended to restrict the source IP address ranges.`
  - Enable ssh if you want to ssh into the nodes :) 
- Create the k8s nodes!!
  - This takes some time
  - The node group cofig might be in "Creting" state for a few minutes
  - There's a refresh button in the gui - press that to update the ui with the node group state as it develops
  - a next state will show 2 nodes in the "Nodes" tab, where each node is in a status "Not ready"
  - ...5 minutes and counting
  - ...9 minutes and counting
  - ...19 minutes and counting
  - ...27 minutes and counting



## Some docs and References
Along the way, there are a ton of other docs that could be referenced:
- Roles can have [Tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html)
- [Configure the Amazon VPC CNI plugin for K8s...](https://docs.aws.amazon.com/eks/latest/userguide/cni-iam-role.html)
- 