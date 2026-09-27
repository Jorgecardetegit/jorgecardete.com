---
title: "API Sequential, Functional y Subclassing en TensorFlow"
description: "Elige la mejor arquitectura para tu modelo"
date: 2024-02-06
tags: [tensorflow, keras, deep-learning]
icon: "🧱"
cover: "/blog/covers/tensorflow-sequential-functional-subclassing.jpg"
topic: ml
---

*Elige la mejor arquitectura para tu modelo. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/sequential-vs-functional-vs-subclassing-api-in-tensorflow-8bfcfe91859d).*

![Creada por el autor con DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*eY78G2BXFz7gscXO)
*Creada por el autor con DALL-E 3*

Elegir entre las API **Sequential**, **Functional** y **Subclassing** de **TensorFlow** afecta directamente a:

1. La facilidad para desarrollar el modelo.
2. La velocidad de iteración.
3. El éxito del proyecto.

### Sequential API

Sequential tiene una interfaz sencilla y es ideal para modelos simples con una **pila lineal de capas**. Es la puerta de entrada para quienes empiezan con TensorFlow y deep learning.

### Functional API

Para arquitecturas más complejas, Functional ofrece flexibilidad para crear modelos con **varias entradas y salidas**, además de **capas compartidas**. Equilibra simplicidad y control.

### Subclassing API

Subclassing ofrece libertad total: permite crear capas y modelos a medida, de modo que personas experimentadas pueden implementar ideas innovadoras sin las restricciones de una arquitectura declarativa.

