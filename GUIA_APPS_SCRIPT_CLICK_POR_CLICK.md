# Guía click por click: publicar Apps Script y pegar URL `/exec`

## Objetivo
Conectar la landing con Google Sheets para guardar leads reales.

## 1) Crear proyecto
1. Ve a **https://script.new**.
2. Cambia el nombre del proyecto a `FlowRDWebhook`.
3. Borra el contenido inicial de `Code.gs`.
4. Pega el contenido de `apps_script/Code.gs`.
5. Guarda (Ctrl/Cmd + S).

## 2) Autorizar permisos
1. En el editor, selecciona función `doGet`.
2. Pulsa **Run / Ejecutar**.
3. Google pedirá permisos.
4. Acepta permisos de:
   - Google Sheets
   - Gmail (si usarás notificación por correo)

## 3) Preparar hoja
1. Crea un Google Sheet nuevo (ej: `Leads FlowRD`).
2. En Apps Script, abre:
   - **Project Settings** / Configuración del proyecto
   - Vincula el proyecto a ese Sheet (si aplica según versión de interfaz).
3. Si no existe la hoja `Leads`, el script la crea solo en el primer POST.

## 4) Publicar Web App
1. Click en **Deploy** > **New deployment**.
2. Tipo: **Web app**.
3. Ejecutar como: **Me (tu cuenta)**.
4. Who has access: **Anyone** o **Anyone with link**.
5. Click **Deploy**.
6. Copia la URL final que termina en **`/exec`**.

## 5) Pegar URL en frontend
En `index.html`, dentro de `DEFAULT_CONFIG` o en `window.__FLOWRD_CONFIG__`, pega:

- `sheetsWebhookUrl: 'https://script.google.com/macros/s/....../exec'`

Y actualiza también:
- `whatsappNumber`
- `calendlyUrl`
- `emailNotify`

## 6) Probar end-to-end
1. Abre la landing.
2. Completa formulario y envía.
3. Verifica en Google Sheets:
   - fila nueva
   - `status = nuevo`
   - UTM/source si hay query params
4. Verifica que abre WhatsApp prellenado.

## 7) Si algo falla
- Si el formulario muestra error webhook 4xx/5xx:
  - revisa URL `/exec`
  - revisa permisos del deploy
  - vuelve a desplegar nueva versión
- Si no llega email:
  - revisa `emailNotify`
  - confirma permisos Gmail en Apps Script
