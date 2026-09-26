---
title: "But what was before Convolutional Neural Networks? | Part 1"
description: "A Quick Introduction to Histograms of Oriented Gradients"
date: 2024-02-12
tags: [computer-vision, hog, machine-learning]
icon: "🧭"
cover: "/blog/covers/antes-de-las-cnn-parte-1.jpg"
topic: vision
---

*A Quick Introduction to Histograms of Oriented Gradients. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-what-was-before-convolutional-neural-networks-part-1-d654737b026a).*

![Image created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:1792/0*cGJCRRRABHCEe0ZJ)
*Image created by the author with DALL-E 3*

You're reading for free via [Jorgecardete's](https://medium.com/@jorgecardete) Friend Link. [Become a member](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fthedeephub%2Fbut-what-was-before-convolutional-neural-networks-part-1-d654737b026a&source=-----d654737b026a---------------------post_friend_link_meter--------------------) to access the best of Medium.

Member-only story

## But what was before Convolutional Neural Networks? | Part 1

## A Quick Introduction to Histograms of Oriented Gradients

The Histogram of Oriented Gradients (HOG) was introduced in **2005** by [Navneet Dalal](https://scholar.google.com/citations?user=C6UAIHEAAAAJ) and [Bill Triggs](https://scholar.google.com/citations?user=hSpEF0gAAAAJ) with the objective of **human detection**.

Their paper, *“*[*Histograms of Oriented Gradients for Human Detection*](https://ieeexplore.ieee.org/abstract/document/1467360)*”*, was presented at the [IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR)](https://ieeexplore.ieee.org/xpl/conhome/1000147/all-proceedings) and has since become **a seminal work in computer vision**.

## Histograms of Oriented Gradient — A basic notion

In general terms, HOGs are **feature descriptors** used in computer vision and image processing with the objective of **Object Detection**.

**In other words:** they are a way for computers to **understand** and **identify objects** within an image.

Imagine looking at a photo and noticing the **outlines** and **shapes** that make things **recognizable** — like the **curve of a ball** or the **angle of a chair leg**.

**HOG helps computers see these shapes** by focusing on how the **brightness** or **color** changes in different parts of the picture. It looks at **small blocks** or **patches** of the image, notes where the **sharp changes** in shadow or light occur, and **keeps track of these patterns**.

![Photo by Virender Singh on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*T0FlCuKFVJLU-Eao)
*Photo by [Virender Singh](https://unsplash.com/@virender833?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### # Feature descriptors

A feature descriptor is a representation of an image that simplifies it by extracting relevant information and throwing away the one that may not be so useful.

Typically, **this is encapsulated into a vector** (or, in some cases, a set of vectors) that describes the **characteristics** of an image or a part of an image.

Each element of this vector represents a **feature** that has been extracted from the image. These attributes can be **edges**, **corners**, **textures**, **colors**, **shapes**…

![Feature descriptor representation](https://miro.medium.com/v2/resize:fit:700/0*RVAzbv8RjzRDaZpw.png)
***Feature descriptor** representation | [Source](https://www.mdpi.com/2079-9292/9/3/391)*

> In essence, the purpose of a feature descriptor is to **transform visual information** into a form that’s easier to **analyze** and **compare**.

### # Gradients

A gradient in an image measures how much the c**olor or brightness changes from one point to another**. These changes usually happen at the **edges** of objects.

Imagine a gradient as the **slope of a hill**. The **steeper** the hill (or the more abrupt the change in brightness), the **stronger** the gradient.

![Differences in the intensity of the gradient](https://miro.medium.com/v2/resize:fit:560/0*8YZxtUqw1fq_Lkr5.png)
*Differences in the **intensity of the gradient** | [Source](https://www.analyticsvidhya.com/blog/2019/09/feature-engineering-images-introduction-hog-feature-descriptor/)*

In the image above, this can be seen quite clearly.

1. In the *first figure*, the highlighted square will be **very weak** because there is **no change in color**.
2. In the *second figure*, the square indicates a **gradient change in one of the edges** as the **color varies**.
3. In the *third figure*, we can see a **more abrupt change in the gradient** which differentiates the **dog’s head and ear**.

## Steps for calculating HOG

### 1.- Dividing the image

In the first place, the image is split into small squares, called *‘cells’.*

They are like **little tiles** that make up the picture.

These cells are usually **square** and of a **fixed size**, for example, *8* **×** *8* or *16* **×** *16* pixels.

> The choice of cell size affects the **granularity of the HOG descriptor**; smaller cells capture **more detail** but result in **higher-dimensional feature vectors**.

### 2.- Calculating gradients

For each cell, we calculate the **direction** and **strength** of the gradients to figure out which way they’re **sloping** and **how steep they are**.

**## Gradient direction** This is calculated by finding **the change in intensity** or color in both the ***x* (horizontal) and *y* (vertical)** directions.

The gradient direction is given by:

*θ = arctan(Δy / Δx)*

**## Gradient magnitude** The magnitude (how strong or weak the edge is) is also calculated for each cell, usually by taking the **square root of the sum of the squares of the changes in x and y**.

*|G| = √(Δx² + Δy²)*

### 3.- Creating histograms

For every cell, a histogram is made showing the frequency of **gradient directions**.

Each bar in the histogram represents an **angle of the gradient**. The **length of the bar** shows **how often that angle appears in the cell**.

![Histogram of oriented gradients](https://miro.medium.com/v2/resize:fit:597/0*Zs8z_vp_1fhWBEsQ.gif)
*Histogram of oriented gradients | [Source](https://customers.pyimagesearch.com/lesson-sample-histogram-of-oriented-gradients-and-car-logo-recognition/)*

### 4.- Normalizing for Better Accuracy

To make sure that **variations in lighting or shadows** don’t **throw off the HOG descriptor**, the **histograms are normalized**.

This means **adjusting the histograms** so they represent the **same thing under different conditions**.

Some common methods of normalization include:

- L2-norm
- L1-norm
- L1-sqrt
- L2-Hys

> **[HOG(Histogram of Oriented Gradients)](https://towardsdatascience.com/hog-histogram-of-oriented-gradients-67ecd887675f)**
> A detailed Description of Histogram of Oriented Gradients with from scratch as well as library implementation in…

### 5.- Combining Everything

All the histograms from all the cells **are put together into one big feature descriptor**.

> This is like gathering all the hill-slope data from all over the image and putting it into one map.

### 6.- Using HOG for Detection

Finally, this combined histogram is used as a *‘fingerprint’* to **identify objects**.

> When the computer sees a new image, it creates a HOG descriptor for it and then checks if this ‘fingerprint’ matches the ‘fingerprint’ of known objects.

## An example of the whole process (with Python)

I will be using this image from [Karsten Winegear](https://unsplash.com/@karsten116?utm_source=medium&utm_medium=referral) on Unsplash. Feel free to download it if you want to follow the process.

![Photo by Karsten Winegeart on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*ZIEa6mOph4Yzq4ou)
*Photo by [Karsten Winegeart](https://unsplash.com/@karsten116?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### 1.- Convert into grayscale and divide the image

The image will be divided into *16* ***×*** *16* cells after being **converted to grayscale**.

> I chose this measure because it is quite standard and will fit well with the size of this photo.

![Image converted into grayscale and segmented into 16x16 cells](https://miro.medium.com/v2/resize:fit:700/0*vNPRaSnSwBrETEXS)
*Image converted into **grayscale** and segmented into **16x16** cells | (Modified by the author)*

### 1.1.- Python code

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the image
image_path = 'path_to_your_image.png'  # Replace with your image path
image = cv2.imread(image_path)

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Update the cell size to 16x16 pixels
cell_width, cell_height = 16, 16 

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Create an image copy to draw the cells
image_with_cells = np.repeat(gray_image[:, :, np.newaxis], 3, axis=2)

# Draw the grid for cells on the image
num_cells_x = gray_image.shape[1] // cell_width
num_cells_y = gray_image.shape[0] // cell_height

# Draw vertical lines
for i in range(num_cells_x + 1):
    cv2.line(image_with_cells, (i * cell_width, 0), (i * cell_width, gray_image.shape[0]), (0, 255, 0), 1)

# Draw horizontal lines
for i in range(num_cells_y + 1):
    cv2.line(image_with_cells, (0, i * cell_height), (gray_image.shape[1], i * cell_height), (0, 255, 0), 1)

# Display the grayscale image with the cell grid overlay
plt.figure(figsize=(10, 10))
plt.title('Grayscale Image with 16x16 Cells')
plt.imshow(image_with_cells, cmap='gray')
plt.axis('off')  # Turn off axis numbers
plt.show()
```

### 2. Calculating the gradient

Now we can calculate the respective gradient **magnitude** and **direction of the image**.

Remember that the gradient **will be calculated for each cell, not for each pixel.**

Don´t confuse the **squares** in the figure below with **pixels**, they are **cell regions**!

![Gradient magnitude and direction of the original image](https://miro.medium.com/v2/resize:fit:1000/0*Flpy_9rMBd-CZiEE)
*Gradient **magnitude** and **direction** of the original image | (Modified by the author)*

**# Cell gradient magnitude** Brighter areas indicate **stronger gradients**, which correspond to **more significant changes in intensity**.

Through the **magnitude of the gradient**, we can clearly see the figure of the dog.

**# Cell gradient direction** The variation in color across the image indicates the **various directions** in which the **edges** and **textures** in the original image **are oriented**.

The outline of the dog appears to be represented by the **blue regions**, indicating that the **gradient directions in these areas are similar**, which usually happens along **continuous edges** or **boundaries**.

The **background seems to be relatively consistent in color**, implying that it doesn’t have **strong** or **varying gradients.**

### 2.1.- Python code

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the image
image_path = 'path_to_your_image.png'  # Replace with your image path
image = cv2.imread(image_path)

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Parameters for the cell size
cell_width, cell_height = 16, 16

# Calculate gradients using the Sobel operator
grad_x = cv2.Sobel(gray_image, cv2.CV_32F, 1, 0, ksize=1)
grad_y = cv2.Sobel(gray_image, cv2.CV_32F, 0, 1, ksize=1)

# Compute the gradient magnitude and direction
magnitude = cv2.magnitude(grad_x, grad_y)
direction = cv2.phase(grad_x, grad_y, angleInDegrees=True)

# Initialize an array to hold the gradient magnitude and direction for each cell
cell_magnitude = np.zeros((num_cells_y, num_cells_x))
cell_direction = np.zeros((num_cells_y, num_cells_x))

# Calculate the gradient magnitude and direction for each cell
for i in range(num_cells_y):
    for j in range(num_cells_x):
        cell_grad_x = grad_x[i*cell_height:(i+1)*cell_height, j*cell_width:(j+1)*cell_width]
        cell_grad_y = grad_y[i*cell_height:(i+1)*cell_height, j*cell_width:(j+1)*cell_width]
        cell_magnitude[i, j] = np.sum(cv2.magnitude(cell_grad_x, cell_grad_y))
        cell_direction[i, j] = np.sum(cv2.phase(cell_grad_x, cell_grad_y, angleInDegrees=True))

# Reshape the arrays for visualization purposes
cell_magnitude = cell_magnitude.repeat(cell_height, axis=0).repeat(cell_width, axis=1)
cell_direction = cell_direction.repeat(cell_height, axis=0).repeat(cell_width, axis=1)

# Plotting the gradient magnitudes and directions for each cell
plt.figure(figsize=(20, 10))

plt.subplot(121)
plt.title('Cell Gradient Magnitude')
plt.imshow(cell_magnitude, cmap='hot')
plt.axis('off')

plt.subplot(122)
plt.title('Cell Gradient Direction')
plt.imshow(cell_direction, cmap='hsv')  # HSV color map to represent angle
plt.axis('off')

plt.tight_layout()
plt.show()
```

### 3.- Plotting the histogram

Once we have calculated the **gradient intensity and direction** of the image the next step is calculating the *histogram of gradient orientations* for **every cell** in which we divided the image.

> I´ll use a higher **width** for displaying the image so that the figure can be seen more clearly.

![Histogram of the gradient for each cell](https://miro.medium.com/v2/resize:fit:1000/1*wIfijDaTcs4RPDvrXkk82w.png)
***Histogram** of the gradient for each cell | (Modified by the author)*

The shape of the dog is quite **notable**.

The **blue squares**, which stand out against the *more uniform gray histograms*, indicate areas with a **higher concentration** of **edges** or a specific **orientation of features**.

This indicates where the **dog’s features** **are** **most prominent**.

### 3.1.- Python code

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the image
image_path = 'path_to_your_image.png'  # Replace with your image path
image = cv2.imread(image_path)

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Calculate gradients using the Sobel operator
grad_x = cv2.Sobel(gray_image, cv2.CV_32F, 1, 0, ksize=1)
grad_y = cv2.Sobel(gray_image, cv2.CV_32F, 0, 1, ksize=1)

# Compute the gradient magnitude and direction
magnitude = cv2.magnitude(grad_x, grad_y)
direction = cv2.phase(grad_x, grad_y, angleInDegrees=True)

# Define the cell size and number of bins for the histogram
cell_size = (16, 16)  # Cell size in pixels (height, width)
nbins = 9  # Number of bins for the histograms
num_cells_x = int(gray_image.shape[1] / cell_size[1])
num_cells_y = int(gray_image.shape[0] / cell_size[0])

# Initialize an array to hold the histogram for each cell
histograms = np.zeros((num_cells_y, num_cells_x, nbins))

# Calculate the histogram for each cell
for i in range(num_cells_y):
    for j in range(num_cells_x):
        cell_direction = direction[i*cell_size[0]:(i+1)*cell_size[0], j*cell_size[1]:(j+1)*cell_size[1]]
        cell_magnitude = magnitude[i*cell_size[0]:(i+1)*cell_size[0], j*cell_size[1]:(j+1)*cell_size[1]]
        hist, _ = np.histogram(cell_direction, bins=nbins, range=(0, 180), weights=cell_magnitude)
        histograms[i, j, :] = hist

# Aggregate all cell histograms into a single histogram
aggregated_histogram = np.sum(histograms, axis=(0, 1))

# Plot the aggregated histogram
plt.figure(figsize=(10, 4))
plt.bar(np.arange(nbins), aggregated_histogram, align='center', width=0.8)
plt.title('Aggregated Histogram of Oriented Gradients for the Entire Image')
plt.xlabel('Orientation Bin')
plt.ylabel('Magnitude')
plt.xticks(np.arange(nbins))
plt.show()
```

### 4.- Normalize the histograms and display the results

The last step is to **normalize the histograms** to make the descriptor more **robust to changes** in **light** and **shadowing**.

> I will use the [L2-Hys](https://en.wikipedia.org/wiki/Histogram_of_oriented_gradients) method for normalizing the image.

In the next figure, **the final result can be visualized:**

![Original image in grayscale vs HOG image](https://miro.medium.com/v2/resize:fit:1000/1*76uWjS941FAi7Z_wg6OO6g.png)
*Original image in grayscale vs **HOG image** | (Modified by the author)*

### 4.1.- Python code

```python
from skimage.feature import hog
from skimage import exposure
import matplotlib.pyplot as plt
import cv2

# Load the image from file
image_path = '/path/to/your/image.png'  # Replace with your actual image path

image = cv2.imread(image_path)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Compute HOG features and HOG image
fd, hog_image = hog(gray_image, orientations=8, pixels_per_cell=(16, 16),
                    cells_per_block=(1, 1), visualize=True, block_norm='L2-Hys')

# Rescale histogram for better display
hog_image_rescaled = exposure.rescale_intensity(hog_image, in_range=(0, 10))

# Plot the original and HOG images
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6), sharex=True, sharey=True)
ax1.axis('off')
ax1.imshow(gray_image, cmap=plt.cm.gray)
ax1.set_title('Original Image')
ax2.axis('off')
ax2.imshow(hog_image_rescaled, cmap=plt.cm.gray)
ax2.set_title('HOG Image')
plt.show()
```

### Bibliography

- [https://towardsdatascience.com/hog-histogram-of-oriented-gradients-67ecd887675f](https://towardsdatascience.com/hog-histogram-of-oriented-gradients-67ecd887675f)
- [https://medium.com/analytics-vidhya/a-gentle-introduction-into-the-histogram-of-oriented-gradients-fdee9ed8f2aa](https://medium.com/analytics-vidhya/a-gentle-introduction-into-the-histogram-of-oriented-gradients-fdee9ed8f2aa)
- [https://learnopencv.com/histogram-of-oriented-gradients/](https://learnopencv.com/histogram-of-oriented-gradients/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
