---
title: "Rust — A New Titan in Data Science"
description: "Revolutionizing Machine Learning with high-performance computation"
date: 2024-02-20
tags: [rust, machine-learning, data-science]
icon: "🦀"
---

*Revolutionizing Machine Learning with high-performance computation. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/rust-a-new-titan-in-data-science-d449463078b2).*

![Image created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:1000/0*vx1zsEPAAIedzzbY)
*Image created by the author with DALL-E 3*

### Table of contents

1. [Data Science landscape](#0f52)
2. [Rust Safety](#-rust-safety)
3. [Rust speed](#-rust-speed)
4. [Rust concurrency](#-concurrency)
5. [Rust in Data Science](#rust-in-data-science)
6. [Rust integration with popular frameworks](#rust-integration-with-popular-frameworks)
7. [Conclusion](#conclusion)

From its humble beginnings to actuality, the landscape of data science has been marked by a kind of ***‘war’*** between the different **programming languages**, each offering unique strengths and satisfying different needs.

At the forefront of this battle are **Python** and **C++**, both widely used but for different reasons.

- ***Python*** — for its interpretability and rich ecosystem.
- ***C++*** — for its speed and efficiency.

> But what do these features mean?

Let´s delve a bit deeper to understand them better…

Ideally, a programming language **suited for data science** should possess several **key attributes**:

1. **Easy to learn and use**, with a straightforward syntax for accessibility.
2. Excel in **handling** and **processing** large datasets and a wide variety of data formats support.
3. **Rich library ecosystem** for data analysis, machine learning, and visualization.
4. **High performance** and **scalability** for complex computations.
5. **Reproducibility** and **transparency**, enabling **clear documentation** and easy sharing of code and results.

![Photo by ian dooley on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*lnMJYi7h13qIz9uN)
*Photo by [ian dooley](https://unsplash.com/@sadswim?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

No language excels in all these tasks.

### Python

On one hand, **Python** is very good at being an **interpretable language**. Its syntax is easy to use and it counts with a very big ecosystem of libraries.

On the other hand, **Python** has the downwards of **not being as fast as C++** which is a *lower-level* language that works with a **faster execution time**.

### C++

**C++** is more efficient than Python, however, it’s not perfect. It comes with the disadvantage of being more **complex and less flexible** and as a result, it has a **smaller community** and a much **narrower ecosystem**.

> (While Python and C++ stand out as the **most representative languages**, there are **numerous others** extensively employed in the realm of **Machine Learning**).

![Other programming languages in data science](https://miro.medium.com/v2/resize:fit:602/0*os5cjeYGQc0io0x7.png)
*Other programming languages in data science | [Source](https://www.menti.club/intro-to-data-science/programming-resources)*

## Rust

Rust was created by [Graydon Hoare](https://github.com/graydon?tab=overview&from=2024-01-01&to=2024-01-20) in **2006**, who was working at [Mozilla](https://en.wikipedia.org/wiki/Mozilla) by the time. It began as a personal project, driven by the desire to create **a more secure and efficient language** for [system-level programming](https://en.wikipedia.org/wiki/Systems_programming).

In 2009, **Mozilla began sponsoring the project**. The goal was to create a language that could power the next generation of **web applications** and **services**, particularly in **performance-critical components of Firefox** and its layout engine, [Servo](https://github.com/servo/servo/wiki/Servo-Layout-Engines-Report).

Rust drew inspiration from several existing languages. Its syntax has **similarities to C++** but also incorporates features from languages like [**Erlang**](https://www.erlang.org/) and [**Haskell**](https://www.haskell.org/), especially in terms of its approach to **concurrency** and **memory safety**.

**In general terms:**

> Rust brings to the table a unique blend of features, **primarily focusing on** **performance**, in a similar way to **C++**, but with modern language features that **make development** **safer**.

### But why should Rust matter to you as a data scientist?

![Why Rust?](https://miro.medium.com/v2/resize:fit:700/0*ykGlHUFmA-6TL550)
*Why Rust? | [Source](https://medium.com/paritytech/why-rust-846fd3320d3f)*

The answer lies in its **core principles**:

- [*Safety*](https://medium.com/p/d449463078b2/edit#2001)
- [*Speed*](https://medium.com/p/d449463078b2/edit#ce33)
- [*Concurrency*](https://medium.com/p/d449463078b2/edit#78ad)

## # Rust Safety

![Photo by Markus Spiske on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*bPFGQndbdKp1DLFl)
*Photo by [Markus Spiske](https://unsplash.com/@markusspiske?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

The key features that define **safety** in rust are:

- Memory management (Ownership System)
- Borrowing and references
- Lifetimes
- Error handling

Think of computer memory as a **big desk**. When you’re working on a project, you use your desk to hold all the **papers**, **books**, and **tools** you need.

Just like you might have **drawers** on your desk for storing things you don’t need right now but might need later, a computer has **different types of storage**.

### RAM — Random Access Memory

The **main desk space** is like the computer’s *“RAM”* (Random Access Memory).

Computer RAM, is a critical component of a computer system that functions as its **immediate memory storage**, allowing the processor to **access data and instructions quickly**.

Unlike other forms of long-term storage, **RAM is** **volatile**, which means it **loses its contents when the computer is turned off.**

### Hard drive

Following our analogy, the drawers of the desk are like the **computer’s hard drive**.

A hard drive, is a fundamental component of modern computers, acting as the **primary long-term storage device**. It’s where a computer stores its **operating system**, **applications**, **files**, and data when they’re not in use.

Unlike RAM, which is volatile and clears its data when the computer is turned off, a hard drive **retains its data indefinitely until it is erased or overwritten.**

![Photo by ian dooley on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*86ak3XB15OR9-hei)
*Photo by [ian dooley](https://unsplash.com/@sadswim?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

## 1.- Ownership — memory management

*Ownership* is a **set of rules that govern how a program manages memory**. It refers to how different parts of the **system’s memory are allocated** and **controlled**.

Imagine having an assistant who **periodically checks your desk**, removing items you’re done with so **your workspace remains uncluttered and efficient.**

All programs have to manage the way they use a **computer’s memory while running**. Some languages have **garbage collection** that regularly looks for **no longer-used memory** as the program runs; in other languages, the programmer must **explicitly allocate and free the memory**.

### Ownership in Rust

Rust manages memory through a system of ownership with a **set of rules that the compiler checks**. If any of the rules are violated, **the program won’t compile**.

![Ownership rules in Rust](https://miro.medium.com/v2/resize:fit:700/0*Q4Akyrjy6uZzagB7.png)
*Ownership rules in Rust | [Source](https://www.reddit.com/r/learnrust/comments/wft9zs/ownership_rules_visualised/)*

None of the features of ownership will **slow down a Rust program** while it’s running.

This ensures that Rust programs **not only benefit from enhanced memory safety and efficiency** but also **maintain optimal runtime performance**, as the ownership model imposes **no runtime overhead**.

> **[Rust’s Ownership System: Memory Safety Without Garbage Collection](https://doziestar.medium.com/rusts-ownership-system-memory-safety-without-garbage-collection-c820542aaf14)**
> Rust is a system computer language that focuses on security and performance. Because of its distinctive ownership and…

## 2.- Borrowing and References

Borrowing and references are **fundamental concepts in Rust** that work **hand-in-hand** with the ownership system to ensure **memory safety and data race protection** **without the overhead of garbage collection.**

### References

References come in two forms; **mutable** (&T) and **immutable** (&mutT).

You can either have **any number of immutable references** or **one mutable reference**, but not both at the same time.

For instance, take a look at the following **snippet of code**:

```rust
fn main() {
    let x = 5; // `x` is immutable by default
    println!("The value of x is: {}", x);
    x = 6; // This line would cause a compile error because `x` is not mutable

    let mut y = 5; // `y` is mutable
    println!("The value of y is: {}", y);
    y = 6; // This is allowed because `y` is mutable
    println!("The value of y is: {}", y);
}
```

- `x` is an **immutable variable**, so once it’s initialized with a value it **can´t be changed**.
- `y` is a **mutable** declared with the `mut` keyword. This means **you can change its value after it’s been initialized**.

### Borrowing

Borrowing is the act of **creating a reference to a valu**e, which you can think of as *“borrowing”* the value.

When you borrow a value, **you temporarily take a reference to it** **without taking ownership**, allowing the original owner to retain ownership and ensuring **the value is not dropped while it’s still in use**.

![Ownership and Borrowing system](https://miro.medium.com/v2/resize:fit:700/0*r6BLNyJXKCA8RxGn.png)
*Ownership and Borrowing system | [Source](https://medium.com/coinmonks/understanding-ownership-in-rust-with-examples-73835ba931b1)*

## 3.- Lifetimes

A lifetime is a construct that the **compiler** uses to ensure **all borrows are valid**.

**Every reference in Rust has a lifetime**, which is the scope for which that reference is valid.

Let´s see an **example** to understand it better:

```rust
fn main() {
    let i = 3; // Lifetime for `i` starts.
    {
        let borrow1 = &i; // `borrow1` lifetime starts.
        println!("borrow1: {}", borrow1);
    } // `borrow1` ends.
    {
        let borrow2 = &i; // `borrow2` lifetime starts.
        println!("borrow2: {}", borrow2);
    } // `borrow2` ends.
} // Lifetime for `i` ends.
```

In this example, `i` has the longest lifetime because its scope entirely encloses both `borrow1` and `borrow2`. The duration of `borrow1` compared to `borrow2` is irrelevant since they are disjoint.

### Why does this promote safety?

Lifetimes ensure that **references are always valid** and prevent *dangling references*.

By enforcing these constraints at compile time, **Rust can prevent a whole class of bugs common in other languages without needing** **a garbage collector**.

## 4.- Error handling

Rust prioritizes identifying and resolving errors **during compilation** rather than **at runtime**.

This approach aims to ensure that as many errors as possible **are caught before the program runs**, reducing **the** **likelihood of unexpected crashes or behaviors** in a running application.

### Enum types

Rust **doesn’t have exceptions** like many other programming languages.

It employs special enum types (`Result` and `Option`) to handle situations that could potentially result in errors.

- The `Result` type is used for operations that can **succeed or fail**.
- The `Option` type is used for operations that **may or may not return a value**.

![Result Enum in Rust](https://miro.medium.com/v2/resize:fit:700/0*wu96YljC9kWnx-_V.jpg)
*Result Enum in Rust | [Source](https://blog.rahul.onl/posts/2021-01-14-rust-result.html)*

## # Rust speed

Rust’s performance is one of its **most popular features**.

Rust is designed to be as fast as — and in some cases, faster than — **C and C++**, which have been the **benchmarks for system-level programming languages** **in terms of speed**.

### 1.- Compiled

Rust is a **compiled language**, meaning its code is **translated directly into machine code** that the processor can execute, resulting in faster performance.

Other languages such as **Python**, are **interpreted**. This means that they are executed by an **interpreter** at **runtime**, which adds overhead and makes them **slower**.

![Compiled vs interpreted language](https://miro.medium.com/v2/resize:fit:700/0*2LKnKmDG0FFKAQZh.png)
***Compiled** **vs** **interpreted** language | [Source](https://medium.com/from-the-scratch/stop-it-there-are-no-compiled-and-interpreted-languages-512f84756664)*

### 2.- Static typing

Rust uses **static typing**, where variable types are known at **compile time**.

This allows the compiler to **optimize** the code more effectively.

Languages such as **JavaScript** or **Python** use **dynamic typing**, which offers flexibility but can lead to **more runtime checks** and **less efficient code**.

![Static vs Dynamic typing](https://miro.medium.com/v2/resize:fit:700/0*JgNCDUKjipxxu1YY)
***Static** vs **Dynamic** typing | [Source](https://hexlet.io/courses/intro_to_programming/lessons/types/theory_unit)*

### 3.- Memory management

As we stated previously, Rust has a **unique approach** to memory management with its o**wnership system**.

Partly this is because Rust doesn´t have a **garbage collector**.

**Garbage collection (GC)** is an automatic memory management feature found in many programming languages, like **Java** and **Python**.

Its primary role is to **identify** and **free up** memory that is no longer in use by the program, which helps **prevent memory leaks** and other **related issues**.

![Garbage Collection](https://miro.medium.com/v2/resize:fit:700/0*Q02S3yHA2f9mkDPj.png)
*Garbage Collection | [Source](https://medium.datadriveninvestor.com/how-does-garbage-collection-work-in-java-da8f75ec6899)*

**Rust** handles memory more **efficiently** without this automatic process.

Instead of **including a garbage collector**, it counts with a very advanced system of **ownership**, **borrowings**, and **lifetimes**.

This ensures both **efficiency and safety** in memory usage.

### 4.- Zero-Cost Abstractions

Zero-cost abstractions, mean that you can use **higher-level programming constructs** without a **runtime cost**.

This feature enables Rust to provide both **high-level abstractions** and **high performance**.

**Abstractions** 
They are ways to hide **complex details behind simpler interfaces**. For instance, a **function** is an abstraction; it **hides** the steps of a process behind a **simple function call**.

> **High-level programming languages** themselves are abstractions, **hiding the complexities** of machine code or assembly language behind more **human-readable syntax**.

**Zero-cost** 
It means that using these abstractions **doesn’t make your program slower** than it would be if you had written **lower-level code** (like C or assembly) to **achieve the same functionality.**

![Zero Cost Abstractions in Rust](https://miro.medium.com/v2/resize:fit:700/0*1besRfLZ80IfrIuE)
*Zero Cost Abstractions in Rust | [Source](https://www.linkedin.com/posts/nachiketkanore_distributedsystems-algorithms-datastructures-activity-7108441832669274113-OX9O/)*

**But isn´t this the idea behind high-level programming languages? That they are “more human-readable” but slower?**

Here enters the magic of **Rust’s compiler!**

Many of Rust’s abstractions are evaluated and optimized during **compile time.**

This means that the compiler does the work to translate **high-level constructs** into efficient **low-level machine cod**e and as a result, the runtime performance **isn’t “affected” by these abstractions**.

Rust’s compiler, `rustc`, uses **LLVM (Low-Level Virtual Machine**) as its backend, which is known for its ability to heavily optimize code. This allows **high-level Rust programs** to be compiled into very **efficient machine code**.

> **[Unlocking the Power of LLVM IR: A Comprehensive Introduction to LLVM Intermediate Representation…](https://medium.com/@andrew_johnson_4/unlocking-the-power-of-llvm-ir-a-comprehensive-introduction-to-llvm-intermediate-representation-e1ecb1cb365d)**
> Introduction

## # Concurrency

**What is concurrency?** Imagine you have **two queues of customers** waiting to use one coffee machine and **individuals from both queues** have to take turns to use it.

This is concurrency, where multiple tasks are handled by **one resource**, but they are **not necessarily happening at the same time**; they may be processed in an **overlapping manner**.

![Concurrent vs parallel programming](https://miro.medium.com/v2/resize:fit:600/0*ErT3ztKmU_uoH2Ow.jpg)
*Concurrent vs parallel programming | [Source](https://joearms.github.io/published/2013-04-05-concurrent-and-parallel-programming.html)*

Rust makes this **‘task handling’** safer and easier, reducing the chances of mistakes that can occur when tasks overlap.

**Why concurrency is remarkably good in Rust?** Rust’s approach to concurrency is built on the foundation of its **memory safety principles**, leveraging the **ownership**, **borrowing**, and **type system** to prevent common concurrency errors.

This design allows developers to write **highly concurrent applications** that are both **safe and efficient**.

As you may have observed, Rust is built upon **three foundational pillars:**

- Ownership
- Borrowing
- Lifetimes

Together, these concepts form the **backbone of the language**, underpinning its core attributes of **speed, safety, and concurrency**.

## Rust in Data Science

As a result of all the features we have gone through, Rust has become a very popular language and **is making waves in data science**.

I will explore its **main contributions to this field** and the general impact is **provoking in the community.**

In this article, I won´t go through **Rust syntax**, however, there is one concept you should know about before continuing *— Rust crates.*

### Crates

A crate is a **compilation unit in Rust**, essentially a **package of code** that can be compiled into a **binary** or a **library**.

*To keep it simple, if you come from* ***Python or R*** *think of crates as* ***libraries or packages****.*

![Photo by Anton Repponen on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*k653f4333SB8tA9l)
*Photo by [Anton Repponen](https://unsplash.com/@repponen?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

## # ndarray — The “rustian” Numpy

`ndarray `is a Rust crate that provides powerful tools for **N-dimensional array computation**, akin to the famous [**Numpy library**](https://numpy.org/).

It's particularly useful for tasks like **linear algebra**, **numerical analysis**, and **data manipulation** on multi-dimensional data structures.

Key features include:

- **Interoperability:** It can interoperate with other Rust libraries and can be integrated with Python via [**FFI (Foreign Function Interface)**](https://en.wikipedia.org/wiki/Foreign_function_interface#:~:text=A%20foreign%20function%20interface%20(FFI,into%20binary%20dynamic%2Dlink%20library.).
- **Performance:** As a Rust library, `ndarray` benefits from performance and safety, especially when dealing with large datasets or computationally intensive operations.
- **Flexibility:** The library supports various array layouts and can handle both **fixed-size** and **dynamic arrays.**

> **[The Ultimate Ndarray Handbook: Mastering the Art of Scientific Computing with Rust](https://towardsdatascience.com/the-ultimate-ndarray-handbook-mastering-the-art-of-scientific-computing-with-rust-ef5ab767212a)**
> An overview of different Rust’s built-in data structures and a deep dive into the Ndarray library

## # Polars — An improved version of pandas

`Polars` is a DataFrame library built in Rust, offering high-performance data manipulation and analysis capabilities.

It is designed for efficiency, leveraging Rust’s fast execution and memory safety.

![Polars vs pandas](https://miro.medium.com/v2/resize:fit:700/0*paHzG6aYUtg7X4lM.png)
*Polars vs pandas | [Source](https://medium.com/cuenex/pandas-2-0-vs-polars-the-ultimate-battle-a378eb75d6d1)*

Some features of `Polars`include:

- **Fast computations:** `Polars` is known for its speed, especially in comparison to `Pandas`, making it suitable for large datasets.
- **Ease of use:** It provides a *Python API*, allowing **Python developers** to benefit from **Rust’s performance** without needing **Rust knowledge**.
- **Parallel execution:** The library is designed with **parallelization** in mind, resulting in **significantly faster operations** by default.
- **Versatile data handling:** `Polars` supports various data transformations and is compatible with multiple file formats for data reading and writing.

> **[Rust Polars: Unlocking High-Performance Data Analysis — Part 1](https://towardsdatascience.com/rust-polars-unlocking-high-performance-data-analysis-part-1-ce42af370ece)**
> Exploring The World of Rust’s Polars, Series, and Beyond

> ***Polars documentation:***[https://github.com/pola-rs/polars](https://github.com/pola-rs/polars)[https://www.pola.rs/](https://www.pola.rs/)

## # Plotters — A visualization crate

Plotters is a comprehensive and flexible **drawing crate** in Rust, primarily focused on data plotting for both [**WebAssembly (WASM)**](https://webassembly.org/) and **native application**s.

![Various Plotters graphs](https://miro.medium.com/v2/resize:fit:700/0*2ieR2k77vBu932VX.png)
*Various Plotters graphs | [Source](https://towardsdatascience.com/rustic-data-data-visualization-with-plotters-part-1-7a34b6f4a603)*

Plotters include:

- **Versatile plotting capabilities:** It´s designed for rendering a wide range of figures, plots, and charts.
- **Support for multiple backends:** It supports various backends including **bitmap**, **vector graph**, **piston window**, **GTK/Cairo**, and **WebAssembl**y, offering flexibility in how plots are rendered and displayed.
- **Integration with Jupyter Notebook:** `Plotters` can be used interactively with [Jupyter Notebook](https://jupyter.org/).

*(Plotters provide various demo projects, allowing users to see the library in action and learn from real-world examples:* [*https://docs.rs/plotters/latest/plotters*](https://docs.rs/plotters/latest/plotters/)*).*

You can also **check out** the following notebook for a practical tutorial:

> **[How To Create Plot In Rust](https://towardsdatascience.com/how-to-create-plot-in-rust-fdc6c024461c)**
> A Gentle Introduction To Rust Plotters

## Rust integration with popular frameworks

Now that we’ve gained insight into some of **Rust’s most popular data science libraries**, you might be wondering about the current status of [*Tensorflow*](https://www.tensorflow.org/), [*Pytorch*](https://pytorch.org/), and [*HuggingFace*](https://huggingface.co/) — the **three leading frameworks** **in deep learning**.

I´ll make a quick review of **how Rust is being integrated into these giants.**

![Rust, SmartCore, Linfa, Tensorflow, Pytorch](https://miro.medium.com/v2/resize:fit:637/1*3DCL4mvfFUOthv56UsIH-Q.png)
*Rust, SmartCore, Linfa, Tensorflow, Pytorch | [Source](https://medium.com/@chriskaykos/machine-learning-in-rust-is-it-worth-learning-it-31da096de2b0)*

## # TensorFlow / Rust

A crate called `tensorflow` provides Rust bindings for TensorFlow.

This means that Rust can be used to **interact with this framework**, allowing developers to leverage **TensorFlow's** capabilities within a Rust environment.

***Check out*** *the* ***official GitHub page****:* [*GitHub — tensorflow/rust: Rust language bindings for TensorFlow*](https://github.com/tensorflow/rust)

**Bindings** In the context of programming, a binding is **a link between a property (like a variable or a function) and a specific value** or action.

> **TensorFlow bindings for Rust**, are a set of libraries or interfaces that allow the Rust programming language to **interact with TensorFlow**.

### Capabilities and extensions

The Rust bindings for TensorFlow include various modules like `expr` for building **computation graphs**, `io` for reading and writing **TFRecords** (TensorFlow's preferred on-disk data format), `ops` for building **standard operations**, and `train` for **building and training models**.

These extensions enable the **eager execution of kernels** and facilitate a wide range of **machine-learning tasks.**

> **[Training Keras Models using the Rust TensorFlow Bindings](https://towardsdatascience.com/training-keras-models-using-the-rust-tensorflow-bindings-941791249a7)**
> How to create a Keras-Model and use it in Rust for training and prediction

### Example projects

This crate is **quite recent**, however, **some example projects** have already been created.

There is one **representative example in GitHub** of a neural network implementation using **TensorFlow bindings** by **Michael Taylor**.

***Link*** *to repository:* [*https://github.com/roqvist/rust-tensorflow-examples*](https://github.com/roqvist/rust-tensorflow-examples)

There is another famous repository that contains projects like **Fashion MNIST** and **object detection**.

***Link*** *to the repository:* [*GitHub — emergent/tensorflow-rust-examples: sample codes using tensorflow-rust for the book「機械学習の炊いたん」*](https://github.com/emergent/tensorflow-rust-examples)

## # PyTorch / Rust

The `tch-rs` crate provides Rust bindings for the **C++ API of PyTorch**.

This aims to create **thin wrappers around PyTorch's API**, allowing Rust developers to access **PyTorch functionalitie**s.

The goal is to stay **as close as possible to the original C++ API**, with the potential for **more idiomatic Rust bindings** to be developed on top of this.

![Flamethrower (representing PyTorch)](https://miro.medium.com/v2/resize:fit:700/0*UzVxjQKO_69q0txa.png)
*Flamethrower (representing **PyTorch**) | [Source](https://github.com/nogibjj/rust-pytorch-gpu-template)*

### Example projects

In a similar way to the `tensorflow`crate, the **integration of PyTorch with Rust is still in its infancy**.

I will share with you some interesting projects t**he community has developed**.

This post shows how to create a **neural network from scratch** with the `tch-rs` crate*:* [*https://www.swiftdiaries.com/rust/pytorch/*](https://www.swiftdiaries.com/rust/pytorch/)

This GitHub repository will teach you to **load and run a PyTorch** **model** in Rust*:* [*tch-rs/examples/jit/README.md at main · LaurentMazare/tch-rs · GitHub*](https://github.com/LaurentMazare/tch-rs/blob/main/examples/jit/README.md)

I also found this great article on **Medium**:

> **[Machine Learning and Rust (Part 4): Neural Networks in Torch](https://towardsdatascience.com/machine-learning-and-rust-part-4-neural-networks-in-torch-85ee623f87a)**
> Can we use PyTorch in Rust? What are Rust bindings? What’s tch-rs? A look on neural networks in Rust

## # Hugging face — Rustformers and Fast Tokenizers

Hugging Face has also **shown interest in Rust** through the creation of the *“rustformers”* group.

This group aims to make it easier for Rust developers to **leverage the power of LLMs**. They have developed an ecosystem of **Rust libraries for working with large language models**, known as `llm`.

`llm` is built on top of the fast, efficient **GGML library** **for machine learning** and it also counts with A **CLI application**, `llm-cli`which provides an **interface for interacting with supported models.**

Some examples of supported **LLMs** in this crate include:

- [BLOOM](https://huggingface.co/rustformers/bloom-ggml)
- [mpt-7b](https://huggingface.co/rustformers/mpt-7b-ggml)
- [GPT-J](https://huggingface.co/rustformers/gpt-j-ggml)
- [open-llama](https://huggingface.co/rustformers/open-llama-ggml)

Link to `llm` GitHub: [https://huggingface.co/rustformers/open-llama-ggml](https://huggingface.co/rustformers/open-llama-ggml)

![Rustic llama](https://miro.medium.com/v2/resize:fit:512/0*b36XlImNGBUfxyHN.png)
*Rustic llama | [Source](https://github.com/rustformers/llm?tab=readme-ov-file)*

### Fast tokenizers

Another **clear integration** in Hugging Face is the group of `fast tokenizers`. These tokenizers are implemented in Rust **for increased speed and efficiency.**

They are part of the **Hugging Face’s tokenizers library**, which is primarily **Python-based**, but the tokenization process is handled by Rust **to leverage its performance advantages**.

The use of Rust provides **significant speed improvements**, especially when processing **large datasets** or performing tasks that require **rapid tokenization**.

***Check out*** *the GitHub repository:* [*GitHub — huggingface/tokenizers: 💥 Fast State-of-the-Art Tokenizers optimized for Research and Production*](https://github.com/huggingface/tokenizers)

Take a look at the official page of **Tokenizers in Hugging Face**: [Tokenizers (huggingface.co)](https://huggingface.co/docs/tokenizers/index)

## Conclusion

The integration of Rust in AI marks a significant advancement, merging Rust’s **performance**, **safety**, and **efficiency** with the evolving needs of **artificial intelligence and data science**.

From fast tokenizers in **Hugging Face’s NLP models** to high-performance data manipulation with **Polars** and **ndarray**, and integration with major machine learning frameworks like **TensorFlow** and **PyTorch**, Rust is **proving to be a valuable asset**.

This synergy **between Rust and AI** is not just enhancing existing tools but also **paving the way for innovative approaches in AI development and research.**

### Bibliography

1. [*Community — Rust Programming Language (rust-lang.org)*](https://www.rust-lang.org/community)*.*
2. [*What is Rust and why is it so popular? — Stack Overflow*](https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/)*.*
3. [*The Rust Community · The Rust Programming Language (rust-lang.org)*](https://prev.rust-lang.org/en-US/community.html)*.*
4. [*The Ultimate Ndarray Handbook: Mastering the Art of Scientific Computing with Rust*](https://towardsdatascience.com/the-ultimate-ndarray-handbook-mastering-the-art-of-scientific-computing-with-rust-ef5ab767212a)*.*
5. [*Rust Polars: Unlocking High-Performance Data Analysis — Part 1*](https://towardsdatascience.com/rust-polars-unlocking-high-performance-data-analysis-part-1-ce42af370ece)*.*
6. [*TensorFlow Rust: Official Rust language bindings for TensorFlow*](https://github.com/tensorflow/rust)*.*
7. [*tch-rs: Rust binding for the C++ API of PyTorch*](https://github.com/LaurentMazare/tch-rs)*.*
8. [*Loading and Running a PyTorch Model in Rust: A tutorial on how to load and run a PyTorch model in Rust.*](https://github.com/LaurentMazare/tch-rs/blob/main/examples/jit/README.md)
9. [*Rustformers: A group that focuses on making it easy for Rust developers to access the power of large language models (LLMs).*](https://huggingface.co/rustformers)
10. [*rust_tokenizers: Implementations of common tokenizers used in state-of-the-art language models.*](https://docs.rs/rust_tokenizers/latest/rust_tokenizers/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*

Also, make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/thedeephub)**
> Your data science hub. A Medium publication dedicated to exchanging ideas and empowering your knowledge.
