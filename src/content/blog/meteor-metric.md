---
title: "The METEOR Metric — An NLP Classic"
description: "An upgrade in the evaluation of machine translation"
date: 2024-02-07
tags: [nlp, metrics, machine-learning]
icon: "📏"
---

*An upgrade in the evaluation of machine translation. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/the-meteor-metric-an-nlp-classic-42552cb6ce69).*

![Created with DALL-E 3 by the author](https://miro.medium.com/v2/resize:fit:700/0*-tX_8yr2dBWJk7pC)
*Created with DALL-E 3 by the author*

Early metrics, such as the **Word Error Rate (WER)** and the **Bilingual Evaluation Understudy (BLEU)**, have been pioneer attempts at evaluating machine translation.

**BLEU**, in particular, became the industry standard after its introduction in the early **2000s** due to its simplicity and ability to be computed quickly.

However, BLEU’s primary focus on **exact word matches** often resulted in a **lack of correlation with human judgment**, especially in cases where **synonyms** or **paraphrasing** occurred.

> **[Beyond BLEU Score: Unraveling the Myths of Machine Translation’s Favorite Metric](https://medium.com/@jorgecardete/beyond-bleu-score-unraveling-the-myths-of-machine-translations-favorite-metric-afac33f56de8)**
> When it comes to the nuanced world of language translation, how do we discern a mediocre translation from a…

**METEOR** was conceived as a response to this limitation, introduced by researchers at [Carnegie Mellon University](https://www.cmu.edu/) in 2005.

Its innovation lay in its incorporation of **stemming** and **synonymy matching**, alongside **exact word matching**, to capture more meaning from the translated text.

Furthermore, METEOR introduced a novel alignment strategy that aimed to mimic human intuition by **considering the order and closeness** of words when evaluating translations.

## METEOR components

### - Exact Word Matching

The most basic form of evaluation involves the direct comparison of words from the **machine-translated text** to the words in the r**eference text**.

It serves as the f*oundation* upon which the other components build.

### - Stemming

Recognizing that words can appear in **different morphological forms**, METEOR uses stemming algorithms to strip words **down to their roots**.

This way, words with the **same root but different suffixes** (e.g., “connect,” “connected,” “connecting”) are matched as **equivalents**, which **traditional exact matching would miss**.

### - Synonymy Matching

To capture the meaning beyond word forms, METEOR employs **synonymy matching** using **WordNet** or similar **databases**.

This allows the metric to recognize when a **translated word** has the same meaning as a word in the reference text, even if the word itself is different, **such as “fast” and “quick.”**

## Scoring Mechanism

METEOR calculates its score based on **precision** and **recall**, which are standard measures in information retrieval:

- **Precision** refers to the proportion of words in the **machine-translated text** that are **correctly translated**, according to the reference.
- **Recall** measures the **proportion of words in the reference translation** that appear in the machine-translated text.

![Precision and Recall](https://miro.medium.com/v2/resize:fit:700/0*EKIk_rUIt9Itzecu)
***Precision** and **Recall** | [Source](https://towardsdatascience.com/precision-and-recall-made-simple-afb5e098970f)*

METEOR combines these two measures into a single score using the [**harmonic mean**](https://en.wikipedia.org/wiki/Harmonic_mean), which is a type of average that gives a balance between precision and recall.

> The harmonic mean is weighted in favor of recall, as research suggests that recall is slightly more important than precision in translation evaluation.

![](https://miro.medium.com/v2/resize:fit:170/0*GkAMvFa_3ws3cr5O)

This is the formula where **P is the precision** and **R is the recall**:

- If ***α*** *= 1*: Precision and recall are **equally weighted**, and the formula reduces to the traditional harmonic mean.
- If *α < 1*: The contribution of precision to the harmonic mean is reduced, meaning that **recall has a greater influence** on the final score.
- If *α > 1*: **Precision will have more weight than recall**, but this is not the case for METEOR.

## Alignment

Alignment is crucial in the METEOR metric and **refers to the way words in the machine-translated text are paired with words in the reference text.** Unlike **BLEU**, which considers all possible n-gram matches independently, **METEOR employs an explicit alignment step** that:

- **Minimizes crosses** (words in the translation that must be re-ordered to match the reference), reflecting the **correct order of words**.
- **Accounts for the proximity of matches**, recognizing that **closer word pairs** are more likely to be correct.
- **Allows for many-to-one and one-to-many matching**, recognizing that **translations can be phrased in various ways** that are still correct.

![Alignment representation](https://miro.medium.com/v2/resize:fit:677/1*awnmD_zrE8Qg8bmMloeo-w.png)
***Alignment** representation | [Source](https://www.researchgate.net/figure/French-English-pair-with-complex-word-alignment-parses-Alignment-is-also-used-in_fig1_220874169)*

### Practical example

Imagine we have a sentence in English that we want to translate into Spanish:

**English (Source):** “Children play joyfully in the park.”

**Spanish (Reference):** “Los niños juegan alegremente en el parque.”

Let’s consider two different machine translations to compare:

- **Spanish (Machine Translation A):** “Los niños juegan felizmente en el parque”.
- **Spanish (Machine Translation B):** “Los infantes están jugando en el área de juego”.

### Translation A: “Los niños juegan felizmente en el parque.”

**Stage 1: Matching**

- **Exact matches:** *“Los,” “niños,” “juegan,” “en,” “el,” “parque”* (6 matches)
- **Synonym matches:** *“felizmente”* can be considered a synonym for *“alegremente”* (1 match)

Total matches for translation A = 7.

**Stage 2: Alignment**

There are **no crossings**; the word order is the **same as in the reference**.

**Stage 3: Scoring**

![](https://miro.medium.com/v2/resize:fit:636/1*LQS4aJHp5eDtAEskcp5Y6Q.png)

I will use **0.9** for α in the harmonic mean which is a very common parameter:

![](https://miro.medium.com/v2/resize:fit:367/0*gwgNOgnMpwg5FA5p)

**Stage 4: Penalty**

Since there are no misaligned chunks in our example, the **penalty is 0**. The **final score is the F-mean reduced by the penalty**.

![](https://miro.medium.com/v2/resize:fit:525/0*U9IP9ppomRAJvj5C)

**Translation A** achieves a perfect METEOR score, indicating that it’s a **perfect match to the reference translation** both in terms of matching words and their order.

### Translation B: “Los infantes están jugando en el área de juego.”

### Stage 1: Matching

- **Exact matches:** “Los” (1 match)
- **Stemmed or synonym matches:** *“infantes”* for *“niños,”* *“jugando”* for *“juegan,”* *“el área de juego”* for *“el parque”* (we’ll consider these as synonym matches).

Let’s assume all are accepted as synonym matches, giving us **4 matches** in total.

### Stage 2: Alignment

There are no **crossings**; however, the structure *“están jugando”* vs. *“juegan”* and *“el área de juego”* vs. *“el parque”* could potentially introduce complexity in alignment. *We’ll assume it doesn’t for simplicity*.

### Stage 3: Scoring

![](https://miro.medium.com/v2/resize:fit:369/1*r6WM-RXzagPu9RXlSgJ5Zw.png)

### Stage 4: Penalty

Given that there is a **shift in structure**, we might consider this as one chunk due to the different construction, but for simplicity, *let’s assume no penalty*.

![](https://miro.medium.com/v2/resize:fit:435/0*_7TL7yYBF8EWdGO6)

### Conclusion

We can see the difference in the METEOR score in these 2 sentences. While **Translation A** received a perfect score, the score of **Translation B** was very low.

If we take a closer look at **translation B**: “Los infantes están jugando en el área de juego” we can see that there are **many ambiguous terms**.

In first place *“están jugando”* and *“area de juego”* aren´t as exact as *“juegan”* or *“parque”*, but **we didn´t take this into account** when calculating the score.

In addition we don´t know **how the kids are feeling while they play** in the park. In the original sentence is remarked that they are playing happily, but in the translation t**his is not reflected**.

Overall, this translation may not seem as bad a**s the METEOR score reflects**.

Nevertheless, the METEOR score is **not only penalizing the literal translation but also the structure in which the sentence have been translated**.

For an Spanish person, this translation **may make sense** but it will also sound a **bit awkward** because of how is structured whereas Translation A is simpler and more concise.

## METEOR limitations

As any other metric, METEOR has some limitations, despite its improvements over other evaluation methods.

These are some of the main criticisms and constraints associated with METEOR:

**1.- Language Dependency**

METEOR relies on language-specific resources such as **stemmers**, **synonym dictionaries**, and **paraphrase databases**.

These resources may not be available or of high quality for all languages, which can limit the metric’s **applicability** and a**ccuracy** across different language pairs.

**2.- Complexity of Alignment**

The alignment algorithm in METEOR is **more sophisticated than in simpler metrics like BLEU**, but it can also lead to errors in assessment, especially **in cases where sentence structures differ significantly between the source and target languages**.

**3.- Inadequate for Evaluating Full Texts**

METEOR is generally used at the sentence level and **might not perform as well when assessing the coherence and cohesion of entire paragraphs or documents**.

**4.- Limited Contextual Understanding**

Like many metrics, METEOR **cannot fully understand the context and may not accurately score translations** that are contextually appropriate but diverge at the word or phrase level.

### Bibliography

- [https://huggingface.co/spaces/evaluate-metric/meteor](https://huggingface.co/spaces/evaluate-metric/meteor)
- [https://machinelearninginterview.com/topics/machine-learning/meteor-for-machine-translation/](https://machinelearninginterview.com/topics/machine-learning/meteor-for-machine-translation/)
- [https://link.springer.com/article/10.1007/s10590-009-9059-4](https://link.springer.com/article/10.1007/s10590-009-9059-4)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
