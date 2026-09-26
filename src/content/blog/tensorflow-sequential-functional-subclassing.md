---
title: "Sequential vs Functional vs Subclassing API in Tensorflow"
description: "Choosing the best architecture for your model"
date: 2024-02-06
tags: [tensorflow, keras, deep-learning]
icon: "🧱"
cover: "/blog/covers/tensorflow-sequential-functional-subclassing.jpg"
---

*Choosing the best architecture for your model. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/sequential-vs-functional-vs-subclassing-api-in-tensorflow-8bfcfe91859d).*

![Created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*eY78G2BXFz7gscXO)
*Created by the author with DALL-E 3*

Choosing between the **Sequential**, **Functional**, and **Subclassing** API in **TensorFlow** is a fundamental decision that can influence:

1. The **ease** of the model development.
2. The **speed of iteration.**
3. The **success** of your project.

### Sequential API

The Sequential API, with its **user-friendly interface**, is ideal for building simple models with a **linear stack of layers**.

It’s the gateway for those taking their first steps in TensorFlow and deep learning.

### Functional API

As you advance to **more complex architectures**, the Functional API offers the **flexibilit**y needed to create models with **multiple inputs and outputs**, as well as **shared layers**.

Its balance between **simplicity** and **control** provides a concise way to define complex networks.

### Subclassing API

The Subclassing API gives you **complete freedom**. It allows for the creation of **custom-made models** and **layers**, giving experienced users the ability to implement **innovative ideas without constraints.**

In this article, I will be showing how these different architectures work and how and when we should implement them in TensorFlow.

