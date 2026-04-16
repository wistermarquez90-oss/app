# FERMENTUM - Revista Científica

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.3.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?logo=shadcnui)](https://ui.shadcn.com/)

> **Revista científica de la Universidad de Los Andes** dedicada a la difusión del conocimiento investigativo sobre la región andina.

![FERMENTUM Preview](./public/preview.png)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación Local](#-instalación-local)
- [Despliegue en GitHub Pages](#-despliegue-en-github-pages)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Despliegue en Netlify](#-despliegue-en-netlify)
- [Paleta de Colores](#-paleta-de-colores)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 📝 Descripción

FERMENTUM es una aplicación web moderna y elegante para el centro de investigación académico de la Universidad de Los Andes. La plataforma permite:

- 📚 Explorar artículos científicos arbitrados
- 🔍 Buscar y filtrar publicaciones por categoría, año y volumen
- 👥 Conocer el directorio de investigadores
- 📖 Acceder a normas de publicación
- 📧 Contactar al equipo editorial

## ✨ Características

### Funcionalidades Principales

- **Página de Inicio**: Hero section con artículo destacado, estadísticas del centro y categorías de investigación
- **Revista FERMENTUM**: Repositorio completo con filtros avanzados de búsqueda
- **Directorio de Autores**: Perfiles de investigadores con especialidades y publicaciones
- **Quiénes Somos**: Información institucional, misión, visión y equipo editorial
- **Normas de Publicación**: Guía completa para autores con proceso de evaluación
- **Contacto**: Formulario dinámico e información de contacto institucional

### Características Técnicas

- ⚡ **Rendimiento optimizado** con Vite
- 🎨 **Diseño responsive** para todos los dispositivos
- 🌙 **Tema oscuro elegante** con identidad institucional
- ✨ **Animaciones suaves** con scroll y hover effects
- 🔍 **SEO optimizado** con meta tags y estructura semántica
- ♿ **Accesibilidad** con ARIA labels y navegación por teclado
- 🎯 **TypeScript** para tipado estático

## 🛠 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.2.0 | Biblioteca UI |
| TypeScript | 5.0.0 | Tipado estático |
| Vite | 4.3.0 | Build tool |
| Tailwind CSS | 3.4.0 | Framework CSS |
| shadcn/ui | latest | Componentes UI |
| React Router | 6.11.0 | Enrutamiento |
| Lucide React | 0.220.0 | Iconos |

## 📁 Estructura del Proyecto

```
fermentum-revista/
├── public/                  # Archivos estáticos
│   └── images/             # Imágenes del sitio
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── ui/            # Componentes shadcn/ui
│   │   └── ui-custom/     # Componentes personalizados
│   ├── data/              # Datos de la aplicación
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Páginas principales
│   ├── types/             # Tipos TypeScript
│   ├── App.tsx            # Componente raíz
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Punto de entrada
├── index.html             # HTML principal
├── tailwind.config.js     # Configuración Tailwind
├── vite.config.ts         # Configuración Vite
├── tsconfig.json          # Configuración TypeScript
└── package.json           # Dependencias
```

## 💻 Instalación Local

### Prerrequisitos

- [Node.js](https://nodejs.org/) 18.0 o superior
- [npm](https://www.npmjs.com/) 9.0 o superior

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/fermentum-revista.git
cd fermentum-revista
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

Visita [http://localhost:5173](http://localhost:5173)

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |

## 🚀 Despliegue en GitHub Pages

### Paso 1: Configurar vite.config.ts

Asegúrate de que tu `vite.config.ts` tenga la base correcta:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/fermentum-revista/', // Nombre de tu repositorio
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Paso 2: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### Paso 3: Agregar scripts en package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Paso 4: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nómbralo `fermentum-revista` (o el nombre que prefieras)
3. Sube tu código:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/fermentum-revista.git
git push -u origin main
```

### Paso 5: Desplegar

```bash
npm run deploy
```

Tu sitio estará disponible en: `https://tu-usuario.github.io/fermentum-revista/`

## 🌐 Despliegue en Vercel

### Opción 1: Vía CLI

1. **Instalar Vercel CLI**

```bash
npm i -g vercel
```

2. **Desplegar**

```bash
vercel
```

3. Sigue las instrucciones interactivas

### Opción 2: Vía GitHub Integration

1. Ve a [Vercel](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click en "Deploy"

## 🔷 Despliegue en Netlify

### Opción 1: Vía CLI

1. **Instalar Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Desplegar**

```bash
netlify deploy --prod --dir=dist
```

### Opción 2: Vía GitHub Integration

1. Ve a [Netlify](https://netlify.com)
2. Click en "Add new site" → "Import an existing project"
3. Conecta con GitHub y selecciona tu repositorio
4. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click en "Deploy site"

## 🎨 Paleta de Colores

Los colores institucionales de FERMENTUM están basados en la identidad visual de la Universidad de Los Andes y el proyecto HUMANIC:

| Color | HEX | Uso |
|-------|-----|-----|
| **Azul Marino (ULA)** | `#1e3a5f` | Color primario, fondos |
| **Azul Marino Claro** | `#2a4a73` | Variantes de fondo |
| **Azul Marino Oscuro** | `#152a45` | Fondos oscuros |
| **Verde HUMANIC** | `#2d8659` | Color secundario, acentos |
| **Verde HUMANIC Claro** | `#3da76f` | Hover states |
| **Verde Lima Neón** | `#a3e635` | Acentos dinámicos, CTAs |
| **Verde Lima Claro** | `#bef264` | Hover en CTAs |
| **Bronce** | `#d4a574` | Tono de soporte |
| **Bronce Claro** | `#e4c4a0` | Elementos decorativos |

### Uso en Tailwind CSS

```html
<!-- Color primario -->
<div class="bg-ula-navy text-white">

<!-- Color secundario -->
<button class="bg-humanic-green hover:bg-humanic-green-light">

<!-- Acento neón -->
<button class="bg-neon-lime text-ula-navy-dark hover:bg-neon-lime-light">

<!-- Tono bronce -->
<span class="text-bronze">
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Asegúrate de que el código pase el linting
- Actualiza la documentación si es necesario
- Incluye tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](./LICENSE).

---

<p align="center">
  <strong>FERMENTUM - Revista Científica</strong><br>
  Universidad de Los Andes<br>
  <sub>© 2024 Todos los derechos reservados</sub>
</p>

<p align="center">
  <a href="https://www.ula.ve">Universidad de Los Andes</a> •
  <a href="mailto:revista.fermentum@ula.ve">Contacto</a>
</p>
