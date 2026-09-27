---
title: "Cómo crear tu dataset con web scraping"
description: "Extraer datos de Glassdoor con Python y Scrapfly"
date: 2024-02-03
tags: [python, web-scraping, datasets]
icon: "🕸️"
cover: "/blog/covers/dataset-web-scraping.jpg"
topic: practice
---

*Extraer datos de Glassdoor con Python y Scrapfly. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/how-to-create-your-dataset-with-web-scraping-1a268dbc3302).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*ksW68wsgdTWy6CKu)
*Imagen creada por el autor con DALL-E 3*

La sociedad es cada vez más consciente del **enorme poder de los datos**. Empresas como **Meta** construyen estrategias enteras sobre su potencial y tecnologías como GPT se entrenan con ellos.

El *machine learning* se ha convertido en una habilidad muy valiosa y la demanda de profesionales que analizan datos no deja de crecer.

Sin embargo, a veces olvidamos algo fundamental:

> Construir el dataset es incluso más importante que analizarlo.

Si no tienes datos, tus conocimientos de ML sirven de poco. En este artículo veremos cómo construir un dataset propio mediante **web scraping**, usando **Glassdoor**, un conocido portal de empleo.

Extraeremos dos elementos:

- El nombre de la empresa.
- Su valoración.

La página de partida es [Glassdoor Reviews](https://www.glassdoor.com/Reviews/index.htm).

### El problema actual del web scraping

Extraer datos es cada vez más difícil. Las empresas son conscientes del valor de su información pública y restringen su acceso, aunque no puedan impedir por completo su recopilación.

Para detectar y bloquear actividad automatizada usan barreras técnicas y monitorización, por ejemplo:

- CAPTCHAs.
- Límites de frecuencia por dirección IP.
- Autenticación de usuario.

Estas medidas no hacen imposible el scraping, pero incrementan el esfuerzo y la complejidad necesarios. Antes de automatizar cualquier extracción, revisa siempre las condiciones de uso y las normas aplicables al sitio.

### Scrapfly

Scrapfly es una herramienta de web scraping que simplifica la extracción de datos de sitios web.

> **[Scrapfly Web Scraping API](https://scrapfly.io/)**
> Una API de scraping con proxies residenciales y navegador sin interfaz para extraer datos.

Permite navegar páginas, interpretar su estructura y extraer información estructurada como **CSV** o **JSON**. También incluye mecanismos para gestionar CAPTCHAs, cookies, sesiones y rotación de IP.

> Si quieres aprender los fundamentos de web scraping, el curso de Scrapy de FreeCodeCamp es una buena introducción.

## Extraer datos de Glassdoor

El primer paso es crear una cuenta gratuita en [Scrapfly](https://scrapfly.io/). Tras iniciar sesión encontrarás tu **API key** y la sección **My Subscription**, que muestra la cuota disponible.

El plan gratuito permitía hasta 1.000 créditos o llamadas a la API; comprueba el plan y los límites vigentes antes de usarlo.

## Programar el scraper

Con una cuenta creada ya podemos construir el scraper. Las funciones de Scrapfly permiten recorrer páginas y estructurar los datos con pocas líneas.

### 1. Importar librerías

~~~python
from scrapfly import ScrapflyClient, ScrapeConfig
from bs4 import BeautifulSoup
import csv
~~~

Usaremos Scrapfly para realizar la solicitud, BeautifulSoup para extraer los datos del HTML y csv para guardar el resultado.

### 2. Crear el cliente de Scrapfly

Pasa tu clave de API al cliente:

~~~python
scrapfly_key = "TU_API_KEY"
client = ScrapflyClient(key=scrapfly_key)
~~~

No subas claves reales al repositorio. Es preferible cargarlas desde variables de entorno.

### 3. Construir la función de extracción

Definimos la URL base y la lista donde se guardará la información:

~~~python
def scrape_glassdoor():
    companies_info = []
    base_url = "https://www.glassdoor.com/Reviews/index.htm"
~~~

#### 3.1 Recorrer páginas

~~~python
for page_num in range(1, 100):
    url = f"{base_url}?overall_rating_low=1&page={page_num}&filterType=RATING_OVERALL"
~~~

El rango de 1 a 100 recorre las primeras 100 páginas; ajústalo a tus necesidades y a los límites autorizados del servicio.

#### 3.2 Configurar la solicitud

La configuración siguiente muestra los parámetros usados en el ejemplo original:

~~~python
result = client.scrape(ScrapeConfig(
    url=url,
    asp=True,
    country="US",
    proxy_pool="public_residential_pool",
))
~~~

- url indica la página objetivo.
- asp configura la solicitud para manejar contenido cargado con JavaScript.
- country orienta geográficamente la solicitud.
- proxy_pool selecciona el conjunto de proxies.

En muchas páginas modernas el contenido se carga dinámicamente con JavaScript y no aparece en el HTML inicial; por eso este tipo de configuración puede ser necesaria. Respeta siempre las condiciones de uso, límites y requisitos de acceso del sitio.

#### 3.3 Crear selectores HTML

Tras obtener el HTML, localizamos el nombre de la empresa y su valoración. Puedes inspeccionar la estructura de una página con las herramientas de desarrollo del navegador.

![Selector del nombre de empresa](https://miro.medium.com/v2/resize:fit:1000/1*1-3x_VTqFGHARreHoO9R_Q.png)
*Selector del nombre: [data-test="employer-short-name"]*

![Selector de valoración de empresa](https://miro.medium.com/v2/resize:fit:1000/1*CAvf78Ba6hlMjVVKull_7A.png)
*Selector de valoración: .ratingsWidget__RatingsWidgetStyles__rating*

Inicializamos BeautifulSoup con html.parser y aplicamos los selectores:

~~~python
soup = BeautifulSoup(result.content, "html.parser")

company_names = soup.select('[data-test="employer-short-name"]')
company_ratings = soup.select(".ratingsWidget__RatingsWidgetStyles__rating")
~~~

BeautifulSoup convierte el HTML en un árbol de objetos Python, que permite localizar nodos con selectores CSS.

#### 3.4 Guardar los datos

Después de extraer los nodos, los guardamos en una lista:

~~~python
for name, rating in zip(company_names, company_ratings):
    companies_info.append({
        "name": name.get_text(strip=True),
        "rating": rating.get_text(strip=True),
    })
~~~

#### 3.5 Código completo de la función

~~~python
def scrape_glassdoor():
    companies_info = []
    base_url = "https://www.glassdoor.com/Reviews/index.htm"

    for page_num in range(1, 1000):
        url = f"{base_url}?overall_rating_low=1&page={page_num}&filterType=RATING_OVERALL"
        result = client.scrape(ScrapeConfig(
            url=url,
            asp=True,
            country="US",
            proxy_pool="public_residential_pool",
        ))

        soup = BeautifulSoup(result.content, "html.parser")
        company_names = soup.select('[data-test="employer-short-name"]')
        company_ratings = soup.select(".ratingsWidget__RatingsWidgetStyles__rating")

        for name, rating in zip(company_names, company_ratings):
            companies_info.append({
                "name": name.get_text(strip=True),
                "rating": rating.get_text(strip=True),
            })
        print(f"Página {page_num} extraída correctamente.")

    return companies_info
~~~

### 4. Guardar en CSV

Podemos guardar los datos con la biblioteca csv:

~~~python
def save_to_csv(data, filename):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Nombre", "Valoración"])
        for item in data:
            writer.writerow([item["name"], item["rating"]])

save_to_csv(company_data, "ruta/al/archivo.csv")
~~~

### ¿Y después de crear el dataset?

Tras extraer los datos puedes usarlos para estudios propios o compartirlos como recurso abierto, siempre que tengas derecho a hacerlo. Una opción es publicar el dataset en Kaggle.

El CSV generado para este artículo está disponible aquí:

> **[Valoraciones de empresas de Glassdoor](https://www.kaggle.com/datasets/jorgecardete/glasdoor-companies-rating)**
> Kaggle es una comunidad de data science con herramientas y recursos para trabajar con datos.

### Bibliografía

- [https://scrapfly.io/blog/how-to-scrape-glassdoor/](https://scrapfly.io/blog/how-to-scrape-glassdoor/)
- [https://www.scraperapi.com/blog/how-to-scrape-glassdoor/](https://www.scraperapi.com/blog/how-to-scrape-glassdoor/)
- [https://github.com/topics/glassdoor-scraper](https://github.com/topics/glassdoor-scraper)
- [https://blog.apify.com/how-to-scrape-glassdoor/](https://blog.apify.com/how-to-scrape-glassdoor/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*
