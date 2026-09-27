---
title: "Crea tu primera interfaz gráfica en Python con Tkinter"
description: "Crea una aplicación de escritorio con la biblioteca gráfica de Python"
date: 2024-02-05
tags: [python, tkinter, interfaz-gráfica]
icon: "🪟"
cover: "/blog/covers/python-gui-tkinter.jpg"
topic: practice
---

*Crea una aplicación de escritorio con la biblioteca gráfica de Python. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/build-your-first-python-gui-with-tkinter-c44ac52a83b1).*

![Foto de Kari Shea en Unsplash](https://miro.medium.com/v2/resize:fit:700/0*Zk8j0c-vOv7DM5X4)
*Foto de [Kari Shea](https://unsplash.com/@karishea?utm_source=medium&utm_medium=referral) en [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

Si estás empezando en **ciencia de datos**, probablemente crees modelos constantemente. Es una gran habilidad, pero cuando terminas un modelo hay que **llevarlo a producción**.

Para mostrar lo que has construido necesitas una interfaz atractiva. Si no tienes experiencia, **Tkinter** es una buena opción. Aunque no suele usarse para aplicaciones «profesionales» complejas, tiene muchos casos de uso y es una excelente puerta de entrada.

## Fundamentos de Tkinter

Tkinter viene instalado con Python y funciona en Windows, macOS y Linux sin dependencias adicionales.

Primero importamos el módulo:

~~~python
import tkinter as tk
~~~

Todo programa se inicializa con una ventana raíz, una instancia de la clase Tk:

~~~python
window = tk.Tk()
~~~

Al ejecutar el código aparece una ventana. Después podemos añadir **widgets**, los elementos que componen la interfaz.

![Ventana emergente en Tkinter](https://miro.medium.com/v2/resize:fit:700/0*yaVyGPdQe7Krbaos.jpg)
*Ventana emergente en Tkinter | [Fuente](https://realpython.com/python-gui-tkinter/)*

### Tipos de widgets

Algunos widgets habituales son:

- Botones: tk.Button.
- Etiquetas: tk.Label.
- Campos de entrada: tk.Entry.
- Texto: tk.Text.
- Marcos: tk.Frame, para organizar widgets o crear diseños complejos.
- Lienzo: tk.Canvas, para dibujar líneas, óvalos, polígonos y rectángulos.

![Widgets de Python Tkinter](https://miro.medium.com/v2/resize:fit:541/0*gKNKkRSd43BRiZ74.jpg)
*Widgets de Python Tkinter | [Fuente](https://www.studytonight.com/tkinter/python-tkinter-widgets)*

### Añadir un botón

~~~python
import tkinter as tk

window = tk.Tk()
button = tk.Button(window, text="Hola", height=3, width=10, padx=20, pady=20)
button.pack()
window.mainloop()
~~~

### Dibujar una línea con Canvas

~~~python
import tkinter as tk

window = tk.Tk()
canvas = tk.Canvas(window, width=400, height=300)
canvas.pack()
canvas.create_line(50, 50, 250, 150, fill="blue", width=5)
window.mainloop()
~~~

### Layouts de Tkinter

Los gestores de geometría organizan los widgets dentro de un contenedor:

- pack(): los coloca en bloque y puede ocupar todo el ancho o alto disponible.
- grid(): los sitúa en una cuadrícula de filas y columnas.
- place(): permite posicionamiento absoluto mediante coordenadas.

En este tutorial usaremos pack(), el más sencillo.

### Bucle de eventos

Los ejemplos terminan con window.mainloop(). Tras configurar la interfaz, la aplicación entra en un **bucle de eventos**: espera clics o pulsaciones de teclado y responde a ellas.

## Estructura general

Los pasos para crear una aplicación con Tkinter son:

1. Importar el módulo.
2. Crear la ventana principal.
3. Añadir widgets.
4. Iniciar el bucle de eventos.

Primer ejemplo completo:

~~~python
import tkinter as tk

def on_button_click():
    label.config(text="¡Hola, Tkinter!")

root = tk.Tk()
root.title("Ejemplo sencillo de Tkinter")

label = tk.Label(root, text="Pulsa el botón")
label.pack()

button = tk.Button(
    root, text="Haz clic", command=on_button_click,
    height=3, width=10, padx=20, pady=20,
)
button.pack()
root.mainloop()
~~~

El parámetro command de button define una función de callback que se llama al pulsarlo.

## Lista de tareas con Python Tkinter

Ahora hagamos una aplicación más cercana a un caso real: una lista de tareas. Permitirá añadir tareas y guardarlas en una lista.

Usaremos Entry, Button y Listbox, organizados con pack().

~~~python
import tkinter as tk

def add_task():
    task = task_entry.get()
    if task:
        tasks_listbox.insert(tk.END, task)
        task_entry.delete(0, tk.END)

def remove_task():
    try:
        tasks_listbox.delete(tasks_listbox.curselection())
    except tk.TclError:
        pass

root = tk.Tk()
root.title("Lista de tareas")

task_entry = tk.Entry(root, width=50)
task_entry.pack(pady=10)

add_task_button = tk.Button(
    root, text="Añadir tarea", width=48, command=add_task,
)
add_task_button.pack(pady=5)

tasks_listbox = tk.Listbox(root, width=50, height=10)
tasks_listbox.pack(pady=10)

remove_task_button = tk.Button(
    root, text="Eliminar tarea seleccionada", width=48, command=remove_task,
)
remove_task_button.pack(pady=5)

root.mainloop()
~~~

Con pocas líneas de código se puede crear una aplicación útil. Esa es la fortaleza de Tkinter: sencillez y eficiencia.

> Para entender cada parte de esta lista, recomiendo [Python GUI Programming With Tkinter - Real Python](https://realpython.com/python-gui-tkinter/).

### ¿Se usa Tkinter profesionalmente?

Tkinter no es muy habitual en software comercial de alto perfil: para esas aplicaciones suelen elegirse frameworks más modernos y completos.

Se elige por su simplicidad, por lo que es ideal para principiantes y herramientas internas, pero menos frecuente en aplicaciones especializadas.

Algunos proyectos públicos que lo han usado:

- [Anki](https://apps.ankiweb.net/): aunque su interfaz principal no está hecha en Tkinter, algunas herramientas externas sí.
- [PageStream](https://pagestream.org/): software de diseño gráfico de escritorio desarrollado inicialmente con Tkinter.
- [Porcupine](https://github.com/Akuli/porcupine): editor de código sencillo con una interfaz funcional construida con Tkinter.

![Tarjeta de Anki](https://miro.medium.com/v2/resize:fit:700/0*Zvh1FflTIoDgay0t.png)
*Tarjeta de **Anki** | [Fuente](https://blog.amboss.com/us/how-to-use-the-amboss-add-on-for-anki)*

### Bibliografía

- [https://docs.python.org/3/library/tkinter.html](https://docs.python.org/3/library/tkinter.html)
- [https://realpython.com/python-gui-tkinter/](https://realpython.com/python-gui-tkinter/)
- [https://www.geeksforgeeks.org/python-gui-tkinter/](https://www.geeksforgeeks.org/python-gui-tkinter/)

*¡Gracias por leer! Si te ha gustado el artículo, puedes dejar hasta 50 aplausos y seguirme en* [*Medium*](https://medium.com/@jorgecardete) *para estar al día de las próximas publicaciones.*

*También puedes seguir mi nueva publicación:*

> **[The Deep Hub](https://medium.com/thedeephub)**
> Tu espacio sobre ciencia de datos.
