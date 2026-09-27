---
title: "Construye un detector de plazas de aparcamiento con visión artificial | Parte 2"
description: "Despliega el modelo de machine learning"
date: 2024-03-10
tags: [docker, azure, flask, mlops]
icon: "🅿️"
cover: "/blog/covers/parking-detector-parte-2.jpg"
topic: practice
---

*Despliega el modelo de machine learning. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/building-a-parking-space-detector-with-computer-vision-part-2-1f4bcea9bf9c).*

![Modelo de detección de plazas construido en la parte 1](https://miro.medium.com/v2/resize:fit:700/0*tdP3UEmxerGvnM4-.gif)
*Modelo de detección de plazas construido en la parte 1 | [Fuente](/blog/parking-detector-parte-1)*

> [Parte 1](/blog/parking-detector-parte-1): crear el modelo de machine learning.

Para poner un modelo de ML en producción podemos seguir varias rutas. En este artículo veremos cómo **contenedorizar** el programa y **alojarlo en la nube** para que pueda ejecutarse continuamente e interactuar con otros sistemas.

### ¿Qué significa hosting?

Hosting es almacenar y servir aplicaciones, webs o servicios desde uno o varios servidores, haciéndolos accesibles por Internet o una red privada.

Una opción popular para alojar un modelo es usar proveedores de servicios cloud.

## Proveedores cloud

Los proveedores cloud ofrecen servidores, almacenamiento, bases de datos, redes, software, analítica e inteligencia a través de Internet.

Los más conocidos son:

- [Amazon Web Services](https://aws.amazon.com/es/)
- [Microsoft Azure](https://azure.microsoft.com/es-es/)
- [Google Cloud Platform](https://cloud.google.com/)
- [IBM Cloud](https://www.ibm.com/es-es/cloud)

En este proyecto usaremos Azure.

Un programa almacenado en tu ordenador solo estará disponible mientras lo uses. Además, un equipo personal tiene CPU, memoria y almacenamiento limitados; mantener un servidor 24/7 requiere electricidad, conexión y mantenimiento.

Los proveedores cloud aplican normalmente pago por uso.

![Hosting tradicional frente a cloud](https://miro.medium.com/v2/resize:fit:700/0*0ylWJgPHDAJwhlPG)
*Hosting tradicional frente a cloud | [Fuente](https://websitesetup.org/different-types-of-web-hosting/)*

## Contenedores

Los contenedores son paquetes ejecutables ligeros que incluyen código, entorno de ejecución, herramientas de sistema, librerías y configuración.

Al empaquetar aplicación y dependencias juntas, se asegura que funcione igual en el portátil, pruebas o producción. Así se evita el típico problema de «en mi máquina funciona».

![Contenedor frente a máquina virtual](https://miro.medium.com/v2/resize:fit:700/0*arxtLUmNcpQBxjMA)
*Contenedor frente a máquina virtual | [Fuente](https://blog.octo.com/en/i-am-a-developer-why-should-i-use-docker)*

[Docker](https://www.docker.com/) y [Kubernetes](https://kubernetes.io/es/) son tecnologías conocidas; aquí utilizaremos Docker.

Contenedorizar no es obligatorio, pero aporta:

- Consistencia.
- Portabilidad.
- Aislamiento.
- Integración con CI/CD.

## Docker

Docker simplifica desarrollar, distribuir y ejecutar aplicaciones con contenedores.

Componentes principales:

- **Docker Engine:** runtime y herramientas que gestionan contenedores e imágenes.
- **Imágenes:** plantillas de solo lectura con código y dependencias.
- **Contenedores:** instancias ejecutables de imágenes, aisladas aunque comparten kernel con el host.
- **Dockerfile:** documento de instrucciones para construir una imagen.
- **Docker Hub:** registro cloud para compartir imágenes.

![Componentes principales de Docker](https://miro.medium.com/v2/resize:fit:700/0*nmRS7DbpIFPyPTv3)
*Componentes principales de Docker | [Fuente](https://cto.ai/blog/docker-image-vs-container-vs-dockerfile/)*

El flujo es: crear Dockerfile, construir imagen con Docker CLI, ejecutar un contenedor y, si procede, publicar la imagen en un registro.

![Dockerfile → imagen → contenedor](https://miro.medium.com/v2/resize:fit:700/0*hol7ca0J6YpexUTX)
*Dockerfile → imagen → contenedor | [Fuente](https://cultivatehq.com/posts/docker/)*

## Contenedorizar el modelo

### 1. Instalar Docker

Instala Docker desde su [sitio oficial](https://docs.docker.com/engine/install/).

### 2. Preparar la aplicación

Coloca Dockerfile, app.py y requirements.txt en la raíz del proyecto.

requirements.txt contiene las dependencias:

~~~text
tensorflow==2.15.0
opencv-python==4.9.0.80
numpy==1.26.4
~~~

### 3. Crear Dockerfile

~~~text
FROM python:3.8-slim

RUN apt-get update && apt-get install -y libopencv-dev

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "app.py"]
~~~

Este archivo parte de Python 3.8, instala las bibliotecas de sistema de OpenCV, establece /app como directorio de trabajo, copia el código, instala dependencias, expone el puerto 5000 y arranca la aplicación.

### 4. Construir la imagen

Desde el directorio del Dockerfile:

~~~text
docker build -t myapp .
~~~

### 5. Ejecutar el contenedor

~~~text
docker run -p 5000:5000 myapp
~~~

La opción -p enlaza el puerto 5000 del contenedor con el 5000 del equipo. Con el contenedor activo, la aplicación estará disponible en http://localhost:5000.

## Integración con Azure

Dos opciones frecuentes en Azure son [Azure Container Instances (ACI)](https://learn.microsoft.com/en-us/azure/container-instances/) y [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/es-es/products/kubernetes-service/).

ACI es más sencilla; AKS está indicada para aplicaciones más complejas integradas con Kubernetes. Usaremos ACI.

### Azure Container Registry

ACR es un registro gestionado de imágenes Docker. Guardaremos ahí la imagen para desplegarla desde ACI.

Necesitas la imagen preparada y [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).

Pasos:

~~~text
# Iniciar sesión
az login

# Crear registro
az acr create --resource-group myResourceGroup --name myregistry --sku Basic --admin-enabled true

# Iniciar sesión en el registro
az acr login --name myregistry

# Etiquetar y publicar la imagen
docker tag myapp:latest myregistry.azurecr.io/yourappname:latest
docker push myregistry.azurecr.io/yourappname:latest
~~~

Después se crea una instancia de contenedor:

~~~text
az container create   --resource-group myResourceGroup   --name mycontainerinstance   --image myregistry.azurecr.io/yourappname:latest   --cpu 1 --memory 1   --registry-login-server myregistry.azurecr.io   --registry-username <acr-username>   --registry-password <acr-password>   --dns-name-label myappname-dns   --ports 5000
~~~

Sustituye los valores de registro y credenciales; no incluyas secretos en código ni documentación publicada. Ajusta CPU, memoria y puertos según tu aplicación.

## ¿Qué sigue?

Con el modelo contenedorizado y alojado puedes:

- Crear una aplicación que muestre ocupación de aparcamiento en tiempo real.
- Ofrecer vigilancia para detectar actividades inusuales o estacionamiento no autorizado.
- Colaborar con GPS y navegación para ofrecer datos de parking en tiempo real.
- Analizar uso, horas punta y comportamiento de usuarios.

### Bibliografía

- [Guía práctica de contenedores](https://www.freecodecamp.org/news/a-practical-guide-to-containers-dfa66d37ac30/)
- [Docker para principiantes](https://towardsdatascience.com/docker-for-absolute-beginners-what-is-docker-and-how-to-use-it-examples-3d3b11efd830)
- [Documentación de Azure](https://learn.microsoft.com/en-us/training/azure/)
- [IBM: Containers](https://www.ibm.com/topics/containers)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*
