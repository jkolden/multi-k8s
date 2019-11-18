## multi-k8s

This project is a multi-container docker app that can be run in a Kubernetes cluster and deployed to the cloud provider of your choice.

## Motivation

The original purpose of the project is to showcase how a node server and a React frontend can work together to consume several different Oracle Cloud ERP and HCM API's.

## Tech/framework used

This project uses a server created in Node (Express) that provides rest proxy endpoints for several Cloud API's. The cloud API's consumed are

- erpIntegrationService
- cloud analytics service
- Rest APIs for HCM Cloud
- HCM Atom Feed

The frontend is built with React and uses templates for styling provided by Creative Tim.

The node express app and the client are configured to run in their own docker container with traffic routed by ingress.

All of the yaml files required to run this project in Kubernetes can be found in the k8s folder.

## How to run this project

This assumes you have kubectl and minikube installed on your local machine.

To run this project locally, simply clone this repo to a local directory on your machine and then cd into that directory. Start the Kubernetes cluster by running the following command:

- kubectl apply k8s-local
