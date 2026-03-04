# 🏦 Sistema Bancario - Backend ADMIN

API REST desarrollada con **Node.js, Express y MongoDB** para la administración del sistema bancario **BancoKinalitos**.

Este backend permite gestionar usuarios, cuentas bancarias, servicios, monedas y consultar transacciones del sistema.

---

# 🧠 Tecnologías utilizadas

- 🟢 **Node.js**
- ⚡ **Express**
- 🍃 **MongoDB**
- 🧩 **Mongoose**
- 🔐 **JWT (Json Web Token)**
- 🔑 **bcryptjs**
- ✔️ **express-validator**
- 🚦 **express-rate-limit**
- 🛡 **helmet**
- 🌐 **cors**
- 📜 **morgan**
- ⚙️ **dotenv**

---

# 📦 Instalación

Clonar el repositorio
```bash
git clone https://github.com/Angel-SSJ2/SistemaBancario-admin.git

Entrar al proyecto

cd SistemaBancario-admin

Instalar dependencias

npm install
```

⚙️ Variables de entorno
Crear un archivo .env en la raíz del proyecto.
```bash
PORT=3001
NODE_ENV=development
URL_MONGODB=mongodb://localhost:27017/BancoKinalitos
SECRET_KEY=Kinalito2024
```
El servidor se ejecutará en:

```bash
http://localhost:3001/admin/v1
```

🚀 Ejecutar el servidor
Modo desarrollo
```bash
npm run dev
```

👨‍💻 Administrador por defecto
El sistema crea automáticamente un administrador si no existe.
| Campo    | Valor                                     |
| -------- | ----------------------------------------- |
| Username | ADMINB                                    |
| Password | ADMINB123                                 |
| Email    | [admin@banco.com](mailto:admin@banco.com) |
Archivo responsable:
```bash
src/users/user.setup.js
```

🔐 Autenticación
El sistema utiliza **JSON Web Token (JWT)** para autenticar a los administradores antes de acceder a las rutas protegidas.
```bash
Permite a un administrador iniciar sesión y obtener un **token de autenticación**.

| Método | Endpoint |
|------|------|
| POST | /admin/v1/auth/login |

URL completa:http://localhost:3001/admin/v1/auth/login
```

```bash
## Body de la petición
```json
{
  "email": "admin@banco.com",
  "password": "ADMINB123"
}
```

🧪 Endpoint de prueba
| Método | Endpoint         |
| ------ | ---------------- |
| GET    | /admin/v1/health |
```bash
{
 "status": "ok",
 "service": "BancoKinalitos ADMIN API",
 "version": "1.0.0"
}
```

📡 Endpoints del sistema
👥 Usuarios
| Método | Endpoint   |
| ------ | ---------- |
| GET    | /users     |
| POST   | /users     |
| PUT    | /users/:id |
| DELETE | /users/:id |

💱 Monedas
| Método | Endpoint        |
| ------ | --------------- |
| GET    | /currencies     |
| POST   | /currencies     |
| PUT    | /currencies/:id |
| DELETE | /currencies/:id |

📊 Transacciones
| Método | Endpoint          |
| ------ | ----------------- |
| GET    | /transactions     |
| GET    | /transactions/:id |

🗂 Estructura del proyecto
```bash
SistemaBancario-admin
│
├── configs
│   ├── app.js
│   ├── db.js
│   ├── cors-configuration.js
│   └── helmet-configuration.js
│
├── middlewares
│   ├── validate-jwt.js
│   ├── validate-fields.js
│   ├── request-limit.js
│   └── handle-errors.js
│
├── src
│   ├── users
│   │   ├── user.controller.js
│   │   ├── user.model.js
│   │   └── user.routes.js
│   │
│   ├── accounts
│   │   ├── account.controller.js
│   │   ├── account.model.js
│   │   └── account.routes.js
│   │
│   ├── services
│   │   ├── service.controller.js
│   │   ├── service.model.js
│   │   └── service.routes.js
│   │
│   ├── currencies
│   │   ├── currency.controller.js
│   │   ├── currency.model.js
│   │   └── currency.routes.js
│   │
│   └── transactions
│       ├── transactions.controller.js
│       ├── transactions.model.js
│       └── transactions.routes.js
│
├── index.js
├── package.json
└── .env
```

🛡 Seguridad implementada
```bash
| Seguridad     | Descripción            |
| ------------- | ---------------------- |
| 🔑 bcrypt     | Hash de contraseñas    |
| 🔐 JWT        | Autenticación          |
| 🚦 Rate Limit | Protección contra spam |
| 🛡 Helmet     | Headers seguros        |
| ✔️ Validator  | Validación de datos    |
```

👨‍💻 Autor
Proyecto desarrollado para el sistema administrativo del banco BancoKinalitos.
```bash
💡 Si quieres, también puedo hacer una **versión mucho más profesional (nivel repositorio empresarial)** que incluya:
- 📊 **diagrama de arquitectura del backend**
- 🔄 **flujo de autenticación JWT**
- 📬 **ejemplos de requests en Postman**
- 🧾 **documentación completa de endpoints**
Eso hace que el repo **se vea 10 veces más profesional en GitHub**.
```
