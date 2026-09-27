---
title: "Crear un bot de Twitter/X con MySQL, OpenAI y la API de arXiv"
description: "Mantente al día de las últimas novedades en machine learning"
date: 2024-03-26
tags: [python, openai, mysql, bots]
icon: "🤖"
cover: "/blog/covers/twitter-bot-mysql-openai-arxiv.jpg"
topic: practice
---

*Mantente al día de las últimas novedades en machine learning. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/building-a-twitter-bot-with-mysql-openai-and-arxiv-api-a08cba47e097).*

![Imagen creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*T5pX0_dM6A6EJXbc)

Las cuentas automatizadas son una parte importante de las redes sociales. Más allá del debate sobre cómo afectan a nuestras interacciones, pueden ser útiles para publicar información periódica y relevante. En este tutorial construiremos una cuenta automatizada de X, antes Twitter, que publica investigación académica reciente de arXiv.

arXiv es un archivo abierto de artículos científicos, alojado por la Universidad de Cornell. Es una herramienta esencial para quien quiera seguir los últimos avances de un área de investigación.

El bot reúne cuatro piezas:

1. Una aplicación de X con permiso para publicar.
2. Un programa de Python que consulta la API de arXiv.
3. Un modelo de OpenAI que transforma los metadatos del artículo en una publicación breve.
4. Una base de datos MySQL que conserva los artículos y los mensajes generados.

> Las APIs, los permisos, los precios y los SDK cambian con el tiempo. Antes de poner un bot en producción, revisa la documentación actual de cada servicio y sus normas de automatización.

## Portal para desarrolladores de X

El portal de desarrolladores centraliza el acceso a las APIs, la administración de proyectos y aplicaciones, las analíticas y los recursos de soporte de X. Es necesario tanto para publicar automáticamente como para leer datos de la plataforma.

El flujo general consiste en crear una cuenta de desarrollador, añadir un proyecto y crear una aplicación. Los niveles de acceso y los productos disponibles pueden variar; elige el que permita publicar y se ajuste a tu caso de uso.

