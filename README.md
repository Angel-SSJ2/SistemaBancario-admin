# SistemaBancario-admin

# 🏦 SistemaBancario-Admin

## 🚀 Requerimientos del Sistema
### 🧾 API de Gestión Bancaria de Usuarios, Cuentas y Transacciones

---

## 🌐 1. Descripción General del Sistema

El presente sistema consiste en una API REST diseñada para la gestión integral de usuarios dentro de una plataforma bancaria digital, permitiendo la administración de cuentas, ejecución de transacciones y auditoría de operaciones realizadas por los clientes del sistema 🔐.

La aplicación permite el registro y autenticación de usuarios dentro de la plataforma, quienes posteriormente podrán gestionar cuentas bancarias y realizar operaciones de transferencia entre las mismas 💸.

El sistema se encuentra desarrollado bajo una arquitectura basada en el patrón:

- Modelo
- Vista
- Controlador (MVC)

Esto permite una adecuada separación entre la lógica de negocio, la persistencia de datos y el manejo de solicitudes HTTP.

Asimismo, se implementa un mecanismo de autenticación basado en JSON Web Token (JWT), permitiendo garantizar que únicamente los usuarios autenticados puedan acceder a los recursos protegidos del sistema 🛡️.

Adicionalmente, el sistema incorpora funcionalidades de auditoría que permiten registrar las operaciones realizadas dentro de la plataforma, facilitando el seguimiento de actividades ejecutadas por los usuarios 📊.

---

## 🎯 2. Alcance del Sistema

El sistema permitirá la administración de usuarios dentro de la plataforma bancaria, así como la gestión de cuentas asociadas a los mismos y el registro de transacciones realizadas entre dichas cuentas.

Cada usuario podrá:

- ✅ Registrarse dentro del sistema  
- ✅ Iniciar sesión mediante sus credenciales  
- ✅ Crear cuentas bancarias  
- ✅ Realizar transferencias entre cuentas  
- ✅ Consultar el historial de sus transacciones  
- ✅ Visualizar el estado de sus cuentas  

El sistema contará además con un usuario administrador que podrá realizar tareas de gestión sobre los usuarios registrados dentro de la plataforma 👨‍💼.

---

## 👥 3. Actores del Sistema

| Actor              | Descripción                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| 🧑 Cliente          | Usuario registrado que puede gestionar cuentas y realizar transacciones.   |
| 👨‍💼 Administrador  | Usuario con privilegios para la administración de usuarios dentro del sistema.|

---

## ⚙️ 4. Requerimientos Funcionales

### 📝 RF-01 Registro de Usuarios

El sistema deberá permitir el registro de nuevos usuarios mediante el ingreso de:

- Nombre  
- Apellido  
- Correo electrónico 📧  
- Contraseña 🔑  
- Rol dentro del sistema  

Las contraseñas deberán ser cifradas antes de su almacenamiento en la base de datos.

---

### 🔐 RF-02 Autenticación de Usuarios

El sistema deberá permitir a los usuarios iniciar sesión mediante el uso de su correo electrónico y contraseña previamente registrada.

Una vez validadas las credenciales, el sistema generará un token de autenticación que permitirá acceder a las funcionalidades protegidas del sistema.

---

### 🏦 RF-03 Gestión de Cuentas Bancarias

El sistema deberá permitir la creación y administración de cuentas bancarias asociadas a los usuarios registrados dentro de la plataforma.

Cada cuenta deberá contener información relacionada con su estado y operaciones realizadas.

---

### 💳 RF-04 Gestión de Transacciones

El sistema deberá permitir la ejecución de transferencias entre cuentas pertenecientes a los usuarios registrados dentro del sistema.

Cada transacción deberá registrar:

- Cuenta emisora  
- Cuenta receptora  
- Monto transferido 💰  
- Descripción de la operación 🗒️  
- Fecha de realización 📆  

---

### 📊 RF-05 Consulta de Historial de Transacciones

El sistema deberá permitir a los usuarios autenticados consultar el historial de transacciones asociadas a sus cuentas.

---

### 🛡️ RF-06 Protección de Rutas

El sistema deberá proteger los endpoints relacionados con la gestión de cuentas y transacciones mediante mecanismos de validación de token.

---

### 🧾 RF-07 Auditoría de Operaciones

El sistema deberá registrar las operaciones realizadas dentro de la plataforma, permitiendo mantener un historial de actividades ejecutadas por los usuarios.

---

### 👨‍💼 RF-08 Administración de Usuarios

El sistema deberá permitir a los usuarios con rol administrador gestionar la información de los usuarios registrados dentro de la plataforma.

---

## 📌 5. Requerimientos No Funcionales

### 🔒 RNF-01 Seguridad
El sistema deberá implementar mecanismos de cifrado para el almacenamiento de contraseñas.

---

### 🧾 RNF-02 Autenticación y Autorización
El acceso a los recursos protegidos deberá estar controlado mediante el uso de JSON Web Token (JWT).

---

### 📈 RNF-03 Integridad de Datos
El sistema deberá evitar la duplicidad de registros mediante la validación de campos únicos.

---

### 🌍 RNF-04 Disponibilidad
El sistema deberá estar disponible para atender solicitudes realizadas por los usuarios en cualquier momento.

---

### 🙈 RNF-05 Confidencialidad
El sistema no deberá exponer información sensible dentro de las respuestas generadas por la API.