En este artículo usamos el conocido [dataset de malaria](https://www.tensorflow.org/datasets/catalog/malaria?hl=es-419).

## Carga y preprocesamiento

Antes de crear el modelo cargamos, redimensionamos, normalizamos, agrupamos y dividimos el dataset en entrenamiento, validación y prueba.

~~~python
import tensorflow as tf
import tensorflow_datasets as tfds

dataset, dataset_info = tfds.load(
    "malaria",
    with_info=True,
    as_supervised=True,
    shuffle_files=True,
    split=["train"],
)

IM_SIZE = 224

def resizing(image, label):
    return tf.image.resize(image, (IM_SIZE, IM_SIZE)), label

def normalizing(image, label):
    return image / 255.0, label

dataset = dataset[0].map(resizing).map(normalizing)
dataset = dataset.shuffle(8).batch(32).prefetch(tf.data.AUTOTUNE)
~~~

Para representar las estructuras usaremos **LeNet**, un modelo conocido de clasificación de imágenes.

![Modelo LeNet](https://miro.medium.com/v2/resize:fit:373/0*27eLmY7HOJDv610e)
*Modelo LeNet | [Fuente](https://thecleverprogrammer.com/2021/10/09/lenet-5-architecture-using-python/)*

LeNet contiene:

- Dos bloques de capa convolucional, MaxPool y normalización por lotes.
- Una capa Flatten.
- Tres capas densas.

## Sequential API — tf.keras.Sequential()

~~~python
from tensorflow.keras.layers import (
    Input, Conv2D, MaxPool2D, Flatten, Dense, BatchNormalization,
)

lenet_model = tf.keras.Sequential([
    Input(shape=(224, 224, 3)),
    Conv2D(6, 3, strides=1, padding="valid", activation="relu"),
    BatchNormalization(),
    MaxPool2D(pool_size=2, strides=2),
    Conv2D(16, 3, strides=1, padding="valid", activation="relu"),
    BatchNormalization(),
    MaxPool2D(pool_size=2, strides=2),
    Flatten(),
    Dense(1000, activation="relu"),
    BatchNormalization(),
    Dense(100, activation="relu"),
    BatchNormalization(),
    Dense(1, activation="sigmoid"),
])
~~~

Las capas se apilan linealmente: cada una tiene exactamente un tensor de entrada y uno de salida.

### Limitaciones

Sequential es perfecta para problemas simples, pero presenta límites:

- No admite varias entradas o salidas independientes.
- No permite compartir capas entre rutas distintas.

Por ejemplo, si para cada imagen de malaria quisiéramos predecir tanto el tipo de célula como su posición, una estructura secuencial exigiría dos modelos independientes.

## Functional API

En Functional, las capas funcionan como funciones: se crea una capa y se llama sobre un tensor. Cada llamada crea un nodo del grafo y permite conectar capas para crear redes complejas, con múltiples entradas, salidas o caminos que comparten capas.

~~~python
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization

input_img = Input(shape=(224, 224, 3))

x = Conv2D(6, (3, 3), activation="relu")(input_img)
x = BatchNormalization()(x)
x = MaxPooling2D(pool_size=2)(x)
x = Conv2D(16, (3, 3), activation="relu")(x)
x = BatchNormalization()(x)
x = MaxPooling2D(pool_size=2)(x)
x = Flatten()(x)
x = Dense(1000, activation="relu")(x)
x = Dense(100, activation="relu")(x)

disease_output = Dense(1, activation="sigmoid", name="disease_classification")(x)
location_output = Dense(5, activation="softmax", name="cell_localization")(x)

model = Model(
    inputs=input_img,
    outputs=[disease_output, location_output],
)

model.compile(
    optimizer="adam",
    loss={
        "disease_classification": "binary_crossentropy",
        "cell_localization": "categorical_crossentropy",
    },
    metrics=["accuracy"],
)
~~~

Las dos tareas comparten la base convolucional. La clasificación de enfermedad usa una sigmoide con una neurona, mientras que la localización usa una softmax con cinco.

### Limitaciones de Functional

- Opera dentro de una estructura de capas y modelos predefinida; implementar comportamientos personalizados es menos directo.
- Es menos adecuada si la arquitectura debe cambiar dinámicamente según la entrada.
- Aunque permite capas propias, Subclassing es una forma más natural y flexible de crear modelos o capas totalmente nuevos.

## Subclassing API

En el dataset de malaria hay imágenes de tamaños diferentes. Podemos redimensionarlas en el preprocesamiento, pero también podría resolverse dentro del modelo.

Supongamos que queremos aplicar AveragePooling solo cuando la imagen mida más de 100 píxeles. Necesitamos lógica condicional, así que usamos Subclassing.

### Estructura

1. La clase del modelo hereda de tf.keras.Model.
2. En __init__ definimos las capas que usaremos.
3. En call definimos la propagación hacia delante y toda la lógica condicional o de bucles.
4. Instanciamos la clase y la utilizamos como cualquier modelo Keras.

~~~python
from tensorflow.keras.layers import (
    AveragePooling2D, Conv2D, MaxPooling2D,
    Flatten, Dense, BatchNormalization,
)

class MalariaDiagnosisModel(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.downsample = AveragePooling2D(pool_size=(2, 2))
        self.conv1 = Conv2D(6, (5, 5), activation="relu")
        self.batchnorm1 = BatchNormalization()
        self.pool1 = MaxPooling2D(pool_size=(2, 2))
        self.conv2 = Conv2D(16, (5, 5), activation="relu")
        self.pool2 = MaxPooling2D(pool_size=(2, 2))
        self.flatten = Flatten()
        self.dense1 = Dense(120, activation="relu")
        self.dense2 = Dense(84, activation="relu")
        self.output_layer = Dense(1, activation="sigmoid")

    def call(self, inputs):
        x = self.downsample(inputs) if inputs.shape[1] > 100 else inputs
        x = self.pool1(self.batchnorm1(self.conv1(x)))
        x = self.pool2(self.conv2(x))
        x = self.flatten(x)
        x = self.dense1(x)
        x = self.dense2(x)
        return self.output_layer(x)

model = MalariaDiagnosisModel()
~~~

En este caso:

1. Creamos una clase que hereda de tf.keras.Model.
2. Definimos las capas en __init__.
3. Incluimos la condición en call: si la entrada supera 100 × 100, pasa por AveragePooling.

## Conclusión

- Para **principiantes o proyectos simples**, Sequential suele ser el mejor punto de partida por su sencillez.
- Para **la mayoría de casos**, Functional equilibra facilidad de uso y flexibilidad.
- Para **investigación avanzada o modelos muy personalizados**, Subclassing ofrece control total, pero exige dominar mejor TensorFlow.

### Bibliografía

- [Guía de arquitecturas de TensorFlow](https://msalamiitd.medium.com/demystifying-model-architectures-in-tensorflow-a-comprehensive-guide-60393d8fa684)
- [Functional API de Keras](https://www.tensorflow.org/guide/keras/functional_api)
- [Sequential frente a Functional API en Keras](https://www.analyticsvidhya.com/blog/2021/07/understanding-sequential-vs-functional-api-in-keras/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos.
