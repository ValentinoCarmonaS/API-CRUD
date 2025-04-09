# 📚 API CRUD con Node.js y Express

Una API RESTful construida con Node.js y Express que implementa el patrón de
diseño MVC (Modelo-Vista-Controlador). Este proyecto permite realizar
operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos,
con un enfoque modular y escalable.

---

## 📋 Requisitos

- **Node.js** v16+
- **Docker** (para ejecutar el proyecto en contenedores)
- **Base de datos**: Configurable según tus necesidades (MongoDB, MySQL,
  PostgreSQL, etc.).

---

## 🛠 Instalación

1. Clona este repositorio:

      ```bash
      git clone https://github.com/ValentinoCarmonaS/API-CRUD.git
      cd API-CRUD
      ```

2. Construye y levanta los contenedores con Docker:

      ```bash
      make build
      make up
      ```

3. Para detener y eliminar los contenedores:
      ```bash
      make down
      ```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000
# Agrega aquí otras variables necesarias, como credenciales de base de datos.
```

---

## 🧪 Tests

Para ejecutar los tests, utiliza el siguiente comando:

```bash
make test
```

---

## 📂 Estructura del Proyecto

```bash
/mi-proyecto
├── /src
│   ├── /config         # Configuraciones (conexión a DB, variables de entorno, etc.)
│   ├── /controllers    # Lógica de negocio, funciones que procesan las solicitudes HTTP
│   ├── /models         # Esquemas y lógica para interactuar con la base de datos
│   ├── /routes         # Definición de endpoints y uso de Express Router
│   ├── /middlewares    # Middlewares (autenticación, validación, manejo de errores)
│   ├── /services       # Funciones reutilizables de negocio (opcional)
│   ├── /utils          # Helpers y utilidades
│   └── app.js          # Punto de entrada de la aplicación
├── /tests              # Pruebas unitarias o de integración
├── .env                # Variables de entorno
├── Dockerfile          # Configuración de Docker
├── docker-compose.yml  # Configuración de Docker Compose
├── Makefile            # Comandos automatizados
├── package.json        # Dependencias y scripts
└── README.md           # Documentación general del proyecto
```
