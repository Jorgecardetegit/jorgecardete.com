---
title: "Teacher Forcing in Machine Learning"
description: "Changing the mindset of traditional models"
date: 2024-02-05
tags: [machine-learning, rnn, training]
icon: "🧑‍🏫"
---

*Changing the mindset of traditional models. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/teacher-forcing-in-machine-learning-4a51e12a0c59).*

![Photo by Thao LEE on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*kNnNr8Nhxm3HQcKF)
*Photo by [Thao LEE](https://unsplash.com/@h4x0r3?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

Teacher forcing is a modern training strategy used in the development of **sequence-to-sequence models**, which are central to many applications in **natural language processing** tasks.

This technique is often employed in **RNNs** and its variants — [LSTMs](https://en.wikipedia.org/wiki/Long_short-term_memory) and [GRUs](https://en.wikipedia.org/wiki/Gated_recurrent_unit).

Some of the most common applications include:

- Machine translation
- Text summarization
- Chatbot functionality

**# But what is “teacher forcing”?**

At its core, is a method to guide and accelerate the learning process of a model by providing it with **the correct input** at each step of the sequence rather than allowing it to generate the next step based on its previous outputs.

Let´s visualize this better with an example:

Imagine a classroom setting where a student is **learning to form sentences in a new language** — the teacher provides a **word**, and the student **attempts to predict the next word** in the sentence.

If the student guesses **incorrectly**, the teacher immediately supplies **the correct word**.

The student then uses this correct word **as the** **starting point for predicting the subsequent one**, rather than **continuing the sentence from his mistake.**

> This ensures that the student is always practicing the formation of sentences from correct sequences, reinforcing the right patterns and structures.

![Photo by Thought Catalog on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*cfYszaBx45a-6GwO)
*Photo by [Thought Catalog](https://unsplash.com/@thoughtcatalog?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### Teacher forcing in Recurrent Neural Networks

In the context of **machine learning**, teacher forcing operates under **the exact same principle**.

During the training of a [***seq2seq***](https://en.wikipedia.org/wiki/Seq2seq) model, the correct previous output (from the training dataset) is fed as the input to the model for the next prediction, instead of the model’s previous prediction — which could be incorrect.

For example, let´s say **we want to train a predictive model**, and the caption we are trying to predict is:

> “Two people reading a book”.

However, our model makes a mistake in predicting the **2nd word** and we have *“Two”* and *“birds”* for the **1st** and **2nd** prediction respectively.

- Without *Teacher Forcing*, we would feed *“birds*” back to our **RNN** to predict the **3rd word** (which might also be predicted wrongly).
- On the other hand, if we use *Teacher Forcing*, we would feed *“people”* to our **RNN** for the **3rd prediction —** increasing the chances that the third word **will be predicted correctly.**

![Non-teacher forcing vs teacher forcing](https://miro.medium.com/v2/resize:fit:421/0*mzsfbyqBrWsm_09c.png)
*Non-teacher forcing vs teacher forcing | [Source](https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c)*

### Teacher Forcing in translation

As I stated before, another area in which **teacher forcing** is highly employed is in **translation**.

Let´s go through another example.

For instance, **consider a seq2seq model designed to translate English sentences into French**.

The *English* sentence is:

> “The weather is nice today”.

And the correct French translation is:

> “Le temps est beau aujourd’hui”.

The model is initially unaware of **how to translate this correctly.**

In a training scenario *without teacher forcing*, if the model **incorrectly predicts** the first word as “La” instead of “Le,” — **the next input will be incorrect**, potentially **compounding errors down the line of translation**.

*With teacher forcing*, regardless of the **model’s previous output**, the **correct word** “Le” will be fed as **the input for the next word’s prediction**, helping the model **learn the correct sentence structure and vocabulary** more effectively.

![Photo by Anthony Choren on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*5JWGbZyBhL606PQb)
*Photo by [Anthony Choren](https://unsplash.com/@tony_cm__?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

### But how does the model really learn if it´s being constantly fed with the correct answer?

It might seem counterintuitive to “teach” a model by providing the answers upfront; however, this method is grounded in the principles of how learning occurs (not only in artificial systems but also in biological ones).

When we employ *teacher forcing* in training **seq2seq models**, we’re not **merely giving away the answers** but rather utilizing the correct responses as a strong signal **to guide the learning process**.

We are letting the model **make predictions** and **storing the weights of these predictions in the memory**.

However, (as you might have figured out) this type of training has some negative aspects.

Let´s review some of the **pros** and **cons** of this technique.

## Pros and Cons of Teacher Forcing

### Pros

*Teacher Forcing* accelerates the training process substantially.

In the initial phases of training, the model **often makes inaccurate predictions**. Without *Teacher Forcing*, the **model’s hidden states** are influenced by a **chain of incorrect predictions**, **accumulating errors** and making it **challenging for the model to improve**.

### Cons

At the **inference stage**, where the model **typically lacks access to the solution**, it has to rely on its previous output for the next prediction.

This creates a mismatch between **how the model is trained and how it operates during inference**, potentially resulting in **reduced performance and instability**.

> This phenomenon is known as [Exposure Bias](https://arxiv.org/abs/2204.01171).

### Bibliography

- [https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c](https://towardsdatascience.com/what-is-teacher-forcing-3da6217fed1c)
- [https://machinelearningmastery.com/teacher-forcing-for-recurrent-neural-networks/](https://machinelearningmastery.com/teacher-forcing-for-recurrent-neural-networks/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
