---
title: "But what was before Convolutional Neural Networks? | Part 2"
description: "A quick introduction to Haar Cascades"
date: 2024-02-14
tags: [computer-vision, haar-cascades, machine-learning]
icon: "🧭"
cover: "/blog/covers/antes-de-las-cnn-parte-2.jpg"
---

*A quick introduction to Haar Cascades. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-what-was-before-cnns-part-2-992ffbac9cf1).*

![Image created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:1792/0*kVyFRFbEyBMaxB1k)
*Image created by the author with DALL-E 3*

You're reading for free via [Jorgecardete's](https://medium.com/@jorgecardete) Friend Link. [Become a member](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fthedeephub%2Fbut-what-was-before-cnns-part-2-992ffbac9cf1&source=-----992ffbac9cf1---------------------post_friend_link_meter--------------------) to access the best of Medium.

Member-only story

## But what was before Convolutional Neural Networks? | Part 2

## A quick introduction to Haar Cascades

If you´re familiar with [Computer Vision](https://en.wikipedia.org/wiki/Computer_vision), I´m sure you know (or at least you have heard about) **Convolutional Neural Networks (CNNs)**.

CNNs have been the foundation of most of the development in this field. From **classifying images** to **detecting objects** and even **creating masks**, this algorithm has played a crucial role.

> **[Convolutional Neural Networks: A Comprehensive Guide](/blog/cnn-guia-completa)**
> Exploring the power of CNNs in image analysis

**But have you ever asked yourself if there is any other way of classifying images?**

Especially in the field of [object detection](https://en.wikipedia.org/wiki/Object_detection), **two popular algorithms** have become an important part of **Computer Vision history:**

- Haar Cascades
- Histograms of Gradients

In this article, I will talk about **haar cascades**, in the first part, we saw how histograms of gradients work.

> **[But what was before Convolutional Neural Networks? | Part 1](/blog/antes-de-las-cnn-parte-1)**
> A Quick Introduction to Histograms of Oriented Gradients

## Haar cascades

**Haar cascades** were named after [Alfred Haar](https://en.wikipedia.org/wiki/Alfr%C3%A9d_Haar), the mathematician who introduced **Haar-like features** (we will see them in a moment).

The technique was further developed by **Paul Viola** and **Michael Jones** in their **2001 paper**, where they proposed a method for **real-time face detection**.

### # How does the algorithm work?

Take a look at the following figure:

![Haar cascades](https://miro.medium.com/v2/resize:fit:256/0*U-VUPcblL0ERxmj4)
*Haar cascades | [Source](https://pyimagesearch.com/2020/06/22/turning-any-cnn-image-classifier-into-an-object-detector-with-keras-tensorflow-and-opencv/)*

At first, it **may seem** **similar to CNNs** as we **traverse a kernel** through an image to capture features.

In *Haar cascades*, this **‘kernel’** is more accurately described as a **‘feature’**, specifically, a **Haar-like feature**.

When this *‘feature’* is scrolled over the image, the algorithm performs a **summing operation** of pixel values within the **black-and-white areas** of the figure.

![Types of Haar-like features](https://miro.medium.com/v2/resize:fit:297/1*7oIhjIXJCnn6jFX4cCSyEA.png)
*Types of Haar-like features | [Source](http://www.willberger.org/cascade-haar-explained/)*

Haar-like features are simple, rectangle-shaped patterns composed of **two**, **three**, or **four** rectangles, which can be **black or white**.

Each rectangle within the **feature window** is assigned a **weight**, which is usually:

- **Positive** for white rectangles.
- **Negative** for black rectangles.

Then the algorithm sums the **pixel intensities** in each rectangle and **multiplies them by their respective weights**.

After that, it **subtracts the sum of pixel intensities** **in black rectangles from the sum in white rectangles.**

![Haar-features and sliding window](https://miro.medium.com/v2/resize:fit:700/1*qyC3kgEjtRjjmFnlG4n8LA.png)
*Haar-features and sliding window |[Source](https://ai.plainenglish.io/terminologies-used-in-face-detection-with-haar-cascade-classifier-open-cv-6346c5c926c)*

The rectangles inside the sliding window represent the **black-and-white areas** within a feature.

- **A —** Represents an **edge feature**, like the boundary between the forehead and hair.
- **B —** Represent a **line feature**, such as the eyes which have a line of bright skin above and below the darker eyelashes and iris.
- **C —** Detect a **spot feature**, such as the tip of the nose or a cheek.
- **D —** Is used to detect **diagonal features**, like the light reflection on the cheeks or the bridge of the nose.

![Haar-like features in face detection](https://miro.medium.com/v2/resize:fit:700/1*sXYy2JP3_OnSoisa33tYCg.png)
*Haar-like features in face detection | [Source](https://www.researchgate.net/figure/Haar-like-features-application_fig3_308836179)*

This algorithm is very ingenious and can be **quite effective in detecting feature**s.

However, it has the problem of being **computationally expensive** and at the beginning, it wasn´t practical in real use cases as it didn´t offer a trade-off.

To combat this, **Viola and Jones** introduced the concepts of:

- *Integral images*
- *Adaboost classifiers*
- *Cascades*

## 1.- Integral image

The integral image (also known as a summed area table) is a **data structure** that enables **fast calculation** of the sum of pixel values in **rectangular areas** of an image.

This is crucial for efficiently evaluating Haar-like features, **which rely on differences in pixel intensities across adjacent rectangular regions**.

### Creating the integral image

1.- **Initialization:** The integral image is **initialized with a border of zero**s around the original image for **simplicity of calculation**.

![Integral image process](https://miro.medium.com/v2/resize:fit:406/1*4RFgkdGxdGWr0KthrcnTTA.png)
*Integral image process | [Source](https://www.mathworks.com/help/images/integral-image.html)*

2.- **Cumulative sum across rows:** For each pixel in the original image, you **add the value of the pixel to the left in the integral image**.

3.- **Cumulative sum down columns:** Then, for each pixel, you also **add the pixel value above it in the integral image**.

4.- **Combining sums:** The value at any point ***(x, y)*** in the integral image is the sum of **all pixels above and to the left of (*x, y)***, **inclusive**, in the input image.

### # Example

![Integral image example](https://miro.medium.com/v2/resize:fit:431/1*wa_MzugxXeUexxIWOtPhrg.png)
*Integral image example | [Source](https://www.mathworks.com/help/images/integral-image.html)*

If you wanted to calculate the sum of the values in the ***2 × 2* area** in the **lower right of the input image** (bounded by the green and blue dots), you would:

1. Take the value at the **blue dot** ***(59).***
2. Subtract the values at the **green** ***(32)*** and **orange** ***(42)*** **dots**.
3. Add the value at the **brown dot** ***(15)***, because it was **subtracted twice**.

The sum would be “*59 – 32 – 42 + 15 = 0”*.

## 2.- AdaBoost for feature selection

As we discussed previously, due to computational constraints, it is impractical to use **all possible Haar-like features** for object detection.

Adaboost (Adaptive Boosting) is a **machine-learning algorithm** used to **select a small number of critical features from a large set**.

It constructs a **strong classifier as a linear combination of weak classifiers**, each corresponding to a **Haar-like feature**.

![Adaboost classifier](https://miro.medium.com/v2/resize:fit:700/0*DIzy79k_iYdqT_Ef)
*Adaboost classifier | [Source](https://www.almabetter.com/bytes/tutorials/data-science/adaboost-algorithm)*

The algorithm focuses on **examples that are hard to classify** and gives **more weight to classifiers that perform well on these difficult examples**.

> Take a look at the following article to learn more about **AdaBoost classifiers**.

> **[AdaBoost Classifier Example In Python](https://towardsdatascience.com/machine-learning-part-17-boosting-algorithms-adaboost-in-python-d00faac6c464)**
> An explanation of the AdaBoost algorithm and an example of how to implement the AdaBoost classifier in Python.

## 3.- Cascades — or stages

A cascade classifier is a multi-stage process where **each stage is a classifier** that decides whether a given region of an image **may contain the object of interest**.

Each subsequent stage is **more complex** and is only evaluated if all previous stages have **positively identified the region as potentially containing the object**.

![Cascades in Haar-like features](https://miro.medium.com/v2/resize:fit:700/0*rHPubWvj7VL2oF4C.gif)
*Cascades in Haar-like features | [Source](https://ai.plainenglish.io/terminologies-used-in-face-detection-with-haar-cascade-classifier-open-cv-6346c5c926c)*

Each stage of the cascade can reject **many negative examples** (background) using a minimal **number of features**, thus **reducing the computation** required for most of the image areas.

**Initial Stages** Early stages use a few features to **quickly eliminate large portions of the image that do not contain the object**. If a region passes all the tests in the **first stage**, it is then processed by the **next stage**, which uses **more features** for the detection

**Subsequent Stages** As a region passes through **more stages**, the **number of features used increases**, and the classification becomes more **stringent**.

Only those regions that pass through **all stages** are classified as **containing the object.**

## In Recap

The process starts with **Haar-like features**, which are **patterns of light and dark areas** used to distinguish different parts of an object.

**To identify these features** across the entire image, a **sliding window** technique is applied, **moving across the image** at various scales.

**Optimization**
Efficiency in this exhaustive search is achieved through the use of an **integral image**, which s**implifies the calculation of pixel values in a given area**.

Further optimization comes from **AdaBoost**, which selects the **most informative Haar-like features**, enhancing both the detection’s **accuracy** and **speed**.

The algorithm’s final speed and efficiency boost is provided by **cascades,** which **eliminate non-relevant areas** with simple classifiers before employing more complex classifiers for a detailed analysis of promising regions.

### Bibliography

- [https://pyimagesearch.com/2021/04/12/opencv-haar-cascades/](https://pyimagesearch.com/2021/04/12/opencv-haar-cascades/)
- [Haar Cascades, Explained. A brief introduction into Haar… | by Aditya Mittal | Analytics Vidhya | Medium](https://medium.com/analytics-vidhya/haar-cascades-explained-38210e57970d)
- [https://medium.com/r/?url=https%3A%2F%2Fwww.kaggle.com%2Fcode%2Fprashant111%2Fadaboost-classifier-tutorial](https://www.kaggle.com/code/prashant111/adaboost-classifier-tutorial)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
