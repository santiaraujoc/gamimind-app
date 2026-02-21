# Gamimind App

Aplicación móvil de salud mental y autocuidado dirigida a un público joven.

## Component Showcase (Solo Desarrollo)

Para facilitar la consistencia en el diseño y poder revisar todos los componentes reutilizables (basados en la paleta **Soft Serenity**), se ha implementado una galería de componentes interactiva.

### ¿Cómo acceder?

1. Instala las dependencias y ejecuta la aplicación en modo desarrollo:
   ```bash
   npm install
   npm start
   ```
2. Al iniciar la aplicación, en la pantalla inicial de bienvenida ("WelcomeScreen"), verás un botón al final que dice **"Ver Componentes (Dev)"**.
3. *Nota*: Este botón solo es visible cuando la variable `__DEV__` es `true`. No aparecerá en los builds de producción.

### Componentes Incluidos

La galería actual incluye variantes completas y micro-interacciones de:
- Buttons (Primary, Secondary, Outline, Disabled, Loading)
- Modals / Dialogs (Alert, Confirmation)
- Cards (Activity, Resource, Progress)
- Inputs (Text, Text Area, Error States)
- Avatars (con Emociones)
- Notifications (Success, Error, Info Toasts)
- Progress Bars (Linear & Circular)
- Tabs (Segmented Control & Top Tabs)
- Checkboxes y Switches

### ¿Cómo añadir nuevos componentes a la galería?

Cada vez que desarrolles un componente reutilizable en la carpeta `src/components`, deberás agregarlo al Component Showcase para mantener la galería actualizada:

1. Abre el archivo `src/screens/ComponentShowcase.js`.
2. Importa tu nuevo componente.
3. Añade una nueva sección (`<View style={styles.section}>`) dentro del `ScrollView`.
4. Incluye un título para tu componente y envuélvelo dentro de un contenedor (ej. `<View style={styles.componentContainer}>`).
5. Asegúrate de añadir variantes (uso de `theme.js`) y estados interactivos usando los Local States de la pantalla.

---
*Desarrollado con React Native y Expo.*
