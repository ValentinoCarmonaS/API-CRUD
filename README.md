## Trabajo Práctico: Desarrollo de una API RESTful con Patrón MVC

### Introducción

En este proyecto, desarrollarás una **API RESTful** utilizando **JavaScript** como lenguaje de programación en el entorno de backend. La API seguirá el patrón de diseño **MVC (Modelo-Vista-Controlador)**, con la particularidad de que la "Vista" será adaptada a un contexto de backend, interpretándola como la presentación de datos al cliente a través de **respuestas HTTP** (por ejemplo, en formato JSON), en lugar de una interfaz gráfica. Este trabajo práctico tiene como objetivo introducirte en los fundamentos del desarrollo backend, permitiéndote diseñar y construir una API funcional que actúe como puente entre el frontend y una base de datos.

Dado que las APIs son un componente esencial en el desarrollo backend, este proyecto te ayudará a comprender cómo facilitar la comunicación eficiente y segura entre diferentes partes de una aplicación. Como es tu primer proyecto personal de backend, este enunciado incluye instrucciones detalladas y consideraciones para guiarte paso a paso.

---

### Objetivos

- Diseñar e implementar una API RESTful que soporte **operaciones CRUD** (Crear, Leer, Actualizar, Eliminar).
- Aplicar el patrón **MVC** adaptado a un entorno de backend.
- Escribir código en **JavaScript** siguiendo **buenas prácticas de programación**.
- Realizar **testing** para garantizar la funcionalidad y calidad de la API.
- Documentar la API de manera clara y comprensible.

---

### Requisitos Técnicos

- **Lenguaje de Programación:** JavaScript, utilizando **Node.js** como entorno de ejecución.
- **Framework:** Puedes usar **Express.js** (recomendado por su simplicidad) u otro framework de tu elección para gestionar rutas y middlewares.
- **Base de Datos:** Elige una base de datos con la que te sientas cómodo (por ejemplo, **MongoDB**, **MySQL**, **PostgreSQL**, o incluso una base de datos en memoria como SQLite). Incluye la configuración necesaria para conectar la API a la base de datos.
- **Testing:** Implementa pruebas (unitarias y/o de integración) usando un framework como **Jest**, **Mocha**, o similar.
- **Documentación:** Documenta los endpoints de la API utilizando herramientas como **Swagger**, **Postman**, o un archivo **README.md**.

---

### Detalles del Proyecto

#### 1. Modelo (Model)
- Define al menos **un modelo de datos** que represente una entidad en tu aplicación. Por ejemplo:
  - Usuarios (con campos como `id`, `nombre`, `email`).
  - Productos (con campos como `id`, `nombre`, `precio`).
  - Posts (con campos como `id`, `título`, `contenido`).
- Implementa la lógica para interactuar con la base de datos, soportando las operaciones CRUD:
  - **Create:** Insertar un nuevo recurso.
  - **Read:** Consultar uno o varios recursos.
  - **Update:** Actualizar un recurso existente.
  - **Delete:** Eliminar un recurso.

#### 2. Controlador (Controller)
- Crea **controladores** que procesen las solicitudes HTTP y utilicen los modelos para realizar las operaciones CRUD.
- Asegúrate de:
  - Manejar errores (por ejemplo, devolver un código 404 si un recurso no existe).
  - Enviar respuestas HTTP claras y estructuradas (por ejemplo, en formato JSON).

#### 3. Rutas (Routes)
- Define **rutas** para cada operación CRUD utilizando verbos HTTP adecuados:
  - `GET /recurso` - Obtener todos los recursos.
  - `GET /recurso/:id` - Obtener un recurso específico.
  - `POST /recurso` - Crear un nuevo recurso.
  - `PUT /recurso/:id` o `PATCH /recurso/:id` - Actualizar un recurso existente.
  - `DELETE /recurso/:id` - Eliminar un recurso.
- Usa nombres descriptivos y consistentes para las rutas.

#### 4. Testing
- Escribe **pruebas** para cada endpoint, verificando:
  - Casos exitosos (por ejemplo, crear un recurso y recibir un código 201).
  - Casos de error (por ejemplo, intentar actualizar un recurso inexistente y recibir un código 404).
- Usa un framework de testing para automatizar las pruebas y generar reportes.

#### 5. Documentación
- Proporciona una descripción clara de cada endpoint, incluyendo:
  - **URL** (por ejemplo, `/api/productos`).
  - **Método HTTP** (GET, POST, etc.).
  - **Parámetros** requeridos (en la URL, cuerpo o query).
  - **Ejemplos** de solicitudes y respuestas.
- Ejemplo:
  ```
  GET /api/productos
  Descripción: Obtiene la lista de productos.
  Respuesta: 200 OK
  [
    { "id": 1, "nombre": "Laptop", "precio": 1200 },
    { "id": 2, "nombre": "Mouse", "precio": 25 }
  ]
  ```

---

### Consideraciones Adicionales

- **Buenas Prácticas:** 
  - Escribe código modular (separa modelos, controladores y rutas en archivos diferentes).
  - Usa nombres consistentes para variables y funciones (por ejemplo, camelCase).
  - Define constantes para valores fijos (como códigos de estado HTTP o mensajes de error).
- **Seguridad Básica:** Valida las entradas del usuario para evitar errores o ataques (por ejemplo, verifica que los campos obligatorios estén presentes).
- **Escalabilidad:** Aunque es tu primer proyecto, piensa en cómo podrías expandir la API en el futuro (por ejemplo, agregando autenticación con JWT como desafío opcional).
- **Depuración:** Usa herramientas como `console.log` o un debugger para identificar problemas durante el desarrollo.

---

### Entregables

1. **Código Fuente:** Todos los archivos de la API, organizados en una estructura clara.
2. **Documentación:** Un archivo (como `README.md`) con instrucciones y detalles de los endpoints.
3. **Instrucciones de Ejecución:** Explica cómo instalar dependencias (`npm install`), configurar la base de datos y ejecutar la API (`npm start`).
4. **Reporte de Pruebas:** Evidencia de las pruebas realizadas y sus resultados.

---

### Criterios de Evaluación

- **Funcionalidad:** La API debe realizar correctamente las operaciones CRUD.
- **Calidad del Código:** El código debe ser limpio, organizado y seguir buenas prácticas.
- **Testing:** Las pruebas deben cubrir los casos principales y detectar errores.
- **Documentación:** Debe ser clara y suficiente para que otro desarrollador pueda usar la API sin problemas.

---

### Recursos Recomendados

- Documentación oficial de **Node.js** y **Express.js**.
- Tutoriales sobre APIs RESTful y el patrón MVC.
- Guías de testing con **Jest** o **Mocha**.
- Ejemplos de documentación en **Swagger** o **Postman**.

---

### Consejos Finales

Como es tu primer proyecto de backend, te recomendamos:
- **Planifica:** Divide el trabajo en etapas (configuración, modelos, rutas, testing, documentación).
- **Prueba a menudo:** Ejecuta tu API y realiza pruebas manuales mientras desarrollas.
- **Busca ayuda:** Si te encuentras con dificultades, consulta la documentación oficial o tutoriales en línea.