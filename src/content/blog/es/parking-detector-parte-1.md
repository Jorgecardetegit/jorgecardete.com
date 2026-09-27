---
title: "Construye un detector de plazas de aparcamiento con visión artificial | Parte 1"
description: "Crea el modelo de machine learning"
date: 2024-03-06
tags: [visión-artificial, cnn, tensorflow]
icon: "🅿️"
cover: "/blog/covers/parking-detector-parte-1.jpg"
topic: vision
---

*Crea el modelo de machine learning. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/building-a-car-park-slot-classifier-with-computer-vision-part-1-4d843320bc3a).*

![Aparcamiento analizado](https://miro.medium.com/v2/resize:fit:700/0*wojHR8uHZiVd7eT1.gif)
*Aparcamiento analizado | [Fuente](https://github.com/computervisioneng/parking-space-counter?tab=readme-ov-file)*

Los contadores de plazas libres suelen usar sensores de movimiento en cada plaza. Funcionan, pero instalar y mantener cientos de sensores es costoso.

Con visión artificial, una cámara situada estratégicamente puede ver el parking entero y un modelo de machine learning puede clasificar cada plaza como ocupada o libre.

![Detector de plazas](https://miro.medium.com/v2/resize:fit:700/0*yQZ9nnIcpQ7RWkMK)
*Detector de plazas | [Fuente](https://viso.ai/product/computer-vision-parking-lot-occupancy-tutorial/)*

## Analizar el problema

Podríamos usar un detector como [YOLO](https://arxiv.org/pdf/1506.02640.pdf) o [R-CNN](https://arxiv.org/pdf/1311.2524.pdf). Pero estos modelos requieren muchas imágenes anotadas con cajas y clases en formatos como YOLO, COCO o Pascal VOC.

![COCO frente a YOLO](https://miro.medium.com/v2/resize:fit:700/0*3Lqi3jh15f8wONrj.png)
*COCO frente a YOLO | [Fuente](https://haobin-tan.netlify.app/ai/computer-vision/object-detection/coco-json-to-yolo-txt/)*

Aquí no necesitamos localizar las plazas: la cámara no se mueve y todas están siempre en el mismo sitio. Solo necesitamos clasificar cada una. Para ello construiremos una **máscara**.

## Máscaras

Una máscara aísla zonas concretas de una imagen para trabajar únicamente con ellas.

![Máscara binaria frente a RGB](https://miro.medium.com/v2/resize:fit:700/0*HOwb-YKZTEd_N1bi)
*Máscara binaria frente a RGB | [Fuente](https://mxnet.apache.org/versions/1.2.1/tutorials/python/data_augmentation_with_masks.html)*

Usaremos una máscara binaria personalizada que cubre las plazas. Puede crearse con OpenCV, Inkscape, Photoshop u otras herramientas.

![Imagen original y máscara](https://miro.medium.com/v2/resize:fit:720/1*ZjNQEfSekuOzXlBgFT-BDA.jpeg)
*Imagen original y máscara | [Fuente](https://github.com/computervisioneng/parking-space-counter?tab=readme-ov-file)*

## Segmentar el vídeo

Descarga los recursos del [repositorio](https://github.com/TheDeepHub/ParkingDetector/tree/main/Video%26Mask).

~~~python
import cv2

video_capture = cv2.VideoCapture("ruta/al/video")
mask = cv2.imread("ruta/a/la/mascara", cv2.IMREAD_GRAYSCALE)
~~~

Un vídeo es una secuencia de frames. En cada uno:

1. Lo convertimos a escala de grises.
2. Aplicamos la máscara.
3. Buscamos los contornos de las plazas.
4. Dibujamos cajas a su alrededor.

~~~python
def draw_bounding_boxes(frame, mask):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    segmented = cv2.bitwise_and(gray, gray, mask=mask)
    contours, _ = cv2.findContours(
        segmented, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE,
    )

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    return frame
~~~

![Máscara combinada con vídeo](https://miro.medium.com/v2/resize:fit:700/0*P_N-JcF_AbCLKW7H.gif)
*Máscara combinada con vídeo | Creada por el autor*

La detección de cambios de intensidad de píxel sería una alternativa rápida, pero no robusta: peatones, lluvia, niebla o una cámara sucia también cambian la imagen. Para resolverlo entrenaremos una CNN.

## Entrenar una CNN con TensorFlow

El dataset contiene las clases empty y not_empty, con 3.045 imágenes por clase, organizadas en carpetas.

~~~python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

data_gen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_ds = data_gen.flow_from_directory(
    "ruta/al/dataset",
    subset="training",
    seed=123,
    target_size=(29, 68),
    batch_size=32,
    class_mode="sparse",
)

val_ds = data_gen.flow_from_directory(
    "ruta/al/dataset",
    subset="validation",
    seed=123,
    target_size=(29, 68),
    batch_size=32,
    class_mode="sparse",
)
~~~

Las imágenes se redimensionan a 29 × 68 y se normalizan. Puedes consultar [la guía de interpolación](/blog/art-science-interpolation) para entender este paso.

La arquitectura usa dos capas convolucionales, dos de max pooling, Flatten y dos densas:

~~~python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

model = Sequential([
    Conv2D(32, (3, 3), activation="relu", input_shape=(29, 68, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation="relu"),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.5),
    Dense(2, activation="softmax"),
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

model.fit(train_ds, validation_data=val_ds, epochs=10)
model.save("ruta/al/modelo.h5")
~~~

![Estructura de CNN](https://miro.medium.com/v2/resize:fit:652/1*x1OsO3bxgmOGxfJLxYhlnA.png)
*Estructura de CNN | Creada con visualkeras*

El ejemplo consiguió 99,1 % de precisión de validación. Conviene consultar la precisión de validación, no solo la de entrenamiento, para detectar sobreajuste.

## Integrar el modelo

Preprocesamos cada región de interés y la enviamos a la CNN:

~~~python
def preprocess_for_prediction(roi, target_size=(68, 29)):
    roi_resized = cv2.resize(roi, target_size)
    roi_normalized = roi_resized / 255.0
    return np.expand_dims(roi_normalized, axis=0)
~~~

Para cada plaza, predecimos su clase y dibujamos verde si está vacía y rojo si está ocupada:

~~~python
def draw_bounding_boxes_and_predict(frame, mask, model):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    segmented = cv2.bitwise_and(gray, gray, mask=mask)
    contours, _ = cv2.findContours(
        segmented, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE,
    )

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        roi = frame[y:y+h, x:x+w]
        prediction = model.predict(preprocess_for_prediction(roi))
        predicted_class = np.argmax(prediction, axis=1)[0]
        color = (0, 255, 0) if predicted_class == 0 else (0, 0, 255)
        cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)

    return frame
~~~

![Resultado final](https://miro.medium.com/v2/resize:fit:700/0*viFNIySnctNWKGuY.gif)
*Resultado final | Creada por el autor*

Resumen:

1. Una máscara aísla las plazas.
2. Una CNN las clasifica como ocupadas o vacías.
3. El modelo procesa cada frame y marca cada plaza.

La [parte 2](/blog/parking-detector-parte-2) explica cómo contenedorizar y desplegar el modelo con Docker y Azure.

### Bibliografía

- [OpenCV](https://opencv.org/)
- [Detección de plazas con deep learning](https://medium.com/the-research-nest/parking-space-detection-using-deep-learning-9fc99a63875e)
- [Tutorial de ocupación de parking](https://viso.ai/product/computer-vision-parking-lot-occupancy-tutorial/)
- [Repositorio del proyecto](https://github.com/computervisioneng/parking-space-counter)
