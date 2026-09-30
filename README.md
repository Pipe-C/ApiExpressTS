# 🚀 UrbanSync Sim - Backend API

API REST transaccional profesional desarrollada con **Express**, **TypeScript** y **Clean Architecture**. El proyecto aplica principios SOLID, inyección de dependencias, tipado estricto con **Zod v4** y pruebas unitarias automáticas con **Vitest**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está estructurado en capas desacopladas para garantizar alta mantenibilidad, escalabilidad y aislamiento de responsabilidades:

- **`src/controllers`**: Capa HTTP que procesa peticiones y delega respuestas estandarizadas.
- **`src/services`**: Capa de negocio pura (cálculo de acumulados, reglas financieras y validaciones de dominio).
- **`src/repositories`**: Abstracción de la capa de persistencia de datos (Patrón Repositorio).
- **`src/dto`**: Esquemas de validación de entrada/salida inferidos con **Zod v4**.
- **`src/data/models`**: Modelos de datos de dominio y enumeraciones (`TransactionStatus`, `TypePayment`).
- **`src/config`**: Inyección de dependencias centralizada con **Awilix** y gestión de entorno.
- **`src/exceptions`**: Catálogo centralizado de errores con `AppException` y `errorMiddleware`.
- **`src/utils`**: Utilidades auxiliares como `env-printer` (impresión sanitizada de configuración) y `logger`.

---

## ⚙️ Requisitos Previos e Instalación

1. **Clonar el repositorio y ubicarte en el directorio del proyecto:**
   ```bash
   git clone [https://github.com/Pipe-C/urbansync-sim.git](https://github.com/Pipe-C/urbansync-sim.git)
   cd urbansync-sim
Instalar dependencias:

Bash
npm install --legacy-peer-deps
Configurar variables de entorno:
Crea un archivo .env en la raíz tomando como base .env.example:

Bash
cp .env.example .env
🚀 Ejecución en Desarrollo
Para iniciar la API en modo de desarrollo con recarga automática (tsx watch) y alias de rutas (@config, @services, etc.):

Bash
npm run dev
La API estará disponible por defecto en: http://localhost:3000/example-api

🧪 Pruebas Unitarias (Testing)
El proyecto utiliza Vitest como runner de pruebas unitarias de alto rendimiento.

Ejecutar tests en modo interactivo (watch):

Bash
npm run test
Ejecutar tests una sola vez:

Bash
npm run test:run
Generar reporte de cobertura de código:

Bash
npm run test:coverage
🔍 Calidad de Código (Linting & Formatting)
El proyecto cuenta con reglas de análisis estático y formateo automático configuradas con ESLint y Prettier:

Ejecutar verificación de código con ESLint:

Bash
npm run lint
Corregir automáticamente errores de estilo:

Bash
npm run lint:fix
Formatear el código con Prettier:

Bash
npm run format
📦 Compilación y Producción
Para compilar el código TypeScript a JavaScript optimizado en el directorio dist/:

Bash
npm run build
npm start