# G14 — CRUD Usuarios · Examen Final Tecsup

Aplicación frontend React que consume la [API REST de Usuarios](https://github.com/Miguel-Sanchez241001/api-back-tecsup) desarrollada en Spring Boot + PostgreSQL.

---

## Requisitos previos

| Herramienta | Versión mínima |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| Backend Spring Boot corriendo | `localhost:8081` |

---

## ⚙️ Configurar la URL del backend

> **Este es el único archivo que debes cambiar si el backend está en otra dirección.**

Abre el archivo **[`.env.local`](.env.local)** en la raíz del proyecto:

```env
# .env.local
# ↓↓↓ CAMBIA ESTA URL si el backend está desplegado en otro servidor ↓↓↓
VITE_API_BASE_URL=http://localhost:8081/api
```

**Ejemplos:**
```env
# Backend local (por defecto)
VITE_API_BASE_URL=http://localhost:8081/api

# Backend desplegado en Railway
VITE_API_BASE_URL=https://mi-backend.up.railway.app/api

# Backend desplegado en Render
VITE_API_BASE_URL=https://mi-backend.onrender.com/api
```

> El archivo `.env.local` está en `.gitignore` — nunca se sube al repositorio.

---

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de entorno (si no existe)
cp .env.local.example .env.local   # o créalo manualmente (ver sección anterior)

# 3. Iniciar servidor de desarrollo
npm run dev
# → Disponible en http://localhost:5173

# 4. Build para producción
npm run build
```

---

## Levantar el stack completo (backend + BD)

```bash
# Desde la carpeta del backend (C:\workspace\curso-java21\back)

# 1. Iniciar PostgreSQL en Docker
docker compose up -d

# 2. Iniciar el backend Spring Boot
java -jar target/ExamenFinalTecsup-0.0.1-SNAPSHOT.jar

# 3. En otra terminal, iniciar el frontend
cd C:\workspace\curso-java21\front
npm run dev
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── UserForm.jsx   # Formulario crear/editar con validaciones
│   └── UserList.jsx   # Tabla de usuarios + acciones
├── services/
│   └── api.js         # Funciones CRUD con fetch (ver VITE_API_BASE_URL)
├── styles/
│   └── App.css        # Estilos globales sin librerías externas
├── App.jsx            # Estado central: useState + useEffect
└── main.jsx
.env.local             # ← AQUÍ se configura la URL del backend
```

---

## Operaciones CRUD

| Operación | Método | Endpoint |
|---|---|---|
| Listar usuarios | `GET` | `/api/usuarios` |
| Crear usuario | `POST` | `/api/usuarios` |
| Actualizar usuario | `PUT` | `/api/usuarios/{id}` |
| Eliminar usuario | `DELETE` | `/api/usuarios/{id}` |

---

## Validaciones del formulario

| Campo | Regla |
|---|---|
| Nombre | Obligatorio |
| Apellido | Obligatorio |
| Email | Obligatorio · formato válido |
| Contraseña | Obligatorio · mín. 8 caracteres · al menos 1 mayúscula, 1 minúscula y 1 número |
| Teléfono | Opcional · número peruano (9 dígitos, inicia con 9) |

---

## Tecnologías utilizadas

- [React 18](https://react.dev) — componentes, `useState`, `useEffect`
- [Vite 5](https://vitejs.dev) — bundler y servidor de desarrollo
- [SweetAlert2](https://sweetalert2.github.io) — notificaciones y confirmaciones
- Fetch API — peticiones HTTP al backend

---

## Backend relacionado

Repositorio del backend: [api-back-tecsup](https://github.com/Miguel-Sanchez241001/api-back-tecsup)
