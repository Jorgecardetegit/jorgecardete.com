---
title: "Beyond BLEU Score"
description: "Machine Translation’s Favorite Metric"
date: 2023-11-03
tags: [nlp, metrics, machine-translation]
icon: "🔤"
cover: "/blog/covers/beyond-bleu-score.jpg"
topic: ai
---

*Machine Translation’s Favorite Metric. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/beyond-bleu-score-unraveling-the-myths-of-machine-translations-favorite-metric-afac33f56de8).*

![](https://miro.medium.com/v2/resize:fit:700/0*cypE60F1J65aTyrj)

When it comes to the nuanced world of language translation, how do we discern a mediocre translation from a masterpiece?

The answer doesn’t come from a human expert but rather from an ingenious metric known as the BLEU score.

BLEU, which stands for **Bilingual Evaluation Understudy**, has revolutionized the field of **machine translation** by providing a method to quantitatively measure the quality of automated translations against high-quality human translations.

Imagine the challenge faced by machines in not only grasping the lexical tapestry of a language but also its cultural undertones and contextual nuances.

Translating “the spirit of the text,” so to speak, is a lofty goal that machine translation endeavors to achieve. The BLEU score is at the forefront of this challenge, acting as a critical yardstick for progress. It’s not just a number; it’s a benchmark that tells us how close a machine-generated translation is to achieving the fluency and understanding of a skilled human translator.

The beauty of the BLEU score lies in its simplicity and its profound implications. It uses a statistical approach to compare a machine’s translation output with that of a human, taking into account factors such as precision in word choice and sentence structure. By doing so, it helps developers fine-tune their algorithms, pushing the boundaries of what artificial intelligence can achieve in breaking down language barriers.

In this article, we’ll delve into the origins of the metric, how it works, its impact on the field of natural language processing, and how the limitations of this metric have been overrided.

## The Origins of BLEU Score

The BLEU score was introduced in a seminal paper by Kishore Papineni and colleagues in 2002. Before its inception, the evaluation of machine translations was a subjective process, heavily reliant on human judgment. This posed a significant challenge for the development of machine translation systems, as human evaluations were not only time-consuming and costly but also fraught with inconsistency. The introduction of BLEU brought a revolutionary shift, offering an automated, quick, and objective way to evaluate the quality of translations produced by machines.

## How BLEU Works

The BLEU score quantifies the quality of machine-translated text by comparing it with reference human translations at the level of word sequences (n-grams). The comparison is based on two key components:

1. **N-gram Precision:** BLEU assesses the precision for n-grams of different lengths (usually 1 to 4 words). It counts the number of n-grams in the machine translation that also appear in the reference translation(s), then divides by the total number of n-grams in the machine translation. This gives a set of precision scores for 1-gram (unigram), 2-gram (bigram), 3-gram (trigram), and 4-gram.
2. **Brevity Penalty (BP):** BLEU introduces a penalty for translations that are too short, since shorter sentences are likely to have higher precision by chance. The penalty is calculated based on the length of the machine translation (MT) and the length of the reference translation (RT). If the MT is shorter than the RT, the BP is less than 1 (a penalty is applied), and if MT is the same length or longer, the BP is 1 (no penalty).

The overall BLEU score is computed as follows:

![](https://miro.medium.com/v2/resize:fit:321/0*9OVGYWXLvR1-seL3)

Where ***pn***​ is the precision for n-grams, ***wn*​** is the weight for each gram (typically uniform, e.g., 0.25 for each if N=4), and **N** is the number of grams considered (usually 4).

The logarithm is used to turn the product of precisions into a sum, and the exponential function is the inverse of the logarithm, ensuring that the BLEU score is a positive number.

Now we understand the second part of the function, lets explore more in depth how the Brevity Penalty is computed:

### BP (Brevity Penalty)

As stated before, BP compensates for the length of the translation: if the candidate translation is shorter than the reference translations, BP will be less than 1, otherwise, it will be 1. It is calculated as follows:

![](https://miro.medium.com/v2/resize:fit:233/0*UPBSJdf6stToZITX)

where:

- ***c*** is the length of the candidate translation
- ***r*** is the effective reference corpus length

The reference length *r* is determined from the set of reference translations that serve as the **standard** or “gold” translations to which the machine-generated translation (the candidate translation) is compared. The goal is to select a reference length that best matches the length of the candidate translation to avoid unfairly penalizing or rewarding it solely based on length differences.

There are a few different strategies to choose the reference length ***r***:

1. **Closest Length:** Select the reference translation whose length is closest to the length of the candidate translation. This is the most commonly used method and prevents the BP from becoming overly punitive for small length variations.
2. **Shortest Length:** Some implementations choose the shortest reference translation length to ensure the tightest possible match.
3. **Average Length:** Use the average length of all reference translations. However, this method is less common because average lengths might not reflect the actual lengths of any given reference translation.

### BLEU score result

BLEU scores range from 0 to 1 (or 0 to 100 when expressed in percentage terms), where a score of 1 indicates a perfect match with the reference translation.

## Example to Understand BLEU score

Let’s take a simple example to illustrate how the BLEU score is calculated. Suppose we have the following sentences:

- **Machine Translation (MT):** “The cat is on the mat.”
- **Reference Translation (RT):** “The cat is sitting on the mat.”

### Step 1: Compute N-gram Precision

**Unigram Precision (1-gram matches):
MT** has 6 unigrams, all of which are in the **RT**, so the unigram precision is **6/6 = 1**.

## Get Jorgecardete’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

**Bigram Precision (2-gram matches):**
**MT** has 5 bigrams, 4 of which are in the **RT**, so the bigram precision is **4/5**​.

**Trigram Precision (3-gram matches):**
**MT** has 4 trigrams, 3 of which are in the **RT**, so the trigram precision is **3/4**​.

**4-gram Precision (4-gram matches):**
**MT** has 3 four-grams, 2 of which are in the **RT**, so the four-gram precision is **2/3​**.

### Step 2: Calculate Brevity Penalty (BP)

The length of **MT** is 6, and the **RT** is 6 as well. Since **MT** is not shorter than **RT**, the **BP** is 1.

### Step 3: Calculate BLEU Score

Assuming uniform weights ***wn*** ​= 0.25 for each n-gram length 
The BLEU score is calculated as:

![](https://miro.medium.com/v2/resize:fit:342/0*IHrLZ0uvGDpX86Vo)

Plugging in the values:

![](https://miro.medium.com/v2/resize:fit:700/0*k9A0lU5ferIbJZzu)

First, compute the logarithms:

![](https://miro.medium.com/v2/resize:fit:668/0*qmoUXD93OWkiOuRV)

Sum the log values:

![](https://miro.medium.com/v2/resize:fit:225/0*ZscmYE_RYz6NOw3l)

Finally, calculate the exponent:

![](https://miro.medium.com/v2/resize:fit:314/0*Od88lgF-jcaWRUXc)

The BLEU score for the given example is approximately 0.7958

## Interpretation of BLEU score

To explain how BLEU can be interpreted, we can take the result of the example as a reference. 
In the example we obtained a BLEU score of 0.7958 which is quite high, especially considering that human translations typically do not achieve a perfect score because there are many valid ways to translate the same sentence. Scores closer to 1 indicate that the translation is very similar to the reference translation, and thus, in theory, it should be of higher quality.

However, interpreting BLEU scores can be a bit more nuanced:

- **Context Matters:** For some applications, a BLEU score in the **0.7–0.8** range would be considered very good. For others, especially those requiring precise technical translations, even a small deviation from the reference translation could be problematic.
- **Quality of Reference:** The quality of the BLEU score also depends on the quality and number of reference translations. A high score against a poor reference may not mean much, while a slightly lower score against a very high-quality, idiomatic reference could still represent a very good translation.
- **Not the Only Metric:** BLEU is just one of many metrics for evaluating machine translations, and while it’s popular, it’s not without its criticisms. BLEU scores don’t necessarily correlate with readability or grammatical correctness.
- **Linguistic Nuance:** BLEU does not account for semantic accuracy or the preservation of meaning, which is a critical aspect of translation quality.

In our example where the **machine translation** was: “The cat is on the mat.” and the **reference translation**: “The cat is sitting on the mat.” we can consider it a good translation to a certain point. 
Technically the cat is on the mat so there is nothing wrong with the translation up to this point, but if we want to know what the cat is doing on the mat, this translation is not good enough as it´s too general.

Here we can see a clear example which reflects that the quality of the BLEU score really depends on the context of the situation and our purpose.

## Limitations of BLEU score

The BLEU score has been instrumental in evaluating translation quality and a huge step to advance in this field, but as with any metric, it has limitations. It doesn’t account well for **semantic accuracy**, **grammatical correctness**, or the **flexibility of language use**. Lets see these limitations more in depth:

1. **Lack of Semantic Evaluation:** BLEU does not consider the meaning or semantics of the translated text. It is entirely possible for a translation to have a high BLEU score but still be semantically incorrect or nonsensical.
2. **Dependence on Reference Quality:** The effectiveness of BLEU is highly dependent on the quality and variety of the reference translations. If the references do not encompass the range of possible correct translations, the BLEU score may not accurately reflect translation quality.
3. **Inadequacy for Short Sentences:** BLEU is less reliable for evaluating the quality of translations of very short texts due to the limited context and the smaller number of n-grams.
4. **Mismatched Domains:** When the training data for a machine translation system is from a different domain than the test data, the BLEU score might not accurately reflect the system’s performance in real-world tasks.
5. **Sensitivity to Corpus Size:** BLEU scores can be disproportionately affected by the size of the evaluation corpus, with smaller corpora leading to more volatile scores.
6. **Literalness Over Idiomatic Correctness:** BLEU may favor more literal translations, as it relies on exact matches of n-gram sequences, potentially penalizing more idiomatic or culturally appropriate translations.
7. **Fluency and Readability:** BLEU does not directly measure how fluent or readable the translation is, which are important aspects of translation quality from a human perspective.

Due to these limitations, BLEU is often used alongside other automatic metrics like **METEOR**, **ROUGE**, or more advanced one such as **BERTScore**, which attempt to account for some of BLEU’s shortcomings.
