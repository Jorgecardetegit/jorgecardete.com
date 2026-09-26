---
title: "Revolutionizing Data Clustering: KwikBucks Algorithm"
description: "Novel Clustering Algorithm that Combines the Benefits of Embedding Models with the Quality of Cross-Attention"
date: 2023-11-15
tags: [machine-learning, clustering, papers]
icon: "🪣"
---

*Novel Clustering Algorithm that Combines the Benefits of Embedding Models with the Quality of Cross-Attention. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/revolutionizing-data-clustering-kwikbucks-algorithm-149b7ae88125).*

![Image by user (DALL-E 3)](https://miro.medium.com/v2/resize:fit:700/0*BW0OCMzyUwq1WaWa)
*Image by user (DALL-E 3)*

Now a days, the challenges posed by the rapidly increasing size of machine learning (ML) models are steadily on the rise.

Specifically, a significant concern plaguing researchers is the exorbitant expenses linked to the training of large cluster models. This issue is commonly referred to as the Budgeted Correlation Clustering (BCC) problem.

**The BCC Problem** The BCC problem acknowledges that while there’s a need for high-quality similarity assessments (which are costly in terms of computation), there’s also a limited budget that restricts the number of such high-cost queries.

**Use of Dual Oracles** Typically, BCC involves two types of oracles (or sources of information):

- A high-cost, high-accuracy oracle.
- A low-cost, less accurate oracle.

The challenge is to effectively use the limited high-quality queries (from the expensive oracle) while supplementing with information from the low-cost oracle, all within the set budget.

The aim is to still achieve a clustering that is as close as possible to what would be obtained if there were no budget constraints.

## KwikBucks Algorithm

The algorithm we’re discussing, named “KwikBucks,” is designed for clustering. The unique aspect of it is that it cleverly combines two advanced machine learning techniques:

1. **Cross-Attention (CA) Models:** These are like high-precision tools. They’re very good at figuring out how similar two pieces of data are, but they require a lot of computing power.
2. **Embedding Models:** These models are more like quick scanners. They can rapidly assess and compare large amounts of data, but they’re not as precise as CA models.

This is the original paper: [https://openreview.net/forum?id=p0JSSa1AuV](https://openreview.net/forum?id=p0JSSa1AuV)

## How KwikBucks Works

If you are not familiar with **Embedding models**, **CA** or **clusters** and are curious about them, you can check the last part of this article where I left an explanatory section about these concepts.

However, it’s not necessasry that you grasp these concepts in-depth for the purpose of this publication. This is just an explanatory article, and I won’t delve into technical details.

**Step 1: Initial Clustering:**

- **Choosing Centers:** First, the algorithm picks out some data points to be the “centers.” These centers are chosen because they’re quite different from each other.
- **Forming Clusters:** Then, it groups other data points around these centers based on similarity.

**Step 2: Balancing Two Models:**

- **Using Embedding Models:** To save time and computing power, KwikBucks first uses embedding models to get a rough idea of which data points are similar.
- **Limited Use of CA Models:** Then, it uses the CA models for a more precise check, but only a limited number of times to avoid using too much computing power.

**Step 3: Post-Processing:**

- **Merging Clusters:** After the initial grouping, KwikBucks looks at the clusters formed and decides if some of them should be merged. This decision is based on whether clusters have more similarities than differences.

### In Simple Terms

Imagine KwikBucks as a chef trying to sort a mix of different ingredients (data points) into distinct bowls (clusters).

The chef has two tools: a large sieve (embedding models) to quickly separate most ingredients and a fine sifter (CA models) for a more detailed separation.

The chef first uses the large sieve to do a rough sort, then uses the fine sifter sparingly to refine the sorting, being careful not to overuse it as it’s a bit slow.

After this sorting, the chef might decide to combine some bowls if their contents are quite similar. The goal is to have bowls where each contains very similar ingredients, sorted efficiently and accurately.

**Algorithm results**

For now the metrics are not very representative as this is the first model built with this approach. The baselines used in the paper are algorithms similar to KwikBucks but not with the exact same purpose.

> Our work is the first correlation clustering algorithm which utilizes both strong and weak signals, we adapt algorithms from prior work, e.g. some which only use a strong signal, to our setting.Paper authors

![Evaluation of KwikBucks algorithm](https://miro.medium.com/v2/resize:fit:700/1*kqxp9V-ENLsqOGHiOnH1pA.png)
*Evaluation of KwikBucks algorithm | from original paper*

This were some of the results pubished in the paper. The performance was measured by various metrics, such as the correlation clustering objective and the F1 score, across different levels of query budget and with different weak signals.

> To know more about the baseline and the evaluation metrics check ***page 7.*** of the paper.

### Algorithm recap

![https://iclr.cc/virtual/2023/poster/10963](https://miro.medium.com/v2/resize:fit:700/0*1DeZAgvQjZ6QBCuN)
*[https://iclr.cc/virtual/2023/poster/10963](https://iclr.cc/virtual/2023/poster/10963)*

### Revision of concepts (Clustering, Embedding Models, Cross-Attention)

This article assumes that you are familiar with the concepts of Clustering, Embedding models and Cross-Attention. However, in case this concepts aren´t entirely clear to you or you just to know more about them, lets quickly revise them.

### Clustering

Clustering is a core technique in data mining and unsupervised machine learning, with the objective of categorizing similar items into distinct groups or clusters.

![Clustering](https://miro.medium.com/v2/resize:fit:218/0*6e9iXTXaqjJzVcBG)
*Clustering | [link](https://developers.google.com/machine-learning/clustering/clustering-algorithms?hl=es-419)*

This process helps in understanding the structure of data by grouping similar elements, which can be invaluable in various applications like customer segmentation, image recognition, and more.

The practice of clustering can be broadly classified into two types: metric clustering and graph clustering.

**Metric Clustering**: This approach uses a defined metric space to determine the distances between data points.

A metric space is a mathematical structure where distances between points are well-defined and measurable. In metric clustering, these distances are crucial as they form the foundation for how data points are grouped.

The basic principle is that points closer to each other in the metric space are more likely to be in the same cluster. Common techniques include K-means and hierarchical clustering.

**Graph Clustering:** Graph clustering, in contrast, utilizes a graph structure where data points are represented as nodes, and their similarities or relationships are represented as edges connecting these nodes.

![Graph clustering](https://miro.medium.com/v2/resize:fit:605/0*WsZSHGrUFbGXygQu.jpg)
*Graph clustering | [link](https://www.sciencedirect.com/science/article/abs/pii/S0370157309002841)*

The key in graph clustering is to identify communities or clusters based on how these nodes are interconnected.

Unlike metric clustering, where distance is the primary focus, graph clustering emphasizes the connections and interactions between data points.

Alright, that was a good wrap up. Now lets revise briefly the concept of embedding models.

### Embeddings

Embeddings are representations of items (like words, sentences, images, etc.) as vectors in a high-dimensional space. Each dimension captures some aspect of the item’s characteristics.

![Embeddings representation](https://miro.medium.com/v2/resize:fit:589/0*w2r0M-DKssUk-xiH.png)
*Embeddings representation | [link](https://www.baeldung.com/cs/dimensionality-word-embeddings)*

In this space, the ‘distance’ between vectors is significant. Closer vectors represent items that are more similar or related in some way.

### Embedding models

Embedding models convert raw data (like text) into a form that a machine learning algorithm can understand and process. For example, converting words into vectors.

They are designed to capture the underlying semantics or meaning. For instance, in text, words with similar meanings are mapped to points in the vector space that are close to each other.

![High overview of BERT](https://miro.medium.com/v2/resize:fit:700/0*qxRn6nb8u7hZZh00)
*High overview of BERT | [link](https://www.exxactcorp.com/blog/Deep-Learning/how-do-bert-transformers-work)*

Some famous models are Word2Vec or Bert.

Excellent, we’ve now grasped two components of the equation, leaving us with just one more to explore: Cross-attention.

### Cross-attention models

At the core of these models is the ‘attention mechanism.’ This mechanism allows the model to focus on different parts of the input data (like words in a sentence) selectively, depending on what it’s currently processing.

![Cross-attention](https://miro.medium.com/v2/resize:fit:437/0*sIutjwKJJS0a8bxn)
*Cross-attention | [link](https://jalammar.github.io/illustrated-transformer/)*

Cross-attention extends this idea by enabling the model to attend not just to one, but to multiple sequences simultaneously. It can weight the importance of different elements in one sequence based on the information in another sequence.

**Contextual understanding** Cross-attention models are adept at capturing the context and relationships between elements in different sequences. For instance, in machine translation, a cross-attention model can focus on specific words in the source language while generating a corresponding word in the target language.

**Practical example** Imagine we’re translating the English sentence “I love machine learning” to French using a translation model with an attention mechanism.

The model starts translating word by word:

1. **I → Je:** The model’s attention is on “I”, understanding it as the subject.
2. **love → aime:** The attention mechanism now focuses on “love”, recognizing it as the verb and central action of the sentence, while still keeping some attention on “I” to maintain the subject-verb agreement.
3. **machine learning → l’apprentissage automatique:** The phrase “machine learning” is a compound noun. The model’s attention spreads over both words “machine” and “learning” to capture the full meaning of the term, which is crucial for producing the correct translation in French.

During each step, the attention mechanism dynamically adjusts to focus more on the relevant words in the English sentence that inform the next word in the French translation.

You can visualize this like a spotlight moving over the English sentence to highlight the words that are most relevant at each step of the translation.

These are quite high-level explanations since the concepts of Cross-attention and Embedding models are very advanced and can’t be fully explained in just a few line. However, for those of you who are curious about the topic or would like to refresh your memory a bit, this brief overview should be helpful.

If you’d like to delve deeper into these topics, here are some useful articles to explore:

**Clustering**

- [The complete guide to clustering analysis](https://towardsdatascience.com/the-complete-guide-to-clustering-analysis-10fe13712787)
- [17 Clustering Algorithms Used In Data Science and Mining](https://towardsdatascience.com/17-clustering-algorithms-used-in-data-science-mining-49dbfa5bf69a)

**Embedding Models**

- [Neural networks embeddings explained](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526)
- [Introduction to Word Embedding and Word2Vec](https://towardsdatascience.com/introduction-to-word-embedding-and-word2vec-652d0c2060fa)

**Cross-Attention**

- [Attention is all you need: Discovering the Transformer paper](https://towardsdatascience.com/attention-is-all-you-need-discovering-the-transformer-paper-73e5ff5e0634)
- [Cross-Attention is what you need!](https://towardsdatascience.com/cross-attention-is-what-you-need-fusatnet-fusion-network-b8e6f673491)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*