I will be using the famous [Malaria dataset](https://www.tensorflow.org/datasets/catalog/malaria?hl=es-419).

## Loading and Pre-processing

Before starting, let’s load and adjust the dataset.

```python
# 1. Importing general libraries-------------------------------------------
import tensorflow as tf
import matplotlib.pyplot as plt

import tensorflow_datasets as tfds

# 2. Loading the Dataset---------------------------------------------------
dataset, dataset_info = tfds.load("malaria", 
                                  with_info = True, 
                                  as_supervised = True, 
                                  shuffle_files = True, 
                                  split = ["train"])

# 3. Preprocessing (Resizing, Normalizing, Batching, and Prefetching)-------
IM_SIZE = 224

def resizing(image, label):
  return tf.image.resize(image, (IM_SIZE, IM_SIZE)),label

def normalizing(image, label):
  return image//255.0, label

dataset = dataset[0].map(resizing)
dataset = dataset.map(normalizing)
dataset = dataset.shuffle(buffer_size = 8, 
                          reshuffle_each_iteration = True).
                          batch(32).prefetch(tf.data.AUTOTUNE)

# 4. Splitting (train, validation, and test)--------------------------------
def splits(dataset, TRAIN_RATIO, VAL_RATIO, TEST_RATIO):
  DATASET_SIZE = len(dataset)

  train_dataset = dataset.take(int(TRAIN_RATIO*DATASET_SIZE))

  val_test_dataset = dataset.skip(int(TRAIN_RATIO*DATASET_SIZE))
  val_dataset = val_test_dataset.take(int(VAL_RATIO*DATASET_SIZE))  

  test_dataset = val_test_dataset.skip(int(VAL_RATIO*DATASET_SIZE))
  return train_dataset, val_dataset, test_dataset

TRAIN_RATIO = 0.8
VAL_RATIO = 0.1
TEST_RATIO = 0.1

train_dataset, val_dataset, test_dataset = splits(dataset, 
                                                  TRAIN_RATIO, 
                                                  VAL_RATIO, 
                                                  TEST_RATIO)
```

After **loading** and **pre-processing** our data, we can begin exploring **the different APIs**.

*(I won’t emphasize the code as it’s not the focus of the post. If you want to follow the article’s code, you can copy and paste it into your interpreter).*

## Model Creation

For the sake of simplicity at the time of representing the different structures, I will be using the **Lenet architecture** — A **simple** and **well-known** model in the field of **image classification**.

![Lenet model](https://miro.medium.com/v2/resize:fit:373/0*27eLmY7HOJDv610e)
*Lenet model | [Source](https://thecleverprogrammer.com/2021/10/09/lenet-5-architecture-using-python/)*

Just a quick reminder; the [Lenet architecture](https://en.wikipedia.org/wiki/LeNet) is composed of:

- 2 blocks consisting of one **convolutional** layer, one **MaxPool** layer, and [**batch normalization**](https://en.wikipedia.org/wiki/Batch_normalization).
- 1 **flattened** layer.
- 3 **dense** layers.

## Sequential API — tf.keras.Sequential()

```python
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input,Conv2D,MaxPooling2D,Flatten,Dense,
                                    BatchNormalization
lenet_model = tf.keras.Sequential([
    InputLayer(input_shape = (256, 256, 3)),

    Conv2D(filters = 6, kernel_size = 3, strides= 1, 
                        padding='valid', activation = "relu"),
    BatchNormalization(),
    MaxPool2D (pool_size = 2, strides = 2),
    

    Conv2D(filters = 16, kernel_size = 3, strides= 1, 
                        padding='valid', activation = "relu"),
    BatchNormalization(),
    MaxPool2D (pool_size = 2, strides = 2),

    Flatten(),

    Dense(1000, activation = "relu"),
    BatchNormalization(),
    Dense(100, activation = "relu"),
    BatchNormalization(),
    Dense(1, activation = "sigmoid"),
])
```

As you can see, the model was represented *“sequentially” —* layers were **stacked linearly**. This means that **each layer** has exactly **one input tensor and one output tensor**.

### Limitations of the sequential API

If we are trying to solve a **simple problem** then this approach is great. However, if we want our model to perform **more complex tasks** then we could encounter some limitations:

- **No Multiple Inputs/Outputs:** The sequential API does not support models that have multiple independent inputs or outputs.
- **No Shared Layers:** It is not possible to share layers across different pathways; each layer can have only one input and output.

**Example**
Imagine that for each image in the Malarya dataset, we want to predict:

- The **type** of the cell (primary task).
- The **position** of the cell (secondary or auxiliary task).

It would be necessary to create **two separate models** for performing both tasks with a **sequential structure**, requiring **more time and effort**.

## Functional API

In the Functional API, layers are utilized as **functions**.

You can create a layer and call it **to get a tensor**. Each call to a layer generates **a new node in the layer’s graph**, taking some tensors as **input** and producing new tensors as **output**.

**Layer Connectivity** You can also connect layers **by calling them on each other**. This allows for the creation of c**omplex network graphs** instead of just **sequential models**.

A layer can have **multiple inputs** and/or **outputs** and can be **shared between different paths**.

The following code is a representation of the LeNet model **with the Functional API**:

```python
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input,Conv2D,MaxPooling2D,Flatten,Dense,
                                    BatchNormalization

# Input layer
input_img = Input(shape=(256, 256, 3))  

# Shared layers (convolutional base)
x = Conv2D(6, (3, 3), activation='relu', strides=1, padding='valid')(input_img)
x = BatchNormalization()(x)
x = MaxPooling2D(pool_size=2, strides=2)(x)

x = Conv2D(16, (3, 3), activation='relu', strides=1, padding='valid')(x)
x = BatchNormalization()(x)
x = MaxPooling2D(pool_size=2, strides=2)(x)

x = Flatten()(x)

# Dense layers for feature extraction
x = Dense(1000, activation='relu')(x)
x = BatchNormalization()(x)
x = Dense(100, activation='relu')(x)
x = BatchNormalization()(x)

# Disease Classification path
disease_classification_output = Dense(1, activation='sigmoid', 
                        name='disease_classification')(x)

# Localization path
localization_output = Dense(5, activation='softmax', 
              name='cell_localization')(x)  # 5 categories for cell location
```

Now we are **sharing layers** and producing **multiple outputs**.

Both tasks will use some *shared layers*, but the **disease classification path** uses a **sigmoid with only one neuron**, while the **localization path** uses a **softmax with five neurons**.

Let’s take a look at how we can utilize this when **creating** and **compiling** the model:

**Model creation**

```python
# Create the model
model = Model(inputs=input_img, 
              outputs=[disease_classification_output, localization_output])
```

Here we are specifying the **two different outputs** the model will produce — similar to the **sequential API**.

## Get Jorgecardete’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

**Model compilation**

```python
# Compile the model
model.compile(optimizer='adam',
              loss={'disease_classification': 'binary_crossentropy', 
                    'cell_localization': 'categorical_crossentropy'},
              metrics=['accuracy'])
```

At the end of the process, when we **compile** the model, the only difference is that **a loss for each output is being indicated**.

## Limitations of the Functional API

### Less Flexibility for Custom Behaviors

The functional API operates within the **predefined structure of layers and models** — while this is sufficient for **most standard use cases**, it limits the ability to implement **custom behavior** within the model.

For instance, **you cannot easily write custom loops or conditional logic** within the layers of a Functional API model.

### Difficulty in defining Dynamic Architectures

The functional API is **less suited for models where the architecture itself needs to be dynamic or conditional.**

In scenarios where the model architecture **needs to change based on the input data**, **the subclassing API is more appropriate**.

### Limited Scope for Custom Layers

While you can create **custom layers in the Functional API**, the subclassing API offers a **more natural and flexible** way to build entirely **new types of layers or models**, as you have full control over the forward pass and can include complex logic within it.

## Sub-Classing API

In the **Malaria dataset**, the images have *different sizes* — in our pipeline, we already managed this by **resizing them**.

However, suppose that instead of handling the issue in the preprocessing part, **we want to handle it in the model directly.**

More specifically we want to apply an ***AveragePooling Layer*** only to the images with an **input shape > 100**.

To do this we have to include **conditions** in our model architecture, so our best option is using a **sub-classing API**.

### How does the Sub-Classing model structure work?

Model subclassing in TensorFlow is a **powerful** and **flexible** way to define **custom models**.

It allows for the **most flexibility** in creating a model **by enabling you to define custom behavior for the forward pass**.

Here’s an overview of how it works:

**1. Subclass from** `tf.keras.Model`

- Your model class should subclass `tf.keras.Model`.
- This gives your model access to all the functionalities of a **Keras model**, such as compiling, training, evaluating, and making predictions.

**2. Define Model Layers in** `__init__` **Method**

- In the constructor (`__init__` method), **you define all the layers you intend to use**.
- These layers **become attributes of the model** and can maintain state (weights, biases, etc.).

**3. Implement the Forward Pass in** `call` **Method**

- The `call` method is **where you define the model's forward pass**.
- This is where you specify **how the data flows through the model**, layer by layer.
- You can include **any logic** in this method, making it suitable for models with **conditional logic**, **loops**, and **other dynamic behaviors**.

**4. Instantiating the Model**

- Once the class is defined, you **instantiate it** to create **an actual model object**.
- This object can then be used like **any other Keras model**.

Let´s see how we would use our LeNet model for applying an AveragePooling Layer to the images with an input shape > 100.

```python
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, 
                                    BatchNormalization

class MalariaDiagnosisModel(tf.keras.Model):
    def __init__(self):
        super(MalariaDiagnosisModel, self).__init__()
        # Define downsampling layer for larger images
        self.downsample = AveragePooling2D(pool_size=(2, 2))
        
        # LeNet architecture layers with batch normalization
        self.conv1 = Conv2D(filters=6, kernel_size=(5, 5), activation='relu')
        self.batchnorm1 = BatchNormalization()
        self.pool1 = MaxPooling2D(pool_size=(2, 2))
        self.conv2 = Conv2D(filters=16, kernel_size=(5, 5), activation='relu')
        self.batchnorm2 = BatchNormalization()
        self.pool2 = MaxPooling2D(pool_size=(2, 2))
        self.flatten = Flatten()
        self.dense1 = Dense(units=120, activation='relu')
        self.batchnorm3 = BatchNormalization()
        self.dense2 = Dense(units=84, activation='relu')
        self.batchnorm4 = BatchNormalization()
        self.output_layer = Dense(units=1, activation='sigmoid') 

    def call(self, inputs):
        # Check if the image is larger than a threshold (e.g., 100x100)
        if inputs.shape[1] > 100:
            x = self.downsample(inputs)
        else:
            x = inputs

        # LeNet processing steps with batch normalization
        x = self.conv1(x)
        x = self.batchnorm1(x)
        x = self.pool1(x)
        x = self.conv2(x)
        x = self.batchnorm2(x)
        x = self.pool2(x)
        x = self.flatten(x)
        x = self.dense1(x)
        x = self.batchnorm3(x)
        x = self.dense2(x)
        x = self.batchnorm4(x)
        return self.output_layer(x)

# Create an instance of the model
model = MalariaDiagnosisModel()
```

Here we are:

1. creating a class inheriting from **tf.keras.Model.**
2. Defining our model in the **__init__()** method.
3. Defining our condition in the **call** method (if the image input is larger than (100 x 100) then we pass it through an **AveragePooling layer**).

## Conclusion

- For **beginners or simple projects**: The Sequential API is often the best starting point due to its simplicity and ease of use.
- For **most use cases**: The Functional API strikes a good balance between ease of use and flexibility, making it suitable for a wide range of applications.
- For **advanced research or highly customized models**: The Subclassing API is the best option — It gives you full control over the model but requires a good grasp of TensorFlow.

### Bibliography

- [https://msalamiitd.medium.com/demystifying-model-architectures-in-tensorflow-a-comprehensive-guide-60393d8fa684](https://msalamiitd.medium.com/demystifying-model-architectures-in-tensorflow-a-comprehensive-guide-60393d8fa684)
- [https://www.tensorflow.org/guide/keras/functional_api](https://www.tensorflow.org/guide/keras/functional_api)
- [https://www.analyticsvidhya.com/blog/2021/07/understanding-sequential-vs-functional-api-in-keras/](https://www.analyticsvidhya.com/blog/2021/07/understanding-sequential-vs-functional-api-in-keras/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
