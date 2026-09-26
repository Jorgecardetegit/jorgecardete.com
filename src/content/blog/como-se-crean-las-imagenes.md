---
title: "But how are images created?"
description: "A quick introduction to pixels and color channels"
date: 2023-12-25
tags: [computer-vision, image-processing]
icon: "🎨"
cover: "/blog/covers/como-se-crean-las-imagenes.jpg"
topic: vision
---

*A quick introduction to pixels and color channels. Publicado originalmente en [Long. Sweet. Valuable.](https://medium.com/long-sweet-valuable/but-how-are-images-created-2186a759d7a8).*

![Created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:700/1*F9rh_VB9yXtLLRAwTq_9zQ.png)
*Created by the author with DALL-E 3*

Nowadays images are everywhere, we could even say that our reality is becoming pixels.

> How many hours do you dedicate to television, your computer, or your mobile device?

According to research commissioned by [Vision Direct](https://www.visiondirect.co.uk/blog/look-after-your-eye-health-at-home/), the average U.S. adult will spend the equivalent of **44 years** of their life staring at screens.

So we could certainly state that our reality is being “pixelized”…

**But what is really a pixel?** Take a look at this gray-scale image:

![Gray-scale image](https://miro.medium.com/v2/resize:fit:697/1*U1xhWvOO8KNtjjW8kKR2tw.png)
*Gray-scale image | [Source](https://stackoverflow.com/questions/51818193/problems-with-using-a-rough-greyscale-algorithm)*

At first, it may seem quite realistic, but let´s see what happens if we start zooming in (pay attention to the eye of the bird).

![Augmenting gray-scale image](https://miro.medium.com/v2/resize:fit:700/1*kEF-MU4t_uy54WBs84FdpA.gif)
*Augmenting gray-scale image | Created by the author*

As you can see as we dive deeper inside the image, it starts getting clearer that is composed of little squares (this is most notable in the eye of the bird because it's darker).

**These squares are pixels!**

You can think of a pixel as a number inside a big matrix that represents an image.

Let´s see a visual example:

![Gray-scale image pixels](https://miro.medium.com/v2/resize:fit:1000/1*Jk19VScSlhTfuiIZPlQXug.png)
*Gray-scale image pixels | [Source](https://setosa.io/ev/image-kernels/)*

In this image, each pixel has a value between 0 and 255 representing the color intensity.

- 0 → Completely black.
- 255 → Completely white.

> This figure is extracted from [Setosa](https://setosa.io/ev/image-kernels/), you can use this interactive tool to scroll around the image. You will see that the pixels in the lighter points of the image have the highest values.

In summary, **Gray-scales** images are composed of:

> A matrix of pixels that have values between 0 and 255 representing the black intensity at a certain point.

### Color images

Color images are a combination of 3 channels:

- Red
- Green
- Blue

By combining these three colors, you can produce any imaginable shade.

![RGB channel](https://miro.medium.com/v2/resize:fit:176/1*fNzgq7RBKkVsD-zeFUkyBA.png)
*RGB channel | [Source](https://www.freepik.es/vector-premium/vector-mezcla-colores-rgb-cmyk-superposicion-color-rgb-cmyk_34957480.htm)*

This type of configuration is known as RGB (**R**ed, **G**reen, and **B**lue).

> **[RGB color model](https://www.officinaturini.com/rgb.html)**
> From Wikipedia, the free encyclopedia. The RGB color model is an additive color model in which red, green, and blue…

Here instead of one matrix, we have 3 matrices (each for one color). The concept is very similar to gray-scale images.

![RGB vs Gray-Scale image](https://miro.medium.com/v2/resize:fit:685/0*e6scEEg6E4xn8Z45.png)
*RGB vs Gray-Scale image | [Source](https://link.springer.com/article/10.1007/s42979-023-01693-5)*

Every matrix consists of pixels with values ranging from 0 to 255. 
At 0, the pixel is **entirely black**, while at 255, it reaches the **peak intensity of that particular color**.

Let´s see a more visual example to understand this. Take a look at the following picture and try to visualize each point as a blend of Red, Green, and Blue pixels.

![Digital Image](https://miro.medium.com/v2/resize:fit:281/0*v1xH_Ew6wdWDnXKI.png)
*Digital Image | [Source](https://www.evlabs.io/blog/digital-art-python-image-decomposition)*

In reality, what we are seeing in this image is a combination of the RGB channels:

![Image Decomposed into RGB channels](https://miro.medium.com/v2/resize:fit:700/0*GSKYcrajXOkRhWfd.png)
*Image Decomposed into RGB channels | [Source](https://www.evlabs.io/blog/digital-art-python-image-decomposition)*

Each of these configurations is composed of pixels that range from 0 to 255. Once each of these channels has been defined they are combined to create the original image.

Some images may contain a higher volume of Red or perhaps most of the pixels may be from the Blue and Green channels…

> In essence, the color configuration will depend on the specific characteristics of each image.

> You can use this [tool](https://pinetools.com/rgb-channels-image) from **Pinetools** to decompose your images, try uploading a color image, and see how is broken down in RGB.

### And what about the pixel values, why do they range between 0 and 255?

This range of values is a consequence of using **8 bits** to represent each color channel. Here’s why:

In digital imaging, the color for each pixel is often represented in binary code. 
A **bit** is the basic unit of information in computing, which can have a value of either 0 or 1. The more bits you use, the more values you can represent.

![Bit representation](https://miro.medium.com/v2/resize:fit:404/1*AI9ES0TEXvEqicmlKf_oQw.png)
*Bit representation | [Source](https://www.eeeguide.com/binary-number-system-definition-conversions-examples/)*

**8 Bits Per Channel** Each color channel (red, green, and blue) in a typical digital image is allotted 8 bits. This is a standard format known as **24-bit color** (8 bits for red, 8 bits for green, and 8 bits for blue).

With 8 bits, you can represent **2⁸** different values. This means you can have **256 distinct values** in each color channel, ranging from 0 to 255.

> ☣️ In digital systems, counting typically starts from zero, not one. So, when you count from 0 to 255, you are counting 256 numbers.

> This magic number allows for over 16 million different color combinations *(256 red* × *256 green* × *256 blue)* while still keeping file sizes manageable.

## Human Vision and Image Perception

To finish this article, I will give some interesting insights into how we, humans, perceive images.

![Photoreceptor cell](https://miro.medium.com/v2/resize:fit:700/0*DPdMpK1LG57SEW0c)
*Photoreceptor cell | [Source](https://onlineresize.club/2021-club.html#google_vignette)*

It’s incredibly similar the way our eyes work to how digital color images are created.

Our perception is based on the **three types of cone cells** we have in our eyes:

- **S (short-wavelength) cones,** which are most sensitive to light perceived as blue.
- **M (medium-wavelength) cones,** which are most sensitive to light perceived as green.
- **L (long-wavelength) cones**, which are most sensitive to light perceived as red.

When light enters the eye, these cones are energized to different degrees depending on the wavelength of the light. The brain then processes these signals to create the perception of different colors.

For example, when both **M** and **L** cones are stimulated equally, we perceive the color yellow.

This process is almost identical to RGB matrices in digital images.

### Bibliography:

- [https://www.optometrists.org/general-practice-optometry/guide-to-eye-health/how-does-the-eye-work/](https://loremartis.com/2023-07-25/shades-of-green/)
- [https://www.evlabs.io/blog/digital-art-python-image-decomposition](https://www.evlabs.io/blog/digital-art-python-image-decomposition)
- [https://www.imaios.com/en/e-anatomy/anatomical-structure/cone-cell-133706252](https://www.verywellhealth.com/eye-cones-5088699)

*Thanks for reading! Follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*
