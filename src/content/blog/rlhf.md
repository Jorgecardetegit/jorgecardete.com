---
title: "Reinforcement Learning From Human Feedback (RLHF)"
description: "Embarking on a journey where machines learn not just from data, but from the wisdom of human experience"
date: 2023-11-10
tags: [llm, reinforcement-learning, alignment]
icon: "🧑‍⚖️"
cover: "/blog/covers/rlhf.jpg"
---

*Embarking on a journey where machines learn not just from data, but from the wisdom of human experience. Publicado originalmente en [LatinXinAI](https://medium.com/latinxinai/reinforcement-learning-from-human-feedback-rlhf-9d1d74040c1e).*

![https://thesequence.substack.com/p/the-next-rlhf-effect-three-breakhroughts](https://miro.medium.com/v2/resize:fit:700/0*qA7AFBBADrKdesXG.png)
*[https://thesequence.substack.com/p/the-next-rlhf-effect-three-breakhroughts](https://thesequence.substack.com/p/the-next-rlhf-effect-three-breakhroughts)*

A fusion of traditional reinforcement learning and direct human input has emerged as a crucial tool in the development of AI models.

RLHF steps ahead of conventional training methods, offering a pathway where AI systems learn not just from pre-programmed data, but from the richness of human feedback.

This approach embraces the subtleties, intricacies, and ethical dimensions of human communication.

In today´s article, I will be talking about RLHF and how it has been a crucial step in the development of LLMs. Its name is pretty much descriptive, Reinforcement Learning which is combined with Human Feedback.

Let’s start by explaining what is Reinforcement Learning for those of you who are not familiar with the concept.

### Reinforcement Learning

Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by performing actions in an environment to achieve a goal. The agent receives feedback in the form of **rewards** or **penalties**, which guide its learning process.

![Reinforcement learning](https://miro.medium.com/v2/resize:fit:700/0*gHsqNsSbQPCVPQ28.png)
*Reinforcement learning | [link](https://databasecamp.de/en/ml/reinforcement-learnings)*

Let’s take a look at some basic terminology:

- **Agent:** This is the learner or decision-maker. It’s the program or model that is being trained.
- **Environment:** The world through which the agent moves, which provides specific states to the agent. The environment could be a real-world setting, a computer game, a simulated environment, etc.
- **Actions:** These are the choices made by the agent. The set of all possible actions is known as the action space.
- **State:** A state is a concrete and immediate situation in which the agent finds itself; it’s a snapshot of the environment at a given time.
- **Reward:** After each action, the agent receives a reward (or penalty) from the environment. This reward is a numerical value that reflects the success or failure of the action.
- **Policy:** This is a strategy used by the agent to determine the next action based on the current state. It’s essentially a mapping from states to actions.
- **Value Function:** It estimates how good it is for the agent to be in a given state (or how good it is to perform a certain action in a given state). The “goodness” is calculated in terms of expected future rewards.

We will see a basic example to understand this better:

### Practical example: Determining the Placement of Ads on a Web Page

**Agent:** A program making decisions on how many ads are appropriate for a page.

**Environment:** The web page.

**Action:** One of three:

- (1) Putting another ad on the page.
- (2) Dropping an ad from the page.
- (3) Neither adding or removing an ad.

**Reward:** Positive when revenue increases; negative when revenue drops.

In this situation, the agent observes the environment and acquires its present state. This state may encompass factors such as the number of ads displayed on the web page and the availability of additional space.

Subsequently, the agent makes decisions on which of the three actions to take at each step. If it’s designed to receive positive rewards when revenue increases and negative rewards when revenue declines, it can formulate an effective policy.

### Why does Chatgpt use Reinforcement Learning?

The use of Reinforcement Learning (RL) in the development of ChatGPT, particularly in the Reinforcement Learning from Human Feedback (RLHF) pipeline, is a crucial aspect of its training process.

Traditional supervised learning requires large datasets with labeled examples. However, for a task like generating human-like text, it’s often impractical or impossible to create a dataset that covers every possible scenario.

RL, specifically through human feedback, allows ChatGPT to learn from a much sparser dataset where humans provide feedback on the quality of its responses.

**Optimizing Long-Term Objectives**
RL is well-suited for tasks where the goal is to optimize long-term outcomes rather than immediate rewards.

## Get Jorgecardete’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

In the case of ChatGPT, the long-term objective is to generate coherent, relevant, and contextually appropriate responses, which may not always align with short-term rewards like generating a grammatically correct sentence.

> Now this issue is mostly overcome but you may remember when chatgpt was first released, it could solve very complex tasks but it wasn´t able to solve a simple 2-digit multiplication correctly.

**Iterative Improvement** 
Through RLHF, ChatGPT can iteratively improve its performance based on continuous feedback. This is crucial for a system that interacts with users in diverse and evolving contexts.

![Reinforcement learning — training a cat](https://miro.medium.com/v2/resize:fit:700/0*ANUdv2RAXxkcL2IK.png)
*Reinforcement learning — training a cat | [link](https://itnext.io/chatgpt-decoded-an-expert-guide-to-mastering-the-technology-and-building-domain-specific-3a95b42827bb)*

Human trainers provide feedback on the model’s outputs. This feedback is used to train the model, helping it to align better with human values, expectations, and nuances in language.

### Problem with Traditional Reinforcement Learning

In regular Reinforcement Learning, the AI agents learn from their actions through a reward function. But the problem is the agent is teaching itself.

The rewards are often not easy to define or measure, especially with complex tasks such as NLP. The result is an easily confused chatbot that makes no sense to the user.

**Reinforcement Learning from Human Feedback** RLHF is a machine learning approach that combines reinforcement learning techniques, such as rewards and comparisons, with human guidance to train an artificial intelligence (AI) agent.

In RLHF, human testers and users provide direct feedback to optimize the language model more accurately than self-training alone. RLHF is primarily used in NLP for AI agent understanding in applications such as chatbots and conversational agents, text to speech, and summarization.

### How does RLHF work?

![RLHF steps](https://miro.medium.com/v2/resize:fit:700/0*uB17Lpiw0ZbPSDYe.png)
*RLHF steps | [link](https://www.pinterest.es/pin/meet-chatllama-the-first-opensource-implementation-of-llama-based-on-reinforcement-learning-from-human-feedback-rl-in-2023--624311567119542649/)*

RLHF training is done in three phases:

1. **Initial phase.** Involves choosing an established model as the primary reference for defining and labeling correct behavior. Leveraging a pre-trained model proves to be a time-saving strategy, given the extensive data needed for training.
2. **Human feedback.** Following the training of the initial model, human testers assess its performance. Human trainers assign quality or accuracy scores to different outputs generated by the model. Subsequently, the system assesses its performance by incorporating human feedback to generate rewards for Reinforcement Learning.
3. **Reinforcement learning.** The reward model is fine-tuned with outputs from the main model and receives a quality score from testers. The main model uses this feedback to improve its performance on future tasks.

RLHF represents an iterative process, as it involves a cycle of gathering human feedback and iteratively refining the model through Reinforcement Learning to achieve continuous improvement.

**Challenges and limitations of RHLF**
This process represents a significant milestone in the field of AI. However, it’s important to acknowledge that its impact is not exempt from limitations. Let’s take a look at them:

- **Subjectivity and human error.** The effectiveness of RLHF heavily depends on the quality and consistency of human feedback. Biased, inaccurate, or inconsistent feedback can lead to suboptimal or even harmful model behaviors. This is particularly challenging when dealing with subjective or nuanced topics where different humans might have varying opinions.
- **Ethical and Societal Implications:** The reliance on human feedback introduces ethical considerations. For instance, if the group of humans providing feedback is not diverse, the model might develop biases or fail to understand and respect cultural differences. This can lead to ethical issues and reduced effectiveness in diverse real-world environments.
- **Scalability and Cost:** Obtaining human feedback at scale can be expensive and time-consuming. While automated methods can be used to gather feedback, they often lack the nuanced understanding that human feedback provides. This makes RLHF less scalable compared to other methods that don’t rely on human input.

In summary, while RLHF offers significant advantages in training AI models, particularly for complex tasks like natural language understanding, it also presents unique challenges and limitations that need to be carefully managed to ensure effective and ethical AI development.

### Constitutional AI a transformative shift in the ethical paradigm

![Constitutional AI representation](https://miro.medium.com/v2/resize:fit:700/0*eIPDgidhW8CCX9D6)
*Constitutional AI representation | [link](https://www.linkedin.com/pulse/transformative-power-ai-digital-marketing-exploring-ethical-balduwa/)*

To address these challenges, the concept of Constitutional AI emerges as a promising solution, providing a structured framework to guide AI behavior within ethical and social boundaries.

This concept involves embedding a set of guiding principles or “constitutional” rules into the AI’s decision-making process, which can help mitigate issues related to bias, scalability, and ethical concerns.

Take a look at my article on Constitutional AI to delve deeper into this topic:

> **[Paper review: Constitutional AI Harmlessness from AI Feedback](/blog/constitutional-ai)**
> Explore the novel paradigm that will guide AI towards the ethical direction.

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*

![LatinX in AI (LXAI) logo](https://miro.medium.com/v2/resize:fit:700/1*1hX7TqaSHSNuD8BFChpwvw.png)
*LatinX in AI (LXAI) logo*

**Do you identify as Latinx and are working in artificial intelligence or know someone who is Latinx and is working in artificial intelligence?**

- Get listed on our directory and become a member of our member’s forum: [https://forum.latinxinai.org/](https://forum.latinxinai.org/)
- Become a writer for the LatinX in AI Publication by emailing us at [publication@latinxinai.org](mailto:publication@latinxinai.org)
- Learn more on our website: [http://www.latinxinai.org/](http://www.latinxinai.org/)

**Don’t forget to hit the 👏 below to help support our community — it means a lot!**
