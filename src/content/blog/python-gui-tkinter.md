---
title: "Build your first Python GUI with Tkinter"
description: "Creating a desktop app with the Python Toolkit"
date: 2024-02-05
tags: [python, tkinter, gui]
icon: "🪟"
cover: "/blog/covers/python-gui-tkinter.jpg"
---

*Creating a desktop app with the Python Toolkit. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/build-your-first-python-gui-with-tkinter-c44ac52a83b1).*

![Photo by Kari Shea on Unsplash](https://miro.medium.com/v2/resize:fit:700/0*Zk8j0c-vOv7DM5X4)
*Photo by [Kari Shea](https://unsplash.com/@karishea?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

If you are new to the **data science world**, I´m sure that you might be **creating models** constantly. And this is a great skill, but **what happens when you have finished it?**

You have to put it **into production!**

Sometimes this might be **easier** and others **it will be harder.**

However, what´s granted is that if you want to show what you have built to others, you will need **to create an attractive interface for them**.

A great option if you have no experience is **Tkinter**. While it may not commonly be used for creating *“professional”* applications it still has **many use cases** and is a great option for **getting introduced into this field**.

## Tkinter fundamentals

The Tkinter module **already comes installed with Python**. It runs on most **operating systems** (Windows, Mac, Linux…) without any additional dependencies.

The first thing you need to do is to import the **Tkinter module.**

```python
import tkinter as tk
```

In addition, every program we build will be initialized with a **root window**, which is an **instance of Tkinter´s Tk class**.

```python
window = tk.Tk()
```

Now, after executing the code, a **new window** will pop up on your screen. Depending on your **operating system** it will look like one of the following:

![Pop-up window in Tkinter](https://miro.medium.com/v2/resize:fit:700/0*yaVyGPdQe7Krbaos.jpg)
*Pop-up window in Tkinter | [Source](https://realpython.com/python-gui-tkinter/)*

Once the window has been created, we can start adding **widgets** — these are the elements **that will compose our GUI.**

### Types of widgets

As you might imagine, Tkinter comes with a **great amount of widgets**. Almost anything you can imagine that you might use for building a **Graphical User Interface**.

These are some of the most common ones:

- Buttons (tk.Button)
- Label (tk.label)
- Entry (tk.entry)
- Text (tk.text)
- Frame (tk.frame) — Used to **organize other widgets** or to create **complex layouts**.
- Canvas (tk.canvas) —Used to **draw shapes**, such as lines, ovals, polygons, and rectangles, in your application.

![Python tkinter widgets](https://miro.medium.com/v2/resize:fit:541/0*gKNKkRSd43BRiZ74.jpg)
*Python tkinter widgets | [Source](https://www.studytonight.com/tkinter/python-tkinter-widgets)*

Let’s take a look at some examples of how we can integrate these widgets into our program.

1.- Adding a Button

```python
import tkinter as tk

windw = tk.Tk()

# Making the button bigger by adjusting its height, width, and adding padding
button = tk.Button(root, text="Hello", height=3, width=10, padx=20, pady=20)
button.pack()

window.mainloop()
```

2.- Adding a line with Canvas

```python
import tkinter as tk

window = tk.Tk()

# Create a canvas widget
canvas = tk.Canvas(root, width=400, height=300)
canvas.pack()

# Draw a line on the canvas
# Parameters: x1, y1, x2, y2
canvas.create_line(50, 50, 250, 150, fill="blue", width=5) 

window.mainloop()
```

### Tkinter layouts

Tkinter provides several **geometry managers** that control the **layout of widgets within a container**.

These managers allow you **to organize your GU**I in a structured and flexible manner.

The primary layout managers are:

- `pack()` — Arranges **widgets** in a block, allowing them to occupy the entire available **width** or **height** in their parent container.
- `grid()` — Places **widgets** in a **grid of rows and columns**, offering a more **structured layout** option.
- `place()` — Enables **absolute positioning of widgets** by specifying their **exact coordinates** within the container.

I´ll be using `pack()` in this tutorial which is the **simplest one**.

### Event loop

You may also have noticed in the examples we built that **at the end** all of them contained the argument `window.mainloop()`.

This is included because after setting up the GUI, the application enters what is known as *“the event loop”* where **it waits for user interaction**, such as **button clicks** or **key presses**, and responds accordingly.

Once our program execution is complete, we will **exit this loop**.

## General structure of a Tkinter program

Believe it or not, we have gone through **all the steps** you need to create an app with Tkinter.

Let´s revise them:

1. Import the T**kinter Module.**
2. Create a **main application window.**
3. **Add widgets** to the application.
4. At the end of the program, create the **event loop.**

Now we are all set to create our first Tkinter application — I´ll begin with a very basic example:

```python
import tkinter as tk

def on_button_click():
    label.config(text="Hello, Tkinter!")

root = tk.Tk()
root.title("Simple Tkinter Example")

label = tk.Label(root, text="Press the button")
label.pack()

# Modifying the button to make it bigger
button = tk.Button(root, text="Click me", command=on_button_click, 
                   height=3, width=10, padx=20, pady=20)
button.pack()

root.mainloop()
```

In this program, `button` uses the `command` method which is used to define a **callback function** that will be called when **the button is clicked**.

I hope with this example, you were able to understand better how the **different widgets interact with each other** and how programs are typically **structured**.

Now let´s use a more advanced script that closely resembles a **real-use case**.

We´ll be creating a basic **to-do list**.

### To-do list with Python Tkinter

The to-do list will consist of a simple program where **you can add your task**, and it will get **automatically saved** in a small space.

In this way, you can **easily store** your tasks, and the program will organize them for you.

I will be using the following widgets:

- Entry
- Button
- Listbox

*(I´ll also organize the program with the* `pack()`*manager).*

```python
import tkinter as tk

def add_task():
    task = task_entry.get()
    if task != "":
        tasks_listbox.insert(tk.END, task)
        task_entry.delete(0, tk.END)  # Clear the entry widget

def remove_task():
    try:
        # Remove the selected task (anchor item is the last selected item)
        tasks_listbox.delete(tasks_listbox.curselection())
    except:
        pass

# Create the main window
root = tk.Tk()
root.title("To-Do List Application")

# Create the entry widget
task_entry = tk.Entry(root, width=50)
task_entry.pack(pady=10)

# Create the add task button
add_task_button = tk.Button(root, text="Add Task", 
                                  width=48, command=add_task)
add_task_button.pack(pady=5)

# Create the listbox widget to display tasks
tasks_listbox = tk.Listbox(root, width=50, height=10)
tasks_listbox.pack(pady=10)

# Create the remove task button
remove_task_button = tk.Button(root, text="Remove Selected Task", 
                                     width=48, command=remove_task)
remove_task_button.pack(pady=5)

# Start the main event loop
root.mainloop()
```

As you can see with a **few lines of code** we were capable of creating a quite useful App.

This is the real strength of Tkinter, its simplicity and its efficiency.

> If you want to understand exactly the code I used for creating the to-do list, I highly recommend the following tutorial:

> **[Python GUI Programming With Tkinter - Real Python](https://realpython.com/python-gui-tkinter/)**
> In this tutorial, you'll learn the basics of GUI programming with Tkinter, the de facto Python GUI framework. Master…

### Is Tkinter really used in the professional sector?

The use of Tkinter in high-profile commercial software is n**ot very common**, partly because more **feature-rich** or **modern frameworks** might be preferred for commercial applications.

As we stated before in the article, Tkinter is often chosen for its **simplicity**, making it ideal for **beginners** and for **internal tools** — but it´s not commonly used for **more specialized applications.**

However, there are some public projects that have indeed employed Tkinter.

Some of them include:

- [Anki](https://apps.ankiweb.net/)— While it´s **main interface was not built in Tkinter** it has some **external tools** that were actually developed with it.
- [PageStream](https://pagestream.org/) — A **desktop graphic design software** which was **initially developed** with **Tkinter**.
- [Porcupine](https://github.com/Akuli/porcupine) — A very basic **coding editor** which used Tkinter to build its **functional interface** for coding.

![Anki flashcard](https://miro.medium.com/v2/resize:fit:700/0*Zvh1FflTIoDgay0t.png)
***Anki** flashcard | [Source](https://blog.amboss.com/us/how-to-use-the-amboss-add-on-for-anki)*

### Bibliography

- [https://docs.python.org/3/library/tkinter.html](https://docs.python.org/3/library/tkinter.html)
- [https://realpython.com/python-gui-tkinter/](https://realpython.com/python-gui-tkinter/)
- [https://www.geeksforgeeks.org/python-gui-tkinter/](https://www.geeksforgeeks.org/python-gui-tkinter/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new articles.*

Also make sure to follow **my** **new publication!**

> **[The Deep Hub](https://medium.com/the-deeb-hub)**
> Data Science
