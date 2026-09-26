---
title: "YOLO (You Only Look Once): A brief introduction"
description: "Exploring the fundamentals of Object Detection"
date: 2024-03-12
tags: [computer-vision, object-detection, yolo]
icon: "🎯"
order: 6
cover: "/blog/covers/yolo-introduccion.jpg"
---

*Exploring the fundamentals of Object Detection. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/yolo-you-only-look-once-a-brief-introduction-2dea897ae9bd).*

![Image created by the author with DALL E - 3](https://miro.medium.com/v2/resize:fit:700/0*Rji7GYLAI66f1Uq5)
*Image created by the author with DALL E - 3*

### Table of contents

1. [How YOLO works — general notion](#how-yolo-works-general-notion)
2. [Image annotation](#image-annotation)
3. [YOLO architecture](#yolo-architecture)
4. [YOLO training process](#yolo-training-process)
5. [Non-maximum suppression](#5--non-max-suppression)
6. [Intersection Over Union (IoU)](#intersection-over-union-iou-measuring-overlap)
7. [Practical example to understand better YOLO](#brief-example-to-understand-better-how-yolo-works)
8. [Loss function](#loss-function)

You Only Look Once (YOLO) is a groundbreaking type of **Convolutional Neural Network** in the field of **object detection**.

Unlike traditional object detection systems that process an image in **multiple steps**, YOLO simplifies this task **into a single step**, making it **incredibly fast and efficient.**

The key idea:

> YOLO frames object detection as a single regression problem.

Object detection typically involves **two key components:**

1. Identifying **where objects are** in an image — localization**.**
2. Determining **what those objects are** — classification.

![Image classification vs object detection](https://miro.medium.com/v2/resize:fit:401/0*iTsGQJo7G4Chl9O7.png)
*Image classification vs object detection | [**Source**](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/63)*

Traditional methods often treat these as **separate problems**, using one algorithm to propose **potential object regions** and another **to classify these regions.**

YOLO (You Only Look Once) revolutionizes this approach by framing object detection as a **single regression problem** that directly predicts both **bounding boxes and class probabilities** in one go.

## How YOLO works — general notion

When we pass an image to **YOLO**, it automatically divides it into a **grid system.**

![Image divided into grids](https://miro.medium.com/v2/resize:fit:294/1*mM9aGp2Efw_0-Mgl2-weWA.png)
*Image divided into grids | [**Source**](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

Each grid cell is responsible **for predicting:**

- **Bounding boxes** — Boxes with **coordinates** making **potential objects** in the image.
- **Confidence scores** — Probability that a bounding box **contains an actual object.**
- **Class probabilities** — Likelihood that the object **belongs to a particular class** (e.g., car, cat, person).

Based on these **three predictions**, the algorithm creates a bunch of **bounding boxes representing possible locations and dimensions** of each object in the image.

![Multiple bounding boxes](https://miro.medium.com/v2/resize:fit:644/1*Zq_4zwcYkI-pRIZtGF3-yg.png)
*Multiple bounding boxes | [**Source**](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

**Non-Maximum Surpression** Once this process has been carried out and the regions are created, YOLO eliminates **overlapping bounding boxes** and those with **low confidence scores** using a technique called *Non-Maximum Suppression****.***

![Image divided into grids → Bounding boxes creation → Non-maximum suppression](https://miro.medium.com/v2/resize:fit:1000/1*CFjkj_IT4R0IyJ1N8fbRIQ.png)
*Image divided into grids → Bounding boxes creation → Non-maximum suppression | [**Source**](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)*

Now that we have a **general idea** of how the algorithm works, we will go through a **complete review**.

In the first place, it´s important to understand **how datasets are created** to train **object detection models**.

## Image annotation

Image annotation is the process of **labeling or marking up images** with metadata, such as **tagging objects**, **features**, or **classifications**.

In the case of YOLO, **classes are marked with bounding boxes** and their **classification**. This box is usually a **rectangle** that completely **encloses the object of interest**, and it’s **annotated with its coordinates**.

![Object annotated with a bounding box](https://miro.medium.com/v2/resize:fit:700/0*1f3U2A1cAsmcpXwU.jpeg)
*Object annotated with a bounding box | [**Source**](https://towardsdatascience.com/image-data-labelling-and-annotation-everything-you-need-to-know-86ede6c684b1)*

There are **various types of annotation** for object detection. Each serves different purposes:

- **Pascal VOC** — The bounding box is defined by the **top-left corner** and the **bottom-right** corner of the rectangle: `[x_min, y_min, x_max, y_max]`.
- **COCO** — Specifies the bounding box with the **top-left corner** and the **width and height** of the rectangle: `[x_min, y_min, width, height]`.
- **YOLO** — Contains the coordinates of the **center of the box** and the **width** **and height** of the box: `[x_center, y_center, width, height]`.

> **[Image Data Labelling and Annotation — Everything you need to know](https://towardsdatascience.com/image-data-labelling-and-annotation-everything-you-need-to-know-86ede6c684b1)**
> Learn about different types of annotations, annotation formats and annotation tools

As you might have guessed…

> YOLO uses the YOLO annotation type!

![Different types of annotations](https://miro.medium.com/v2/resize:fit:700/0*5POYvWFEkPTCHdCU.jpg)
*Different types of annotations | [**Source**](https://albumentations.ai/docs/getting_started/bounding_boxes_augmentation/#yolo)*

## YOLO Architecture

**YOLO** has gone through **many versions** — **from YOLOv1 to YOLOv9** (at the time this article was written).

The overall structure of the algorithm contains **three main components:**

1. **Backbone** — A pre-trained **CNN** used to **extract visual features** from an image.
2. **Neck** — A series of layers that **mix and combine image features** extracted by the **backbone** at different scales.
3. **Head** — The final **detection layers**.

### # Backbone

The backbone is comprised of **24 convolutional layers** for feature extraction.

> **Quick reminder:** Convolutional layers perform a mathematical operation known as **convolution**. This process entails the application of **specialized filters known as kernels**, that traverse through the image to learn **complex patterns.**

![Convolution operation representation](https://miro.medium.com/v2/resize:fit:395/0*OsG7n0U3jMQEuv9k.gif)
*Convolution operation representation | [**Source**](https://github.com/vdumoulin/conv_arithmetic)*

In between convolutional layers, **max-pooling layers** are used to **reduce the dimensionality** of feature maps.

> **Another quick reminder:** Max pooling layers operate independently on every slice of the input **resizing it spatially**, using the m**ax** **of the values in a window slid** over the input data.

![Max pooling representation](https://miro.medium.com/v2/resize:fit:700/0*QsmYosPhNeJ-koGG.gif)
*Max pooling representation | [**Source**](https://developers.google.com/machine-learning/practica/image-classification/convolutional-neural-networks?hl=es-419)*

*(If you are not familiar with the basics of* ***Convolutional Neural Networks*** *you should* ***take a look at this post*** *before following with the article).*

> **[Convolutional Neural Networks: A Comprehensive Guide](/blog/cnn-guia-completa)**
> Exploring the power of CNNs in image analysis

### # Neck

The neck is an optional component that **sits between the backbone and the head**. Its main function is to enhance **the feature maps produced by the backbone**, making it easier for the head **to detect objects.**

It achieves this by aggregating **features from different layers** of the backbone, which helps in detecting objects **at various scales**.

> The first version of YOLO **didn´t have a “Neck”** so I won´t focus on this part as it´s not a fundamental **of the traditional YOLO architecture.**You can take a look at concepts such as **PANet** and **FPN** which were included in **future versions of YOLO.**

> **[PANet: Path Aggregation Network In YOLOv4](https://medium.com/clique-org/panet-path-aggregation-network-in-yolov4-b1a6dd09d158)**
> PANet is present in the neck of the YOLOv4 model and it is mainly incorporated in the model to enhance the process of…

### # Head

The head is the **final part of the network** and is responsible for **making predictions based on the feature maps** provided by the backbone (and neck, if present).

The feature maps from the previous convolutional layers are **flattened and fed into two fully connected layers.**

![Flattening layer](https://miro.medium.com/v2/resize:fit:262/0*rx9KUbbdXaPUzcge.jpg)
*Flattening layer | [**Source**](https://www.megabagus.id/deep-learning-convolutional-neural-networks/6/)*

The head tasks include:

- **Classifying** objects.
- **Predict bounding boxes** around each object.
- **Estimating the objectness score** (the likelihood of an object being present in the bounding box).

![Full architecture of YOLOv1](https://miro.medium.com/v2/resize:fit:700/0*kt-JLMjBP0vvmpqJ.png)
*Full architecture of YOLOv1 | [**Source**](https://manalelaidouni.github.io/Understanding%20YOLO%20and%20YOLOv2.html)*

**In recap:**

YOLO is composed of **one Convolutional Neural Network** which contains:

- *24* Convolutional layers.
- *4* Maxpool layers.
- *2* Fully connected layers.

> This structure is specific to the **first version of YOLO**, subsequent versions introduced **significant changes** which we won´t cover in this post.

## YOLO training process

Before going through the training process you need to have clear this:

> The division of the image into a grid of cells **DOESN´T OCCUR IN THE INITIAL CNN LAYERS**, but rather **before the last two fully connected layers**.**Convolutional** and **max-pooling** layers are responsible for **extracting and downsampling features from the input image**, creating a **feature map** that highlights essential characteristics.Once the image has gone through the Conv. layers, **the output is flattened and divided into grids** and passed into the fully connected layers.

### 1.- Image input

The input image is **first resized to a fixed size expected by the YOLO model** (*e.g., 416 × 416 pixels*). This resizing is necessary because **CNNs require a fixed input size.**

> At this stage, the image is not divided into a grid of cells; it’s treated as a whole.

![Image resizing (downsampling and upsampling)](https://miro.medium.com/v2/resize:fit:465/0*MAlkN1aRTfwiUYT2)
*Image resizing (downsampling and upsampling) | [**Source**](https://www.quora.com/How-does-image-resizing-work-in-terms-of-changing-the-pixels-number)*

### 2.- Convolutional neural network processing

The resized image is passed through the **CNN architecture** we have just discussed.

These layers include [**convolutional layers**](https://www.sciencedirect.com/topics/engineering/convolutional-layer#:~:text=A%20convolutional%20layer%20is%20the,and%20creates%20an%20activation%20map), [**activation functions**](https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6) (like ReLU), [**pooling layers**](http://sintesis.ugto.mx/WintemplaWeb/01Neural%20Lab/09Convolutional%20NN/06Pooling/index.htm) (to reduce spatial dimensions), and possibly [**batch normalization layers**](https://towardsdatascience.com/batch-norm-explained-visually-how-it-works-and-why-neural-networks-need-it-b18919692739) (to stabilize and accelerate training).

The CNN **processes the image as a whole**, extracting features **at various levels of abstraction**.

Early layers **might detect simple features** like edges and corners, while **deeper layers detect more complex patterns** that are useful for identifying objects.

![3D visualzation of a CNN](https://miro.medium.com/v2/resize:fit:700/1*oEewkBLFxdnxmpG8QQU5RQ.png)
*3D visualzation of a CNN | [**Source**](https://adamharley.com/nn_vis/cnn/3d.html)*

*(CNNs are very* ***abstract*** *and* ***complex*** *to comprehend. I highly recommend this* ***3D CNN*** ***visualizer*** *which will improve your* ***notion of the concept****).*

### 3.- Output layer and grid division

After the input has been processed through the **convolutional layers**, the output is a **feature map** smaller than the original image which retains **essential spatial information**.

![Process of creating a feature map with the most important characteristics](https://miro.medium.com/v2/resize:fit:700/0*tdtuNowSv0XayVoy)
*Process of creating a feature map with the most important characteristics | [**Source**](https://www.analyticsvidhya.com/blog/2020/11/tutorial-how-to-visualize-feature-maps-directly-from-cnn-layers/)*

In the output layer (before the 2 fully connected layers), YOLO conceptually **divides the feature map** into an ***S × S* grid**.

The dimensions of the grid can vary depending on the parameters we pass to the model.

![Different grid dimensions](https://miro.medium.com/v2/resize:fit:625/0*08jjLXG2MTqXOowZ.jpg)
*Different grid dimensions | [**Source**](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/)*

### 4.- Predictions per grid cell

For each cell in the grid, the model **predicts multiple bounding boxes**. Each prediction includes:

- The bounding box **coordinates** (relative to the cell).
- The **confidence score** shows the **likelihood that the bounding box contains an object.**
- The **class probabilities** indicate what object it might be.

![YOLO architecture](https://miro.medium.com/v2/resize:fit:700/1*T8qXizcmDp00dXlfEN3kcg.png)
*YOLO architecture | [**Source**](https://lilianweng.github.io/posts/2018-12-27-object-recognition-part-4/)*

**# Center of bounding boxes** Each grid cell predicts if the **CENTER** of an object is inside it. This focus helps ensure that each object is **uniquely identified and tied to a single grid cell.**

The cell that contains the **center of the object** is in charge of **predicting the dimensions of the bounding box** based on the **characteristics of the object center** and the **feature map** extracted by the convolutional layers.

![The cell at the center of the object predicts the bounding box coordinates, the objectness score, and the class to which that object belongs](https://miro.medium.com/v2/resize:fit:594/0*3NK2nCGyjsgXKAr8.png)
*The cell at the center of the object predicts the **bounding box coordinates**, the **objectness score**, and the **class** to which that object belongs | [**Source**](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/10)*

**# All grid cells make a prediction** We don´t know where is the center of the object so every grid cell **repeats the process we´ve seen in the figure above**. The one with the **highest score** is chosen to **make the prediction**.

To select the grid cell with **the best prediction** we use a technique called **non-max suppression.**

### 5.- Non-max suppression

After YOLO processes an image, it outputs **multiple bounding boxes for objects detected in the image**, each with an associated **confidence score** that indicates the likelihood of the box containing a specific object class.

The bounding boxes are **sorted based on their confidence scores, from highest to lowest**. This ensures that the most confident detections are **considered first.**

The one with the highest confidence is selected as a **reference point.**

![Image with multiple bounding boxes](https://miro.medium.com/v2/resize:fit:700/0*yQxRFZIkjtJGtzpi.jpg)
*Image with multiple bounding boxes | [**Source**](https://www.analyticsvidhya.com/blog/2020/08/selecting-the-right-bounding-box-using-non-max-suppression-with-implementation/)*

### Process of non-maximum surpression

The algorithm selects the box with the **highest confidence.**

The selected box is **compared with the other bounding boxes in the list**. If another box has a **significant overlap** it is considered to be detecting **the same object.**

![Overlap representation](https://miro.medium.com/v2/0*5J_xnEcVJEgXsDCe.png)
*Overlap representation | [**Source**](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/63)*

Suppress: The boxes that have a high overlap (above a predefined threshold) with the reference box are **removed from the list of potential detections.**

A higher threshold means **more boxes are considered the same object**, while a lower threshold **may retain more detections**.

The process continues until all boxes have either **been selected as reference boxes (and kept) or suppressed due to high overlap** with a more confident box.

![Non-Maximum Surpression (NMS)](https://miro.medium.com/v2/resize:fit:700/1*Au_sIcJMcydAhpkuAVSB5A.png)
*Non-Maximum Surpression (NMS) | [**Source**](https://www.analyticsvidhya.com/blog/2020/11/tutorial-how-to-visualize-feature-maps-directly-from-cnn-layers/)*

### Intersection Over Union (IoU) — Measuring overlap

A very famous metric for **measuring the overlap** between two bounding boxes is the **IoU**.

The concept is very simple. You just **divide the area in which the two boxes overlap by the area of the original box.**

You establish a threshold and if the **IoU result** surpasses that **threshold** then it means that the **two bounding boxes overlap** and thus the one with the **lowest confidence score will be suppressed.**

![Intersection over Union (IoU)](https://miro.medium.com/v2/resize:fit:700/0*3Y-I1S_psV_TdZqp.png)
*Intersection over Union (IoU) | [**Source**](https://datahacker.rs/deep-learning-intersection-over-union/)*

## Brief example to understand better how YOLO works

The process may seem **clearer now**, but it's still somewhat **abstract**…

While learning this concept I asked myself a question that helped me a lot **understand better the concept:**

Suppose we trained a model using **two very similar horses** but with a **height difference of one meter**.

> Since they have the same center, will the model be able to distinguish and draw accurate bounding boxes for both with their respective dimensions?

![Objects with similar centers and different dimensions](https://miro.medium.com/v2/resize:fit:564/0*1Bx2MnwiRZHz5pYD.jpg)
*Objects with similar centers and different dimensions | [**Source**](https://livebook.manning.com/book/deep-learning-for-vision-systems/chapter-7/v-6/329)*

Well, as we discussed previously, the **convolutional layers** of the YOLO architecture are designed to **extract and learn a wide range of features from the training images.**

This includes **not just the presence of an object** (like a horse) but also its **size**, **shape**, **texture**, and **other distinguishing features.**

The YOLO model is **learning a mapping** from the **features extracted by the CNN** to the **size and location of the bounding box** around each object.

Through this **regression task**, the model learns **to** **adjust the dimensions** of the predicted bounding boxes based on the **subtle and complex features that differentiate one horse from another in size, even if their centers are in the same position.**

I hope this example helped you to **visualize better** the process that **YOLO is performing** under the hood.

Awesome! Now we are ready to understand **the last part of the puzzle:**

The loss function of YOLO.

## Loss function

The loss function used by YOLO is divided in **three** parts:

1. *Localization Loss (bounding box)*
2. *Confidence Loss (objectness)*
3. *Classification Loss*

### # Localization loss

The localization loss is responsible for **penalizing discrepancies** between the **predicted bounding boxes and the ground truth boxes** for each detected object.

The formula for the **localization loss** in YOLOv1 includes **two main components:**

- Bounding box **center coordinates** *(x, y).*
- **Width and height** of the bounding box *(w, h)*.

![Localization loss formula](https://miro.medium.com/v2/resize:fit:608/0*lMV8nlzO_Y1X6f2u)
*Localization loss formula | Created by the author*

```text
`λ_coord​`: Weight term that increases the loss from bounding box coordinate 
           predictions to emphasize accuracy in localization. 

`S²`: Number of grid cells the image is divided into.

`B`: Number of bounding boxes predicted by each grid cell.

`l`: 1 if the jth bounding box in cell i is "responsible" for the prediction 
     and 0 otherwise.

`x, y, 
 w, h`: Predicted bounding box dimensions. The circumflex versions are the 
        corresponding ground truth values.
```

### # Confidence loss

The formula for the confidence loss consists of **two** parts:

- One for when an object **is present in the box** (objectness).
- And another for when **no object is present in the box**.

The **confidence loss function** in YOLO is designed to teach the model to differentiate between bounding boxes that **likely contain objects** and those that are just **background noise.**

Here is the formula:

![Confidence loss formula](https://miro.medium.com/v2/resize:fit:564/0*X1gLj1jhuVCFJVuH)
*Confidence loss formula | Created by the author*

```text
`λnobj​`: Coefficient that reduces the weight of confidence loss for boxes 
         that do not contain objects, addressing the imbalance between 
         object-containing and non-object-containing boxes.

`S²`: Number of grid cells.

`B`: Number of bounding boxes per grid cell.

`1_ij_obj`​: indicates whether an object is present in cell i for the bounding box. 

`1_ij_nobj`:​ indicates that no object is present in cell i for bounding box j.

`Ci`:​ Confidence score that a bounding box i contains an object.

`C^i​`: Predicted confidence score for bounding box i.
```

### # Classification loss

This loss penalizes the model for **incorrect classifications**, ensuring that it also identifies **what those objects are.**

This component of the **total loss function focuses on how accurately the model classifies objects** that are present within the predicted bounding boxes.

![Classification loss formula](https://miro.medium.com/v2/resize:fit:464/0*jJebFwYtAHCRXQ46)
*Classification loss formula | Created by the author*

```text
`S²`: Number of grid cells.

`1_i_obj`:​ indicates the presence of an object in cell i.

`c`: Represents each class in the set of possible classes.

`p_i(c)`: Ground truth probability that the object in cell i belongs 
          to class c. 1 for the correct class and 0 for all other classes.

`p^_​i(c)`: Predicted probability that the object in cell i belongs to class c.
```

### Complete loss function

Once we have an idea of the t**hree parts of the loss function** let´s see how it works as a whole:

![The complete explanation of YOLO loss function](https://miro.medium.com/v2/resize:fit:700/0*Q6YU9TS3LTqPdPgg.png)
*The complete explanation of YOLO loss function | [**Source**](https://towardsdatascience.com/yolov1-you-only-look-once-object-detection-e1f3ffec8a89)*

The model is trained on an **iterative process** known as **backpropagation,** in which the main objective is to r**educe as much as possible** the loss calculated in this function.

*(If you need a reminder of* ***how Backpropagation works****, check out this article about how it is applied in a b****asic neural network****).*

> **[Backpropagation](https://pub.towardsai.net/backpropagation-2eeb25201095)**
> From mystery to mastery: Decoding the engine behind Neural Networks.

### Bibliography

- [*https://manalelaidouni.github.io/Understanding%20YOLO%20and%20YOLOv2.html*](https://manalelaidouni.github.io/Understanding%20YOLO%20and%20YOLOv2.html)
- [*https://arxiv.org/pdf/1506.02640.pdf*](https://arxiv.org/pdf/1506.02640.pdf)
- [*https://www.geeksforgeeks.org/yolo-you-only-look-once-real-time-object-detection/*](https://www.geeksforgeeks.org/yolo-you-only-look-once-real-time-object-detection/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
