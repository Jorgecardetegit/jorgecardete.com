---
title: "But why Python is so slow?"
description: "Exploring the trade-offs between ease of use and execution speed"
date: 2024-02-01
tags: [python, performance]
icon: "🐢"
cover: "/blog/covers/por-que-python-es-lento.jpg"
---

*Exploring the trade-offs between ease of use and execution speed. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/but-why-python-is-so-slow-da1a4fb9be92).*

![Created by the author with DALL E-3](https://miro.medium.com/v2/resize:fit:700/0*5gCsm9MXumW4iEDa)
*Created by the author with DALL E-3*

I n the coding community, it is well-known that the snake programming language **doesn’t win any races**.

I mean, Python is great and everybody loves it.

> “But is just slow…”

In this article, I will go through the different features of Python and we will understand why these make it **one of the most complete languages** nowadays — with the drawback of **not being so fast**.

But first, let´s grasp some fundamentals about programming languages.

### Levels of abstraction

As you may know, programming languages are often described by their level of abstraction.

- A **low level of abstraction** indicates that the language is **closer to the hardware** (difficult to interpret)
- A **high level** reveals that the code is **closer to the user** (easier to interpret).

![Levels of abstraction (from hardware to modern programming languages)](https://miro.medium.com/v2/resize:fit:700/1*OcSPIqq48saZU6eENg91Kw.png)
*Levels of abstraction (from hardware to modern programming languages) | Created by the author*

C++, PHP, Java, Python… are all considered **modern (or high-level) programming languages** as they can run in almost **any type of system**.

In assembly, you have to write a **distinct program** according to the **instructions of each specific processor** (you can´t run the same code on different CPUs).

> **For example**, if you create a program that prints “Hello world” and you send the code to your friend (which has a different computer model), by the time he tries to execute it, **it will probably fail**.

### Modern languages — The last level of abstraction

![Modern languages abstraction](https://miro.medium.com/v2/resize:fit:700/0*U7-cAHmg_ouBV1pV.png)
*Modern languages abstraction | [Source](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)*

Despite being the **highest abstraction from machine code**, there are also hierarchies in the last layer of the pyramid.

On one hand, you can find **procedural languages like C** where you need to know exactly what you’re doing step by step. This comes with the advantage of being **very efficient** and the disadvantage of being **complex** and **not so flexible**.

On the other hand, other languages make tasks easier by letting you work with more **readable** and **flexible code**.

This is the case of **Python**. Which you can use for almost anything and is **easy to implement** but has the downward of **not being so efficient** for certain tasks.

**But why exactly is Python so “slow”?**

Let´s revise some of the language features to answer this question.

### ## Interpreted language

In the first place, Python is an **interpreted language**, which means that the code is read and executed by a software program (called an interpreter), **line by line, at runtime**.

This is one way in which you can transform your code into machine code.

**Compiled languages** Another way you can make your code *“understandable by a machine”* is through the process of compilation.

In this case, the source code is transformed into machine code by a compiler before it is actually run on the computer.

![Compiled vs interpreted languages](https://miro.medium.com/v2/resize:fit:700/0*MGg4NfHYXU9g9PiN.png)
*Compiled vs interpreted languages | [Source](https://medium.com/from-the-scratch/stop-it-there-are-no-compiled-and-interpreted-languages-512f84756664)*

**# Why the interpreted way is slower?** In interpreted languages, each line of source code is translated into machine code ***on the fly***, during execution.

This means that every time a program runs, the interpreter must **parse**, **analyze,** and **execute the code**, which adds **overhead** compared to running pre-compiled machine code directly.

> **For example:** If a piece of code is run multiple times (e.g., inside a loop), an interpreter must **read and translate it each time it’s encountered**.In contrast, a **compiled program** would run the machine code **directly, without needing to re-translate it** each time it passes through the loop.

> **[The Difference Between Compiled and Interpreted Languages](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)**
> An illustrated guide to how modern languages turn source code into machine code

### ## CPython and its Global Interpreter Lock (GIL)

The **standard Python interpreter** is [CPython](https://en.wikipedia.org/wiki/CPython). It is written in **C** and **Python**, and it compiles **Python code into** [**bytecode**](https://en.wikipedia.org/wiki/Bytecode) **before interpreting it**.

**To prevent multiple native threads** **from executing Python bytecodes at once**, CPython uses the **Global Interpreter Lock**.

This lock is necessary because **CPython’s memory management is not thread-safe**.

## Get Jorgecardete’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

However, it can be a **significant bottleneck in multi-threaded programs**, limiting the performance gains from [**multi-threading**](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)) on **multi-core processors**.

![Global Interpreter Lock workflow](https://miro.medium.com/v2/resize:fit:700/0*ZaBCUF-0GXqqW_YD.png)
*Global Interpreter Lock workflow | [Source](https://subscription.packtpub.com/book/programming/9781787285378/1/ch01lvl1sec13/the-limitations-of-python)*

### ## Dynamic typing

In addition, Python is **dynamically typed**, which means that you don´t have to **declare the type of a variable** when you initialize it.

**# But how does this affect efficiency?**

Well, in dynamically typed languages, **types are determined at runtime**.

This means the interpreter needs to do **type-checking** every time it **executes a piece of code**.

This requires **additional processing** to determine the type of each variable and how operations should be performed based on those types.

**# And what is the antithesis of dynamic typed languages?**

Static typed languages!

In this case the type of a variable is known at **compile time instead of at runtime**.

As a consequence, the types are known at compile time, and **compilers can optimize the code execution more aggressively**. This results in **faster but not so flexible** programs.

Some languages that use this approach are [C++](https://en.wikipedia.org/wiki/C%2B%2B) and [Rust](https://en.wikipedia.org/wiki/Rust_%28programming_language%29).

![Static vs Dynamic typed languages](https://miro.medium.com/v2/resize:fit:641/1*uyxStLBaq-v39Uq5RfCdmQ.png)
*Static vs Dynamic typed languages | [Source](https://medium.com/@mhaipassakunsiri/static-vs-dynamic-typing-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B0-37a2bd6173fe)*

### ## Garbage collection

Garbage collection is a form of **automatic memory management** that a programming language runtime system uses to **reclaim memory that is no longer in use by the program**.

Python automatically manages **memory allocation** and **deallocation** for its objects through garbage collection.

The primary method it uses for garbage collection is **reference counting**. Each object in Python has a **reference count**, which is the **number of references** pointing to it.

When the reference count **drops to zero**, meaning no references to the object remain, it is **immediately removed from memory**.

![Garbage Collector workflow](https://miro.medium.com/v2/resize:fit:700/0*L68nF0DjYLAoG2go.png)
*Garbage Collector workflow | [Source](https://jenaiz.com/2022/02/understanding-how-the-python-garbage-collector-works/)*

However, garbage collection is a **double-edged sword**…

It greatly **simplifies memory management** by automatically cleaning up **unused objects**, which helps prevent **memory leaks** and **other bugs** related to manual memory management.

But it introduces **overhead** and **unpredictability** that can impact the **performance of an application**.

> **[Demystifying Python’s Garbage Collector: Cleaning Up the Mess](https://medium.com/quantrium-tech/demystifying-pythons-garbage-collector-cleaning-up-the-mess-767662076ff5)**
> A Closer Look at the Garbage Collector

### Conclusion

In conclusion, the four main features that make Python slow are:

- An **interpreted execution** that adds a layer of abstraction between the code and the machine language, slowing down the execution compared to compiled languages.
- A **Global Interpreter Lock** that stops multi-threaded programs from fully utilizing multi-core processors.
- **Dynamic typing,** that determines the type of an object at runtime, which means more work for the interpreter during execution.
- And in the last place, **garbage collection**, as collecting unused objects can add latency to the program execution, especially when dealing with a large number of objects or complex data structures.

> But let me tell you something…

If you´re a Python lover and you want to build a **fast program**. Is not the **end of the world**!

There are many ways in which you can **speed up** your Python code.
In fact, have you ever heard about **Cython**, **Numba**, **Numpy**, **PYPY**…?

If the answer is no, don´t worry because we´ll be covering them soon, **so stay tuned**!

### Bibliography

- [https://docs.python.org](https://docs.python.org)
- [https://www.geeksforgeeks.org/garbage-collection-python/](https://www.geeksforgeeks.org/garbage-collection-python/)
- [https://www.baeldung.com/cs/statically-vs-dynamically-typed-languages](https://www.baeldung.com/cs/statically-vs-dynamically-typed-languages)
- [https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0](https://medium.com/young-coder/the-difference-between-compiled-and-interpreted-languages-d54f66aa71f0)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*
