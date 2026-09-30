# 🚀 ApiExpressTS - Backend API

API REST transaccional profesional desarrollada con **Express**, **TypeScript** y **Clean Architecture**.

El proyecto aplica principios **SOLID**, inyección de dependencias, tipado estricto con **Zod v4** y pruebas unitarias automáticas con **Vitest**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está estructurado en capas desacopladas para garantizar alta mantenibilidad, escalabilidad y aislamiento de responsabilidades:

- **`src/controllers`**: Capa HTTP que procesa peticiones y delega respuestas estandarizadas.
- **`src/services`**: Capa de negocio pura, incluyendo cálculo de acumulados, reglas financieras y validaciones de dominio.
- **`src/repositories`**: Abstracción de la capa de persistencia de datos mediante el patrón Repository.
- **`src/dto`**: Esquemas de validación de entrada y salida inferidos con **Zod v4**.
- **`src/data/models`**: Modelos de datos de dominio y enumeraciones como `TransactionStatus` y `TypePayment`.
- **`src/config`**: Inyección de dependencias centralizada con **Awilix** y gestión de variables de entorno.
- **`src/exceptions`**: Catálogo centralizado de errores mediante `AppException` y `errorMiddleware`.
- **`src/utils`**: Utilidades auxiliares como `env-printer` para la impresión sanitizada de configuración y `logger`.

---

## ⚙️ Requisitos Previos e Instalación

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js**
- **npm**
- **Git**

### 1. Clonar el repositorio

```bash
git clone https://github.com/Pipe-C/ApiExpressTS.git
cd ApiExpressTS
```

### 2. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto tomando como base `.env.example`:

```bash
cp .env.example .env
```

Después, configura las variables necesarias dentro del archivo `.env`.

> **Importante:** no debes subir el archivo `.env` al repositorio si contiene credenciales, secretos o información sensible.

---

## 🚀 Ejecución en Desarrollo

Para iniciar la API en modo de desarrollo con recarga automática mediante `tsx watch` y alias de rutas (`@config`, `@services`, etc.):

```bash
npm run dev
```

La API estará disponible por defecto en:

```text
http://localhost:3000/example-api
```

---

## 🧪 Pruebas Unitarias (Testing)

El proyecto utiliza **Vitest** como runner de pruebas unitarias de alto rendimiento.

### Ejecutar tests en modo interactivo (watch)

```bash
npm run test
```

### Ejecutar tests una sola vez

```bash
npm run test:run
```

### Generar reporte de cobertura de código

```bash
npm run test:coverage
```

---

## 🔍 Calidad de Código (Linting & Formatting)

El proyecto cuenta con reglas de análisis estático y formateo automático configuradas con **ESLint** y **Prettier**.

### Ejecutar verificación de código con ESLint

```bash
npm run lint
```

### Corregir automáticamente errores de estilo

```bash
npm run lint:fix
```

### Formatear el código con Prettier

```bash
npm run format
```

---

## 📦 Compilación y Producción

Para compilar el código TypeScript a JavaScript optimizado en el directorio `dist/`:

```bash
npm run build
```

Una vez realizada la compilación, puedes iniciar la aplicación con:

```bash
npm start
```

El flujo completo es:

```bash
npm run build
npm start
```

---

## 🧩 Inyección de Dependencias

La aplicación utiliza **Awilix** para administrar las dependencias y mantener desacoplados los diferentes componentes de la arquitectura.

La configuración centralizada permite registrar y resolver componentes como:

- Controllers
- Services
- Repositories
- Configuración
- Utilidades

Esto facilita el testing, el mantenimiento y la sustitución de implementaciones.

---

## 🛡️ Validación de Datos

Las entradas y salidas de la API se validan utilizando **Zod v4**.

Esto permite:

- Validar los datos recibidos por los endpoints.
- Definir contratos de entrada y salida.
- Inferir tipos de TypeScript a partir de los esquemas.
- Centralizar las reglas de validación.
- Reducir errores relacionados con datos inválidos.

---

## ⚠️ Manejo de Errores

El proyecto centraliza el manejo de errores mediante:

- `AppException`
- `errorMiddleware`

Esto permite mantener una estrategia consistente para el tratamiento de errores y evitar duplicación de lógica entre los diferentes controllers.

---

## 📁 Estructura del Proyecto

Una representación general de la estructura es:

```text
ApiExpressTS/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   │   └── models/
│   ├── dto/
│   ├── exceptions/
│   ├── repositories/
│   ├── services/
│   └── utils/
│
├── tests/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔄 Flujo de una Petición

De forma general, una petición HTTP sigue el siguiente flujo:

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
DTO / Validation
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
Data Source
     │
     ▼
Repository
     │
     ▼
Service
     │
     ▼
Controller
     │
     ▼
HTTP Response
```

La separación de responsabilidades permite que cada capa se encargue únicamente de la parte correspondiente de la operación.

---

## 📋 Scripts Disponibles

Los principales comandos disponibles en `package.json` son:

| Comando                 | Descripción                                 |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Inicia el servidor en modo desarrollo       |
| `npm run test`          | Ejecuta Vitest en modo watch                |
| `npm run test:run`      | Ejecuta todos los tests una sola vez        |
| `npm run test:coverage` | Genera el reporte de cobertura              |
| `npm run lint`           | Analiza el código con ESLint                |
| `npm run lint:fix`       | Corrige automáticamente problemas de ESLint |
| `npm run format`         | Formatea el código con Prettier             |
| `npm run build`          | Compila TypeScript                          |
| `npm start`              | Inicia la aplicación compilada              |

---

## 🧑‍💻 Flujo de Desarrollo Recomendado

Para configurar el proyecto desde cero:

```bash
git clone https://github.com/Pipe-C/ApiExpressTS.git
cd ApiExpressTS
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

Antes de realizar un commit, se recomienda ejecutar:

```bash
npm run lint
npm run test:run
npm run build
```

Para aplicar automáticamente el formato del proyecto:

```bash
npm run format
```

---

## 🚀 Flujo de Despliegue

El proceso básico para generar una versión lista para producción es:

```bash
npm install --legacy-peer-deps
npm run lint
npm run test:run
npm run build
npm start
```

Asegúrate de configurar correctamente las variables de entorno necesarias en el entorno de ejecución.

---

## 🔒 Buenas Prácticas

Durante el desarrollo se recomienda:

- Mantener la lógica de negocio dentro de `services`.
- Evitar lógica de negocio compleja dentro de los controllers.
- Mantener los repositories desacoplados de los services.
- Validar las entradas mediante DTOs y Zod.
- Utilizar excepciones de dominio en lugar de errores genéricos cuando corresponda.
- Mantener las dependencias administradas mediante Awilix.
- Escribir pruebas para la lógica de negocio.
- No almacenar secretos ni credenciales directamente en el código fuente.
- Mantener actualizado `.env.example` sin incluir valores sensibles.
- Ejecutar linting, tests y build antes de integrar cambios.

---

## 📌 Estado del Proyecto

**ApiExpressTS** es una API REST transaccional construida con **Express** y **TypeScript**, siguiendo principios de **Clean Architecture**, separación de responsabilidades y buenas prácticas de desarrollo.

---

## 📄 Licencia

Actualmente, este proyecto no cuenta con una licencia definida.