![Crear una cuenta, añadir un proyecto y seleccionar acceso](https://miro.medium.com/v2/resize:fit:700/1*wUex_zsJnNJnn8Jbq86_Mw.png)

### Proyecto, aplicación y credenciales

Un **proyecto** agrupa un objetivo, por ejemplo analizar conversaciones sobre un tema o publicar actualizaciones desde una web. Una **aplicación** es el software concreto que se conecta a la API dentro de ese proyecto.

Al crear una aplicación obtendrás credenciales de OAuth, normalmente:

- API Key y API Secret.
- Access Token y Access Token Secret.

![Claves de consumidor y tokens de autenticación](https://miro.medium.com/v2/resize:fit:700/1*WtafVVYz9HseKS1jX7KCfQ.png)

En la configuración de autenticación de usuario, habilita permisos de lectura y escritura si el bot tiene que publicar. Para una aplicación automatizada puede ser necesario seleccionar el tipo de app o bot y definir una URL de callback y una URL de sitio web.

Nunca publiques estas claves ni las subas al repositorio. Guárdalas en variables de entorno con un archivo .env local que esté incluido en .gitignore.

~~~text
TWITTER_CONSUMER_KEY=...
TWITTER_CONSUMER_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_TOKEN_SECRET=...
~~~

### Publicar con Tweepy

[Tweepy](https://github.com/tweepy/tweepy) es una biblioteca de Python que simplifica el acceso a la API de X/Twitter. El siguiente fragmento carga las credenciales y crea un cliente capaz de publicar:

~~~python
from dotenv import load_dotenv
import os
import tweepy

load_dotenv()

consumer_key = os.getenv("TWITTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

client_twitter = tweepy.Client(
    consumer_key=consumer_key,
    consumer_secret=consumer_secret,
    access_token=access_token,
    access_token_secret=access_token_secret,
)

def publicar_post(contenido):
    response = client_twitter.create_tweet(text=contenido)
    print(f"Publicación enviada: {response.data}")
~~~

El objeto Client es el punto de entrada a los endpoints de la API v2. Si las credenciales y permisos son correctos, llamar a publicar_post debería enviar un mensaje desde la cuenta asociada.

## Consultar arXiv

arXiv ofrece una API pública que no requiere autenticación. Una API se consulta mediante un endpoint: una dirección a la que el cliente envía una petición y de la que recibe una respuesta con datos.

Para obtener artículos se utiliza una petición HTTP GET al endpoint de consultas:

~~~text
http://export.arxiv.org/api/query?
~~~

La petición acepta parámetros para elegir la categoría, el punto inicial y el número máximo de resultados:

~~~python
query_params = {
    "search_query": "cat:cs.LG",
    "start": 0,
    "max_results": 1,
}
~~~

arXiv tiene una taxonomía amplia. En este ejemplo usamos cs.LG, la categoría de machine learning dentro de informática, pero puedes cambiarla por cualquier área de la [taxonomía de arXiv](https://arxiv.org/category_taxonomy).

![Algunos subcampos de informática en arXiv](https://miro.medium.com/v2/resize:fit:700/1*EwqThNBsrLFhEFzW--R8OA.png)

Con requests y feedparser, el scraper queda así:

~~~python
import feedparser
import requests

def consultar_arxiv():
    url_api = "http://export.arxiv.org/api/query?"

    query_params = {
        "search_query": "cat:cs.LG",
        "start": 0,
        "max_results": 1,
    }

    response = requests.get(url_api, params=query_params, timeout=30)
    response.raise_for_status()

    return feedparser.parse(response.content)

feed = consultar_arxiv()
print(feed["entries"][0].keys())
~~~

La respuesta de arXiv llega como XML. feedparser la convierte en una estructura más cómoda de recorrer. De cada entrada nos interesan título, autoría, resumen, fecha de publicación, enlace y etiquetas:

~~~python
for entry in feed.entries:
    url = next(
        (link.href for link in entry.links if link.rel == "alternate"),
        None,
    )
    autores = ", ".join(author.name for author in entry.authors)

    titulo = entry.title
    resumen = entry.summary
    fecha_publicacion = entry.published
    etiquetas = ", ".join(tag["term"] for tag in entry.get("tags", []))
~~~

Conviene probar varias categorías y revisar el feed antes de automatizar publicaciones. También hay que respetar los límites y las recomendaciones de uso de arXiv.

## Generar el texto con OpenAI

La plataforma de OpenAI permite convertir los metadatos de un artículo en una publicación comprensible. Crea una clave de API, guárdala únicamente como variable de entorno y establece límites de gasto y uso adecuados para el proyecto.

~~~text
OPENAI_API_KEY=...
~~~

El artículo original usaba la API de Chat Completions y el modelo gpt-3.5-turbo. La estructura siguiente refleja ese enfoque histórico; consulta la documentación vigente de OpenAI para elegir el modelo y la API recomendados en el momento de implementar el proyecto.

~~~python
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

def responder_prompt(prompt):
    client = OpenAI(api_key=openai_api_key)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content
~~~

Para producir una publicación se envían el título, el resumen y el enlace del artículo. Como la plataforma limita la longitud de los mensajes, el código reintenta la generación si se supera el máximo de 280 caracteres:

~~~python
from openai import OpenAI

def generar_post(articulo):
    if articulo is None:
        return "No se encontró ningún artículo para publicar."

    client = OpenAI(api_key=openai_api_key)
    prompt = (
        "Crea una publicación atractiva en español sobre esta investigación: "
        f"{articulo['title']}. Resumen: {articulo['summary']}. "
        f"Incluye este enlace: {articulo['link']}. "
        "No superes 280 caracteres."
    )

    for _ in range(5):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        contenido = response.choices[0].message.content.strip()

        if len(contenido) <= 280:
            return contenido

    return "No se pudo generar una publicación dentro del límite de longitud."
~~~

En una implementación real, además de contar caracteres, conviene validar enlaces, manejar errores transitorios, evitar contenido duplicado y revisar que la salida cumple las políticas de la plataforma.

## Conectar las piezas

El flujo completo es directo:

1. Consultar arXiv.
2. Elegir una entrada del feed.
3. Generar el mensaje con OpenAI.
4. Publicarlo mediante Tweepy.

~~~python
feed = consultar_arxiv()
articulos = feed.entries

post = generar_post(articulos[0])
publicar_post(post)
~~~

Hasta ahora, la información desaparece si no se almacena. Guardar los metadatos y la publicación generada permite auditar el bot, evitar repetir artículos y realizar análisis posteriores.

## Guardar los datos en MySQL

MySQL es una opción habitual para conservar los artículos recuperados y los mensajes creados. Tras instalarlo y acceder al cliente, crea una base de datos:

~~~sql
CREATE DATABASE deep_learning_papers;
USE deep_learning_papers;
~~~

La tabla siguiente relaciona los datos que devuelve arXiv con el texto generado por el modelo:

~~~sql
CREATE TABLE papers (
    id INT AUTO_INCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    abstract TEXT,
    publication_date VARCHAR(255),
    url VARCHAR(255),
    keywords TEXT,
    summary TEXT,
    PRIMARY KEY (id)
);
~~~

Guarda los datos de conexión fuera del código:

~~~text
MYSQL_DATABASE=deep_learning_papers
MYSQL_HOST=localhost
MYSQL_USER=...
MYSQL_PASSWORD=...
~~~

Después, crea una conexión, un cursor y una consulta parametrizada. Los parámetros %s hacen que los valores se envíen por separado de la sentencia SQL, una práctica esencial para evitar inyecciones SQL.

~~~python
import mysql.connector
from mysql.connector import Error

def insertar_articulo(
    titulo,
    autores,
    resumen,
    fecha_publicacion,
    url,
    etiquetas,
    publicacion,
):
    conn = None
    cursor = None

    try:
        conn = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE"),
        )
        cursor = conn.cursor()

        insert_query = """
        INSERT INTO papers
        (title, author, abstract, publication_date, url, keywords, summary)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """

        cursor.execute(
            insert_query,
            (
                titulo,
                autores,
                resumen,
                fecha_publicacion,
                url,
                etiquetas,
                publicacion,
            ),
        )
        conn.commit()

    except Error as error:
        print(f"Error de MySQL: {error}")

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None and conn.is_connected():
            conn.close()
~~~

Por último, una función puede recorrer el feed, estructurar cada entrada, generar el texto y guardar toda la información:

~~~python
def procesar_feed_arxiv(feed):
    for entry in feed.entries:
        articulo = {
            "title": entry.title,
            "summary": entry.summary,
            "link": next(
                (link.href for link in entry.links if link.rel == "alternate"),
                None,
            ),
        }

        autores = ", ".join(author.name for author in entry.authors)
        etiquetas = ", ".join(tag["term"] for tag in entry.get("tags", []))
        post = generar_post(articulo)

        insertar_articulo(
            articulo["title"],
            autores,
            articulo["summary"],
            entry.published,
            articulo["link"],
            etiquetas,
            post,
        )

    return post
~~~

## Conclusión

Ya tenemos la base de una aplicación automatizada: un scraper que descubre artículos en arXiv, un modelo que redacta una publicación, un cliente que la envía a X/Twitter y una base de datos que conserva el resultado.

Es un proyecto educativo, pero se puede ampliar con programación periódica, filtros por palabras clave, detección de duplicados, revisión humana antes de publicar, observabilidad y gestión robusta de errores. Si quieres partir de la implementación original, puedes consultar el [repositorio del proyecto](https://github.com/TheDeepHub/Twitter_bot).

## Bibliografía

- [arXiv](https://arxiv.org/).
- [Portal para desarrolladores de X/Twitter](https://developer.twitter.com/).
- [paperscraper](https://pypi.org/project/paperscraper/).
- [Documentación de OpenAI](https://platform.openai.com/docs/overview).
- [arxivscraper](https://github.com/Mahdisadjadi/arxivscraper).
- [Crear un bot con Python y Tweepy](https://realpython.com/twitter-bot-python-tweepy/).
- [Documentación de Tweepy](https://docs.tweepy.org/en/stable/getting_started.html).
