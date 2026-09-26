---
title: "ConvNeXt: In Search of the Last Convolutional Layer"
description: "ViTs are precise but not so efficient and CNNs are efficient but not so precise. Let’s create a precise and efficient neural network"
date: 2024-01-01
tags: [deep-learning, cnn, computer-vision]
icon: "🧩"
order: 4
cover: "/blog/covers/convnext.jpg"
topic: vision
---

*ViTs are precise but not so efficient and CNNs are efficient but not so precise. Let’s create a precise and efficient neural network. Publicado originalmente en [Level Up Coding](https://medium.com/gitconnected/convnext-in-search-of-the-last-convolutional-layer-da801d9f123b).*

![Created by the author with Dall-E 3](https://miro.medium.com/v2/resize:fit:700/0*akgkP9W8_ybtRaAc)
*Created by the author with Dall-E 3*

> The “Roaring 20s” of visual recognition began with the introduction of **Vision Transformers (ViTs)**, which quickly superseded ConvNets as the state-of-the-art image classification model.A vanilla ViT, on the other hand, faces difficulties when applied to general computer vision tasks such as **object detection** and **semantic segmentation**. It is the **hierarchical Transformers** (e.g., Swin Transformers) that reintroduced several ConvNet priors, making Transformers practically viable as a generic vision backbone and demonstrating remarkable performance on a wide variety of vision tasks [1].

The 2010s were marked by the progress of deep learning. An epoch characterized by the renaissance of Convolutional Neural Networks.

The invention of back-propagation-trained ConvNets dates back to the 1980s, presented in the academic paper: 
[Handwritten Digit Recognition with a Back-Propagation Network.](https://proceedings.neurips.cc/paper/1989/file/53c3bce66e43be4f209556518c2fcb54-Paper.pdf)

![Source: Orginal paper.](https://miro.medium.com/v2/resize:fit:630/1*u2vhe1tj9SB-RY5n4HK70A.png)
*Source: [Orginal paper](https://proceedings.neurips.cc/paper/1989/file/53c3bce66e43be4f209556518c2fcb54-Paper.pdf).*

Although the algorithm was introduced in 1989, it was not until late 2012 that its true potential for visual feature learning was revealed in the [ImageNet Large Scale Visual Recognition Challenge (ILSVRC).](https://arxiv.org/pdf/1409.0575.pdf)

The [**AlexNet**](https://proceedings.neurips.cc/paper/1989/file/53c3bce66e43be4f209556518c2fcb54-Paper.pdf) architecture, developed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton revolutionized the field. Outperforming traditional algorithms [by achieving a top-5 error rate of 15.3%, which was significantly lower than the 26.2% of its closest competitor.](https://proceedings.neurips.cc/paper/1989/file/53c3bce66e43be4f209556518c2fcb54-Paper.pdf)

The field has since evolved at a rapid speed, and representative ConvNets architectures have been developed:

- [VGGNet](https://arxiv.org/pdf/1409.1556.pdf)
- [Inception](https://arxiv.org/pdf/1409.4842.pdf)
- [ResNeXt](https://arxiv.org/pdf/1512.03385.pdf)
- [DenseNet](https://arxiv.org/pdf/1608.06993.pdf)
- [MobileNet](https://arxiv.org/pdf/1704.04861.pdf)
- [EfficientNet](https://arxiv.org/pdf/1905.11946.pdf)
- [RegNet](https://arxiv.org/pdf/2101.00590.pdf)

> **[Best deep CNN architectures and their principles: from AlexNet to EfficientNet | AI Summer](https://theaisummer.com/cnn-architectures/)**
> How convolutional neural networks work? What are the principles behind designing one CNN architecture? How did we go…

> But why CNNs have become so popular?

From the ConvNeXt paper:

> ConvNets have several built-in **inductive biases** that make them well-suited to a wide variety of computer vision applications. The most important one is **translation equivariance**, which is a desirable property for tasks like object detection. ConvNets are also inherently efficient due to the fact that when used in a **sliding-window manner**, the computations are shared [1].

### Inductive bias

> Inductive bias refers to the assumptions a learning algorithm uses to make predictions about unseen data. These biases guide the learning process and help the model generalize better to new information.

![Photo by Loic Leray on Unsplash.](https://miro.medium.com/v2/resize:fit:700/0*w2L-O5u9-ylS3ntx.jpeg)
*Photo by [Loic Leray](https://unsplash.com/@loicleray?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balance?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).*

CNNs have the following inductive biases:

1. **Locality:** ConvNets assume that local regions in an image are more relevant for understanding the image’s content. This is why they use **small filters (kernels)** that convolve over the image. 
These filters capture local patterns like **edges**, **textures**, and **colors**, which are fundamental building blocks of higher-level features.
2. **Translation Equivariance:** If an object in an image moves, its representation in the feature map moves in the same way. This enables CNNs to detect objects regardless of their position.
3. **Hierarchical Structure:** Convolutional Networks are designed to learn features hierarchically. The first layers retrieve low-level features (like edges), and as you dive deeper into the structure they capture more complex and abstract characteristics.
4. **Shared Weights and Spatial Invariance:** The same filter is applied across the image, reducing the amount of parameters and making the network more efficient.
The assumption here is that useful features (edges, textures, or patterns) can appear in different parts of an image.

> **[A fAIry tale of the Inductive Bias](https://towardsdatascience.com/a-fairy-tale-of-the-inductive-bias-d418fc61726c)**
> Do we need inductive bias? How simple models can reach the performance of complex models

**In recap:** 
ConvNets capture **local patterns** through convolutional filters, can recognize objects regardless of their position thanks to **translation equivariance** and **spatial invariance**, learn features **hierarchically** (from simple to complex), and employ **weight sharing** for efficiency.

![Translation equivariance](https://miro.medium.com/v2/resize:fit:363/1*Vey7APXPkJxCnekEwpCXVw.png)
*Translation equivariance | [Source](https://arxiv.org/pdf/1612.04642.pdf).*

### The rise of Vision Transfomers (ViTs)

Around the **2010s**, neural network design for **Natural Language Processing (NLP)** took a very different path from computer vision, as a new generation of models known as **transformers** replaced completely recurrent neural networks (RNNs) and its variants**.**

![Photo by Jack Anstey on Unsplash.](https://miro.medium.com/v2/resize:fit:700/0*rsEf2afxwV__yjbh)
*Photo by [Jack Anstey](https://unsplash.com/@jack_anstey?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral).*

Despite the differences between **language** and **vision** domains, the two fields surprisingly converged in **2020**.

> A new variant of traditional transformers was adapted for analyzing images. The **Vision Transformer**.

Completely altering the computer vision landscape, ViTs were able to outperform CNNs in many tasks due to their ability to **capture global context**, **scalability with large datasets**, and **flexibility** in handling different input sizes.

![Types of Vision Transformer architectures](https://miro.medium.com/v2/resize:fit:700/1*7qKK9q23xTaIotBzYx8_Rg.png)
*Types of Vision Transformer architectures | [Source](https://arxiv.org/pdf/2203.01536.pdf%E2%80%8B).*

> How do Vision Transformers work?

To assess the importance of various parts of an image, vision transformers use [**self-attention mechanisms**](https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a) allowing them to recognize complex relationships.

In areas where an understanding of the bigger picture is important, this **global perspective** will be helpful as opposed to the **local CNN focus**.

In addition, ViTs are capable of adapting to varying resolutions and can be used more effectively in images with a higher resolution.

![Vision Transformer (ViT) representation](https://miro.medium.com/v2/resize:fit:612/1*R4mrVsPGN9LoN1POBT24VA.png)
*Vision Transformer (ViT) representation | [Source](https://arxiv.org/pdf/2010.11929v2.pdf)*

> ViTs were introduced in the famous paper: [AN IMAGE IS WORTH 16X16 WORDS](https://arxiv.org/pdf/2010.11929.pdf)

> **[Vision Transformers [ViT]: A very basic introduction](https://medium.com/data-and-beyond/vision-transformers-vit-a-very-basic-introduction-6cd29a7e56f3)**
> A Simple and basic understanding of how transformers can be used in images

### Integration of ViTs and CNNs (Hierarchical transformers)

The biggest problem within ViTs is its **global attention design**, which has a **quadratic complexity** to the input size (as the size of the input image increases, the number of calculations grows exponentially).

This might not be a challenge for ImageNet classification tasks but becomes a notable problem with higher-resolution inputs.

**Hierarchical Transformers** were designed to bridge this gap by employing a hybrid approach.

> The **sliding window** strategy (attention within local windows).

You can think of it as a kernel that travels through the image, but instead of performing **convolution operations**, it applies **self-attention mechanisms** in each step.

![Swin Transformer](https://miro.medium.com/v2/resize:fit:700/0*cGEPmWY3Sl3fgPzq.png)
*Swin Transformer | [Source](https://arxiv.org/pdf/2103.14030.pdf).*

The [**Swin Transformer**](https://arxiv.org/pdf/2103.14030.pdf) is a representative milestone in developing hierarchical ViTs. It demonstrated that transformers can achieve state-of-the-art performance across many computer vision tasks and not only image classification.

Swin Transformer’s success and rapid adoption also revealed one thing:

> [The essence of convolution is not becoming irrelevant; rather, it remains much desired and has never faded.](https://arxiv.org/pdf/2201.03545.pdf)

## ConvNeXt Design

The design process of ConvNeXt was driven by one key question:

> *How do design decisions in Transformers impact ConvNets performance?*

The strategy is defined in the original paper in the following way:

> We provide a trajectory going **from a ResNet to a ConvNet** that bears a resemblance to Transformers. We consider two model sizes in terms of **FLOPs**, one is the **ResNet-50 / Swin-T** regime with **FLOPs around 4.5×10⁹** and the other is the **ResNet-200 / Swin-B** regime which has **FLOPs around 15.0 × 10⁹** [1].

So basically, the strategy was to modify a traditional **ResNet** architecture by integrating it with certain **ViTs (e.g. Swin)** characteristics.

> Why **ResNets and Swin Transformers?**

**ResNet-50** ResNet has been a foundational model in computer vision, marking a significant advancement with its [**Residual Connections**](https://medium.com/r?url=https%3A%2F%2Ftowardsdatascience.com%2Fwhat-is-residual-connection-efb07cab0d55).

The choice to start with a standard **ResNet** model, such as **ResNet-50** allowed the authors to explore how modernizing a traditional and well-understood architecture could lead to improvements akin to **more recent** **Transformer-based models**.

![ResNet-50 Architecture](https://miro.medium.com/v2/resize:fit:700/0*KD2qGzHgYAvMeZIE.png)
*ResNet-50 Architecture | [Source](https://github.com/JananiSBabu/ResNet50_From_Scratch_Tensorflow).*

**Swin Transformer**
The Swin transformer, representing a modern approach in the ViTs field, was chosen as a reference due to its **similarity in size and performance to ResNet-50**.

> **[A Comprehensive Guide to Microsoft’s Swin Transformer](https://towardsdatascience.com/a-comprehensive-guide-to-swin-transformer-64965f89d14c)**
> In-depth Explanation and Animations

The **Swin-T**, a small version of the Swin Transformer, has similar **GFLOPS** to **ResNet-50** but offers **higher accuracy**, making it an ideal model for comparison.

![Swin Transformer review](https://miro.medium.com/v2/resize:fit:700/0*uB4GOQw44u0GtV6W.png)
*Swin Transformer review | [Source](https://github.com/microsoft/Swin-Transformer).*

**What are FLOPs?** FLOPs (Floating Point Operations per Second) measure the number of floating-point calculations a computer can perform in one second. 
A **floating-point operation** is any mathematical calculation like addition, subtraction, multiplication, or division.

> High FLOPs indicate a computationally intensive model, which might require more processing power and energy.

**GFLOPs (Giga Floating Point Operations per Second)** is a more specific term that implies a specific scale (billions of GFLOPs). It is commonly used to compare the performance of different algorithms at a higher scale.

*(e.g. When we say a model has 3.7 GFLOPs, it means the model’s computations involve 3.7 billion operations each second it’s running).*

## Model development

The chart below represents the whole process with all the transformations applied to the original ResNet-50.

In each step, the accuracy and the GFLOPs of the model change. After the final phase, there is a **comparison with the Swin-T model**.

*(The results shown are from the* ***ResNet-50*** *for simplicity reasons. Check Appendix* ***C*** *of the* [*original paper*](https://arxiv.org/pdf/2201.03545.pdf) *for the results of the* ***ResNet-200****)*.

![Transformations applied to the original ResNet](https://miro.medium.com/v2/resize:fit:511/1*xsvyof6ZxJG_Ob7NSOy2rA.png)
*Transformations applied to the original ResNet | [Source](https://arxiv.org/pdf/2201.03545.pdf).*

### 1.- Macro design

**1.1.- Stage ratio**

> The term **“ratio”** is used to describe how computation tasks are divided among a neural network.

[In ResNet’s design, the computation distribution is largely **empirical**](https://arxiv.org/pdf/1512.03385.pdf) [2]. That is to say, rather than theoretical models, the development of the architecture was based on experimental data and observation.

Traditional ResNets have a ratio of **(3:4:6:3)** [2].

On the other hand, transformers have a more defined ratio for distributing computational resources, like **1:1:3:1** in Swin-T [3], where each stage is balanced except for the third, which is heavier.

> Following the design, we adjust the number of blocks in each stage from (3, 4, 6, 3) in ResNet-50 to (3, 3, 9, 3). This improves the model accuracy from 78.8% to 79.4% [1].

![Change in the ratio (3, 4, 6, 3) → (3, 3, 9, 3)](https://miro.medium.com/v2/resize:fit:700/1*iTnw9autMeMmTxvhLVqd5w.png)
*Change in the ratio (3, 4, 6, 3) → (3, 3, 9, 3) | [Source](https://github.com/JananiSBabu/ResNet50_From_Scratch_Tensorflow) — edited by the author.*

**1.2.- Stem cell**

> The “stem” in a neural network refers to the initial layers that first process the input image.

In **ResNets**, the initial layer is usually a **convolutional layer**, which reduces the image size while extracting initial features.

In contrast, **Vision Transformers** begin with a **“patchify”** step, downsampling the image by dividing it into smaller patches.

![“Patchify” layer representation](https://miro.medium.com/v2/resize:fit:700/1*XSdxKtmMspbwEa0fo64rNQ.png)
*“Patchify” layer representation | [Source](https://arxiv.org/pdf/2307.06304.pdf).*

The ConvNeXt model adopts this approach by using a **patchify layer** which was implemented using a **4×4**, **stride** **4** convolutional layer.

> This change simplifies the input processing and slightly improves the model’s accuracy (79.4% → 79.5%), suggesting that a streamlined initial processing stage can be effective, despite its simplicity compared to the original ResNet stem design [1].

### 2.- ResNeXt-ify

ResNeXt is a neural network architecture that extends the principles of **residual networks** by incorporating the concept of ‘**grouped convolutions’**.

> [The key idea in ResNeXt is to have a set of parallel convolutions within each block of the network. This design allows the model to increase its width and capacity while keeping the computational complexity manageable [4].](https://arxiv.org/pdf/1611.05431.pdf)

![Grouped convolution](https://miro.medium.com/v2/resize:fit:351/1*BaFBxquOU6oUGcUr02m3ZQ.png)
*Grouped convolution | [Source](https://arxiv.org/pdf/1906.03657.pdf).*

ConvNeXt incorporates this idea in its architecture with **depthwise convolutions,** a special case of grouped convolution where:

> **Number of groups = Number of channels**

![Types of grouped convolutions (depthwise convs. were popularized by MobileNet and Xception)](https://miro.medium.com/v2/resize:fit:474/0*-H1_ONyyBp4C5NTl)
*Types of grouped convolutions (depthwise convs. were popularized by [MobileNet](https://arxiv.org/pdf/1704.04861.pdf) and [Xception](https://arxiv.org/pdf/1610.02357.pdf)) | [Source](https://www.researchgate.net/figure/A-depthwise-and-a-pointwise-convolutions_fig2_333506478).*

> Following the strategy proposed in ResNeXt, **we increase the network width to the same number of channels as Swin-T’s (from 64 to 96)**. This brings the network performance to **80.5%** with **increased FLOPs (5.3G)** [1].

> **[Understanding Depthwise Separable Convolutions and the efficiency of MobileNets](https://towardsdatascience.com/understanding-depthwise-separable-convolutions-and-the-efficiency-of-mobilenets-6de3d6b62503)**
> Explanation of MobileNets and Depthwise Separable Convolutions

### 3.- Inverted Bottleneck

In a **standard bottleneck**, the number of channels of the input is first reduced and then expanded within the network block.

An **inverted bottleneck**, on the other hand, starts with a narrower input, expands it to a wider internal dimension for intermediate processing, and then compresses it back to a narrower output.

![Inverted bottleneck](https://miro.medium.com/v2/resize:fit:700/0*xoRIIlo9CftxQMnO.png)
*Inverted bottleneck | [Source](https://github.com/TenTen-Teng/MobileNet-V2).*

Transformers often use an inverted bottleneck design where the hidden dimension inside a block (specifically the MLP — Multilayer Perceptron block) is significantly larger than the input dimension.

This design has some parallels in **ConvNets**, particularly in architectures like [**MobileNetV2**](https://arxiv.org/abs/1801.04381), where it has become a common feature to increase the internal dimensions of a network layer before compressing it back down [5].

> Despite the increased FLOPs for the depthwise convolution layer, this change reduces the whole network FLOPs to 4.6G, due to the significant FLOPs reduction in the downsampling residual blocks’ shortcut 1×1 conv layer. Interestingly, this results in slightly improved performance (80.5% → 80.6%) [1].

### 4.- Large Kernel

This is one of the most interesting parts, to understand it better let´s make a recap about the evolution of kernels in computer vision.

> A quick summary of kernels in CNNs and ViTs

![Photo by Andrew Neel on Unsplash.](https://miro.medium.com/v2/resize:fit:700/0*_oY0xxs3fWbXVLfG)
*Photo by [Andrew Neel](https://unsplash.com/@andrewtneel?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral).*

Initially, **large kernels** were common, allowing networks to capture a wide range of features from input images.

However, with the invention of [**VGGNet**](https://arxiv.org/pdf/1409.1556.pdf), a higher number of multiple layers with **small (3×3) kernels**, proved to be more effective and efficient in practice [6].

However, with the rise of Vision Transformers (ViTs), larger kernels were reintroduced in the vision landscape, with window sizes of at least **(7×7)**.

This facilitated models to capture **global contextual information**, akin to the broad receptive field of transformers’ **self-attention mechanisms**.

> ConvNeXt kernel design

![Kernel size transformations](https://miro.medium.com/v2/resize:fit:473/1*851RJfMYr0Nup2AU76-z2A.png)
*Kernel size transformations | [Source](https://arxiv.org/pdf/2201.03545.pdf).*

As in previous steps, ConvNeXt opted for the ViT feature (a large kernel).

Researchers experimented with various kernel sizes, and it was observed [that the benefit of larger kernel sizes **reaches a saturation point at 7×7.**](https://arxiv.org/pdf/2201.03545.pdf) But a better performance than smaller kernel sizes such as 5.

> But what is the first step in the diagram (move up the depthwise conv. layer) ?

In the context of CNNs, ‘**moving up the depthwise conv layer’** means altering the order in which the layers are applied to the input data.

In a standard architecture, **depthwise convolutional layers** might appear **deeper** within the network, after other types of layers. However, we are repositioning the depthwise conv. layer to occur earlier in the process.

> This design change is inspired by the structure of Transformers, where: the [Multihead Self-Attention (MSA) block is placed prior to the MLP layers](https://arxiv.org/pdf/2201.03545.pdf) [1].

By moving the depthwise convolutional layer up, the **computationally complex operations** (large-kernel convolutions) work on a lower number of channels. And the **more efficient operations**, like the 1x1 convolutions, handle the increased channels which is where more computational work is required.

This rearrangement aims to improve the efficiency of the network by **reducing the overall computational load** (GFLOPs).

### 5.- Micro Design

![Micro design transformations](https://miro.medium.com/v2/resize:fit:545/1*z46Bo3m6jop2nxQKdqii2w.png)
*Micro design transformations |[Source](https://arxiv.org/pdf/2201.03545.pdf).*

- **Replacing ReLU with GELU:** While [ReLU](https://medium.com/@danqing/a-practical-guide-to-relu-b83ca804f1f7) is common in ConvNets, [GELU](https://arxiv.org/pdf/1606.08415.pdf#:~:text=The%20GELU%20activation%20function%20is,ReLUs%20(x1x%3E0).) — a smoother variant — is often used in transformers. 
Incorporating GELU into ConvNets didn’t change the accuracy, but reduced GLOPS by **0.1**.

![ReLU and GELU activation functions](https://miro.medium.com/v2/resize:fit:700/0*3MBDwXFKEoekBDVu)
*ReLU and GELU activation functions | Created by the author.*

- **Reducing Activation Functions:** Transformers use fewer activations compared to ResNets. Mimicking this by reducing GELU activations improved performance (from **80.6** to **81.3**).
- **Fewer Normalization Layers:** Similarly, using fewer BatchNorm layers, like in Transformers, enhanced performance by **0.1**.

![Swin T vs ResNet vs ConvNeXt block](https://miro.medium.com/v2/resize:fit:344/1*cxrrLptZ4C6GdW23Va-rEA.png)
*Swin T vs ResNet vs ConvNeXt block | [Source](https://arxiv.org/pdf/2201.03545.pdf).*

> Here we remove two BatchNorm (BN) layers, leaving only one BN layer before the conv 1 × 1 layers. This further boosts the performance to 81.4%, already surpassing Swin-T’s result [1].

- **Substituting BN with LN:** Using **Layer** Normalization instead of **Batch** Normalization, which is also a common practice in transformers, was beneficial as well, slightly improving the accuracy by 0.1.

![Batch and Layer Normalization](https://miro.medium.com/v2/resize:fit:699/1*9Bw2njHrM1JnV6Xr-dWjCQ.png)
*Batch and Layer Normalization | [Source](https://openaccess.thecvf.com/content/ICCV2021W/NeurArch/papers/Yao_Leveraging_Batch_Normalization_for_Vision_Transformers_ICCVW_2021_paper.pdf).*

**Separate Downsampling Layers:**

- In **ResNet**, the spatial downsampling is achieved by the residual block at the start of each stage.
- In **Swin Transformers**, a separate downsampling layer is added between stages.

Adopting swin transformer's downsampling approach instead of ResNet method surprisingly led to significant accuracy gains (from **81.5** to **82**).

## Testing the model

![Photo by Tobias Tullius on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*HFjyyBegWYKPnZmx)
*Photo by [Tobias Tullius](https://unsplash.com/@tobiastu?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

**As important as training is the testing part.** We need to ensure that the model performs well, with a method of evaluation, another way we won´t be able to improve it.

> But how can we do this?

Typically these models are tested on a series of **benchmarks** which are giant datasets or frameworks where different capabilities of the aglorithm can be evaluated.

**1.- ImageNet Classification** ConvNeXt-T achieved ***82.1%*** top-1 accuracy surpassing Swin Transformers. The biggest version (ConvNeXt-L) also had impressive results with ***85.5%***, being one of the best models in this benchmark.

![Top-1 accuracy on ImageNet-1k trained models](https://miro.medium.com/v2/resize:fit:700/1*5xIv69ont8oRwIN6eNMsDg.png)
*Top-1 accuracy on ImageNet-1k trained models | [Source](https://arxiv.org/pdf/2201.03545.pdf) — edited by the author.*

The three architectures at the top of the table (RegNet and EffNet versions) have the best combination of accuracy and computational requirements, among the ones listed.

However it’s important to visualize the global picture, normally models are evaluated with **small and large datasets**, to see how they scale.

As discussed before, one of the advantages of ConvNeXt is its capability to adapt to higher volumes of data, due to the fact of having **transformer features** in its architecture.

Let´s see how the model performs in the [image-net 22k dataset](https://image-net.org/download.php):

![Top-1 accuracy on ImageNet-22k pre-trained models](https://miro.medium.com/v2/resize:fit:700/1*mre6HrN2iEG6aCCUsWg1yw.png)
*Top-1 accuracy on ImageNet-22k pre-trained models | [Source](https://arxiv.org/pdf/2201.03545.pdf) — edited by the author.*

The results were quite interesting, in this occasion ConvNeXt achieved the highest accuracy *(87.8%)* with **ConvNeXt-XL**. However, the parameters and the FLOPS are still quite high compared with other architectures such as **EffNet V2-XL**.

However, other versions of ConvNeXt had a better trade-off in accuracy and FLOPS. A clear example is the **ConvNeXt-L** which had the second-best accuracy in the benchmark *(87.5%)* but with a significantly lower number of parameters *(198M)* and a FLOP of *101.0G* which is more or less at the level of **EffNetV2-XL** (94.0G).

The small version (ConvNeXt-T) also scaled quite well and provided an impressive balance between accuracy and FLOPs *(82.9% / 4.5G)*.

**2.- COCO Object Detection**

[The COCO (Common Objects in Context)](https://arxiv.org/pdf/1405.0312.pdf) dataset is used for evaluating the performance of models on tasks like object detection, segmentation, and captioning.

**Object detection** consists of identifying and finding the position of objects in a set of images.

![Image classification, object localization, and semantic segmentation](https://miro.medium.com/v2/resize:fit:621/1*DQ99qZ8LS8n6Y869rEwFGg.png)
*Image classification, object localization, and semantic segmentation | [Source](https://arxiv.org/pdf/1405.0312.pdf)*

Before analyzing the benchmark is important to understand the following metrics:

- **AP_bbox:** Average Precision for bounding box detection at different IoU (Intersection over Union) thresholds. **AP_50** and **AP_75** represent the precision at **50%** and **75%** IoU thresholds, respectively. 
Higher AP values are better, indicating more accurate detection.
- **AP_mask:** Similar to AP_bbox, but for **segmentation masks**.

![Coco object detection and segmentation results](https://miro.medium.com/v2/resize:fit:700/1*er1yRISPbwxVZQ2e6yTasQ.png)
*Coco object detection and segmentation results | [Source](https://arxiv.org/pdf/2201.03545.pdf) — edited by the author.*

ConvNeXt-T has slightly **lower FLOPs** (714G) and **higher FPS** (13.5) than Swin-T, indicating it might be a more efficient model, while also maintaining comparable accuracy as indicated by the **AP scores**.

**3.- Efficiency**

![Inference throughput comparisons on an A100 GPU](https://miro.medium.com/v2/resize:fit:700/1*fco1dhrpqItIlkH1eGdABg.png)
*Inference throughput comparisons on an A100 GPU | [Source](https://arxiv.org/pdf/2201.03545.pdf) — edited by the author.*

This benchmark is the strongest point of the model, it outperformed all Swin Transformer versions. This can be seen in the **throughput column** which indicates the **images per second** that the model can process.

In general, ConvNeXt throughput surpasses the Swin transformer by around ***40%***. Indicating a clear improvement of the efficiency, while **not only maintaining but also improving the accuracy**.

This is precisely the main objective of ConvNeXt:

> To maintain the accuracy of Vision Transformers and the efficiency of Convolutional Neural Networks.

### Bibliography:

***[1]*** [*Liu, Z., Mao, H., Wu, C.-Y., Feichtenhofer, C., Darrell, T., & Xie, S. (2022). A ConvNet for the 2020s. arXiv.*](https://arxiv.org/abs/2201.03545)

***[2]*** [*He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep Residual Learning for Image Recognition. arXiv.*](https://arxiv.org/abs/1512.03385)

***[3]*** [*Liu, Z., Lin, Y., Cao, Y., Hu, H., Wei, Y., Zhang, Z., Lin, S., & Guo, B. (2021). Swin Transformer: Hierarchical Vision Transformer using Shifted Windows. arXiv.*](https://arxiv.org/abs/2103.14030)

***[4]*** [*Xie, S. (2017). Aggregated Residual Transformations for Deep Neural Networks. arXiv*](https://arxiv.org/abs/1611.05431)

***[5]*** [*Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., & Chen, L. (2019). MobileNetV2: Inverted Residuals and Linear Bottlenecks. arXiv.*](https://arxiv.org/abs/1801.04381)

***[6]*** [*Simonyan, K., & Zisserman, A. (2015). Very Deep Convolutional Networks for Large-Scale Image Recognition. arXiv.*](https://arxiv.org/abs/1409.1556)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*
