---
title: "Building a parking space detector with Computer Vision [Part 2]"
description: "Hosting the Machine Learning model"
date: 2024-03-10
tags: [docker, azure, flask, mlops]
icon: "🅿️"
cover: "/blog/covers/parking-detector-parte-2.jpg"
topic: practice
---

*Hosting the Machine Learning model. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/building-a-parking-space-detector-with-computer-vision-part-2-1f4bcea9bf9c).*

![Parking space detection model built in Part 1](https://miro.medium.com/v2/resize:fit:700/0*tdP3UEmxerGvnM4-.gif)
*Parking space detection model built in Part 1 | [Source](/blog/parking-detector-parte-1)*

> [Part 1](/blog/parking-detector-parte-1): Creating the Machine Learning Model.These articles are the beginning of a series featured by [The Deep Hub](https://medium.com/thedeephub) in which we will be creating end-to-end Machine Learning projects. Check it out [here](https://medium.com/thedeephub/the-deep-hub-is-creating-a-new-section-574dbf22dd5f).

### Table of Contents

1. [Cloud Service Providers](#cloud-service-providers-csps)
2. [Containers](#what-about-containers)
3. [Containerizing the model with Docker](#containerizing-the-model-with-docker)
4. [Hosting the model in Azure](#azure-integration)
5. [What´s next?](#i-containerized-and-hosted-my-model-whats-next)

T o deploy and put into production a **Machine Learning model** there are various paths we can follow.

In this article, we´ll show you how to **containerize** your program and **host it in the cloud**.

This involves selecting a suitable platform and environment where your model can **run continuously and interact with other systems or users.**

### What does hosting mean?

Hosting refers to the process of **storing and serving** applications, websites, or services on a **server or a group of servers**; This enables the hosted applications or services to be accessible **over the internet or a private network.**

To host a machine learning model there are **various options**. A very popular one is **cloud hosting** through **cloud service providers**.

Let´s take a quick look at them!

## Cloud Service Providers (CSPs)

Cloud Service Providers are companies that offer a **wide range of computing services over the Internet**, including servers, storage, databases, networking, software, analytics, and intelligence.

The most famous CSPs are:

- [*Amazon Web Services (AWS)*](https://aws.amazon.com/es/)
- [*Microsoft Azure*](https://azure.microsoft.com/es-es/)
- [*Google Cloud Platform (GCP)*](https://cloud.google.com/)
- [*IBM Cloud*](https://www.ibm.com/es-es/cloud)

> I will use Azure in this project.

### But why do I need a Cloud Service Provider?

Imagine you’ve created a useful program, like a weather forecasting tool. If **it’s stored on your computer**, it can be accessed only by you **when you’re using it.**

Your personal computer has l**imited resources** (CPU, memory, storage). If your model is complex or needs to serve **many people at once**, your computer **might not handle it well**.

In addition, **running a server 24/7 can be expensive** due to the cost of **electricity, internet, and hardware maintenance**. CSPs offer a **pay-as-you-go** model, meaning **you only pay for what you use.**

![Traditional hosting vs Cloud hosting](https://miro.medium.com/v2/resize:fit:700/0*0ylWJgPHDAJwhlPG)
***Traditional** hosting vs **Cloud** hosting | [**Source**](https://websitesetup.org/different-types-of-web-hosting/)*

### What about containers?

Containers are lightweight, executable software packages that **encapsulate everything needed to run a piece of software**, including the **code, runtime environment, system tools, libraries**, and **settings**.

By packaging the application and its dependencies together in a container, developers can ensure that **it runs seamlessly in any environment**, whether it’s on a **developer’s laptop, a test environment**, or a **production server in a cloud**.

This consistency addresses the common *“it works on my machine”* problem by **standardizing the environment** in which applications run.

![Container vs Virtual Machine](https://miro.medium.com/v2/resize:fit:700/0*arxtLUmNcpQBxjMA)
*Container vs Virtual Machine | [**Source**](https://blog.octo.com/en/i-am-a-developer-why-should-i-use-docker)*

The most renowned **containerization service providers** are:

- [*Docker*](https://www.docker.com/)
- [*Kubernetes*](https://kubernetes.io/es/)

> I will use Docker.

### But why containerize our program and not deploy it directly in Azure?

**Containerizing** a machine learning (ML) model and then **hosting it in Azure** (or any cloud platform) is a good option for several reasons:

- Consistency
- Portability
- Isolation
- Integration with CI/CD Pipelines

It´s not something strictly necessary but is definitely **a good practice** and improves the **efficiency, and reliability** of deploying models into **production**.

In addition Cloud platforms like **Azure** offer services that simplify the **management and scaling of containerized applications**.

Wrapping up the parts of the project. We will:

1. Containerize our program with Docker.
2. And then host it in Azure.

Let´s go through it!

## Key components of Docker

Docker is an **open-source platform** that simplifies the process of **developing, shipping, and running applications** using containerization technology.

Some **key components of Docker:**

**Docker Engine** — The core of Docker, a l**ightweight runtime and tooling** that manages containers, images, builds, and more.

**Docker Images** — Read-only templates used **to create containers**. Images contain the **application code, libraries, tools, dependencies,** and **other files needed to run the application**.

**Docker Containers** — Runnable **instances of Docker images**. Containers run the application in a **virtual environment** that shares the host **OS kernel** but remains **isolated** from **other containers and the host system**.

**Dockerfile** — A text document that contains **all the commands a user could call on the command line to assemble an image**. Docker builds images automatically by **reading the instructions from a Dockerfile.**

**Docker Hub** — A **cloud-based registry service** for finding and sharing container images. Users can **push their images** to Docker Hub and **pull images** from others.

![Docker main components](https://miro.medium.com/v2/resize:fit:700/0*nmRS7DbpIFPyPTv3)
*Docker main components | [**Source**](https://cto.ai/blog/docker-image-vs-container-vs-dockerfile/)*

## How Docker works

1. You start by **creating a Dockerfile which is a simple text file** that specifies **what goes into your container.**
2. Using the **Docker command-line interface (CLI)**, you run a build command to **create a Docker image** based on the **instructions in your Dockerfile**.
3. Once you have an image, **you can use Docker to run a container** based on that image. This container runs in its **isolated environment** but can **interact with other containers**.
4. If you want to **share your application**, you can **push your Docker image to Docker Hub or another Docker registry**. Others can then **pull your image and run containers** from it on their systems.

![Docker file → Docker image → Docker container](https://miro.medium.com/v2/resize:fit:700/0*hol7ca0J6YpexUTX)
*Docker file **→** Docker image **→** Docker container | [**Source**](https://cultivatehq.com/posts/docker/)*

Perfect, now that we`ve cleared the theory, let´s go through the practice.

## Containerizing the model with Docker

### 1., Docker installation

The first step is to **install Docker**, you can download it from [the official website](https://docs.docker.com/engine/install/).

*How to Install Docker on Windows | **Source***

### 2., Preparing the application

Before starting with the process you´ll have to **prepare a Python Script and a Requirements File.**

> On this occasion, I will be using [**Visual Studio Code**](https://code.visualstudio.com/) as the code editor.

To create your project place your **Dockerfile in the root** of your directory and make sure `app.py` and `requirements.txt` are also in the **project folder**.

### # app.py

The app file will be the **main program we created for the Parking Space Detector**. You´ll have to organize this file and **import the necessary libraries.**

> In case you are using **VS** you´ll have to install the **Docker extension**. Check out [here](https://code.visualstudio.com/docs/containers/overview) how is done.

### # requirements.txt

The requirements file will include all the d**ependencies** **used in the project.**

In this case: *Tensorflow*, *OpenCV*, and *Numpy*.

```python
tensorflow==2.15.0
opencv-python==4.9.0.80
numpy==1.26.4
```

> The versions have been **updated** as of the time this article was written.

### 3., Creating the Dockerfile

If you´re not familiar with Docker this process may seem a bit complex. However, the methodology is **quite straightforward.**

I found this **cheatsheet** that might be useful for visualizing the **main docker actions.**

![Docker cheatsheet](https://miro.medium.com/v2/resize:fit:700/0*oq3GWJYUzM0RbpI7.png)
*Docker cheatsheet | [**Source**](https://extremeautomation.io/cheatsheets/)*

Another good resource is this video which I highly recommend.

*Beginner tutorial to Docker | [**Source**](https://www.youtube.com/@Fireship)*

Anyway, let´s start building our program!

You´ll have to prepare a **text document** containing the following **commands:**

```text
# Start with a Python base image
FROM python:3.8-slim

# Install system dependencies required for OpenCV
RUN apt-get update && apt-get install -y libopencv-dev

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
```

This Dockerfile does the following:

- Starts from a **Python 3.8 base image**.
- Installs system packages required by **OpenCV.**
- Sets `/app` as the working directory in the **container.**
- Copies the **application code to the container.**
- Installs the **Python dependencies** listed in `requirements.txt`.
- Specifies the **port on which the application runs**.
- Specifies the command to **run the application.**

The `Dockerfile` should be saved in the **root directory** of your project. This directory should also **include your Python application** (`app.py`) and the `requirements.txt` file that we defined previously.

> The line `RUN apt-get update && apt-get install -y libopencv-dev` in your **Dockerfile** is necessary because the `opencv-python` package often relies on **underlying system libraries** to function properly.It´s not necessary to do this with **Tensorflow** and **Numpy**.

### 4., Building the Docker image

Now that we have **the complete setup**, navigate to the directory containing your **Dockerfile** and execute the following command **to build the Docker image.**

> Replace `myapp` with the name **you want to give to your Docker image.**

```text
docker build -t myapp .
```

### 5., Running the Docker container

Once the **image** is built, **run it as a container** with the following command:

```text
docker run -p 5000:5000 myapp
```

The `-p 5000:5000` option maps **port 5000 inside the container to port 5000 on your host machine**, allowing you to access the application.

With the **container running**, you should be able **to access your application** by navigating to `http://localhost:5000` in a **web browser or using a tool like Postman** to make requests to your **API**.

> You can use other ports if you wish.

> **[Port (computer networking) - Wikipedia](https://en.wikipedia.org/wiki/Port_%28computer_networking%29)**
> In computer networking, a or port number is a number assigned to uniquely identify a connection endpoint and to direct…

Awesome! Now we have **containerized our program.**

Let´s see how we can host it in **Azure**.

## Azure integration

Two **popular options** for deploying containers in Azure are [**Azure Container Instances (ACI)**](https://learn.microsoft.com/en-us/azure/container-instances/) and [**Azure Kubernetes Service (AKS)**](https://azure.microsoft.com/es-es/products/kubernetes-service/)**.**

Typically **ACI is simpler and easier to use than AKS** which is suitable for **more complex applications** and is highly **integrated with Kubernetes.**

We will use the **ACI option.**

### # Azure Container Registry (ACR)

ACR is a **managed Docker container registry service** that allows you to **store and manage container images** across all types of **Azure deployments.**

We will use ACR to **store our container images**, making them available to **pull and deploy to any Azure service,** in this case, **Azure Container Instances (ACI).**

To do this you will need to **have ready your Docker image** of the model and the **Azure Command-Line Interface (CLI)** installed.

![Typical workflow in Docker](https://miro.medium.com/v2/resize:fit:1000/0*lvIpzC9W3PuEGhiH)
*Typical workflow in Docker | [**Source**](https://arquitecturacloud.com/azure-container-registry/)*

### # Azure Command-Line Interface (CLI)

The Azure Command-Line Interface (CLI) is a powerful, **cross-platform command-line tool provided by Microsoft** that allows you to manage **Azure resources directly from the command line** or through scripts.

> Install the Azure Command-Line Interface [here](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).

*Getting started with Azure CLI | [**Source**](https://www.youtube.com/@acloudguru)*

Let´s recap the full process:

We will use **the CLI to manage Azure from the command line**. We´ll push our image `myapp`into the **Azure Container Registry (ACR)** and then **deploy** it in the **Azure Container Instance (ACI).**

![Azure CLI](https://miro.medium.com/v2/resize:fit:700/0*TQnNQ1-aiZYvvd3y)
*Azure CLI | **Source**: Azure*

These are the steps we will follow:

**# Step 1:** Once the CLI is installed, **open your terminal or command prompt** and sign in to your Azure account using the command line interface.

```text
az login
```

**# Step 2:** Create an ACR instance (replace `myregistry` with a unique name).

```text
az acr create --resource-group myResourceGroup --name myregistry --sku Basic --admin-enabled true
```

**# Step 3:** Log in to ACR.

```text
az acr login --name myregistry
```

**# Step 4:** Tag your Docker image for the **registry** (replace `myregistry` and `myapp` appropriately).

```text
docker tag myapp:latest myregistry.azurecr.io/yourappname:latest
```

**# Step 5:** Push the image to ACR.

```text
docker push myregistry.azurecr.io/yourappname:latest
```

**# Step 6:** Deploy the image to **Azure Container Instances (ACI)** by creating a container instance.

```text
az container create \
    --resource-group myResourceGroup \
    --name mycontainerinstance \
    --image myregistry.azurecr.io/yourappname:latest \
    --cpu 1 --memory 1 \
    --registry-login-server myregistry.azurecr.io \
    --registry-username <acr-username> \
    --registry-password <acr-password> \
    --dns-name-label myappname-dns \
    --ports 5000
```

Replace `<acr-username>` and `<acr-password>` with your ACR credentials, which you can retrieve using the Azure CLI or Azure portal. Adjust `--cpu`, `--memory`, and `--ports` as needed for your application.

## I containerized and hosted my model. What´s next?

If you have followed all the steps in this tutorial you should have **your ML program containerized and hosted** **in the cloud** correctly.

Now that you´ve seen the whole process of **building a parking space detector**, there are several key activities you can engage in **to maximize its value:**

- Create a **user-friendly application** that can show **real-time parking lot occupancy to drivers**.
- Offer services to parking lots **for security surveillance** by detecting **unusual activities** or **unauthorized parking.**
- Partner with **GPS** and **navigation service providers** to offer **in-app real-time parking data.**
- Use the data gathered from your model **to perform analytics on parking lot usage**, **peak times**, and **user behavior.**

*(If you have any other idea you can leave it in the comments!).*

## Bibliography

- [*https://www.freecodecamp.org/news/a-practical-guide-to-containers-dfa66d37ac30/*](https://www.freecodecamp.org/news/a-practical-guide-to-containers-dfa66d37ac30/)
- [*https://towardsdatascience.com/docker-for-absolute-beginners-what-is-docker-and-how-to-use-it-examples-3d3b11efd830*](https://towardsdatascience.com/docker-for-absolute-beginners-what-is-docker-and-how-to-use-it-examples-3d3b11efd830)
- [*https://medium.com/illumination/devops-zero-to-hero-3-everything-you-need-to-know-about-dockers-7ff321b38e6b*](https://medium.com/illumination/devops-zero-to-hero-3-everything-you-need-to-know-about-dockers-7ff321b38e6b)
- [*https://www.geeksforgeeks.org/microsoft-azure/*](https://www.geeksforgeeks.org/microsoft-azure/)
- [*https://learn.microsoft.com/en-us/training/azure/*](https://learn.microsoft.com/en-us/training/azure/)
- [*https://www.ibm.com/topics/containers*](https://www.ibm.com/topics/containers)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
