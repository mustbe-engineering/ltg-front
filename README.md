# LTG Front (Vue App)

Esta es la aplicación frontend para **Ladies The Gathering**, construida con **Vue 3**, **TypeScript**, **Vite** y **Tailwind CSS**.

## 🌍 Sistema Multi-idioma (i18n)

La aplicación soporta **Español (es)** e **Inglés (en)**.

- **Servicio**: `src/services/languageService.ts` gestiona el estado global del idioma.
- **Persistencia**: La preferencia del usuario se guarda automáticamente en `localStorage`.
- **Fetching**: El `contentService.ts` detecta el idioma activo y solicita los archivos JSON correspondientes al CMS (ej: `/blog/index.json` o `/en/blog/index.json`).

## 🚀 Desarrollo Local

Para correr el frontend conectado a tu CMS local:

1. **Requisito**: Tener el repositorio `ltg-back` corriendo en el puerto `1313` (`hugo server`).
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Variables de Entorno**:
   Asegúrate de que tu `.env.local` tenga:
   ```env
   VITE_CMS_API_URL=/api
   ```
   *El frontend usa un proxy (configurado en `vite.config.ts`) para redirigir las llamadas de `/api` a `localhost:1313` y evitar errores de CORS.*

4. **Iniciar**:
   ```bash
   npm run dev
   ```

## 🏗 Arquitectura

El proyecto utiliza **Vertical Slicing**:
- `src/features/`: Contiene las secciones del sitio (blog, events, etc.) con sus propios componentes y vistas.
- `src/services/`: Servicios globales como el cliente de contenido y el gestor de idiomas.
- `src/App.vue`: Contiene la navegación principal y el selector de idioma.

## 📦 Despliegue en Netlify

El despliegue está automatizado mediante el archivo `netlify.toml`.

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirects**: Configurado para manejar el routing de SPA (Single Page Application) y evitar errores 404 al refrescar rutas internas.
- **Producción**: El sitio en producción apunta directamente a `https://cms.ladiesthegathering.com` para obtener los datos reales.
