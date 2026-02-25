# Publicar backend en Google Apps Script (Paso B)

## 1) Crear proyecto
1. Abre https://script.new
2. Pega el contenido de `Code.gs`.
3. Guarda con nombre: `FlowRDWebhook`.

## 2) Vincular hoja
1. Crea un Google Sheet.
2. En Apps Script: **Archivo > Configuración del proyecto > Vincular hoja de cálculo** (o ejecuta y luego abre la hoja desde el script).
3. Asegúrate de tener/crear la pestaña `Leads`.

## 3) Publicar Web App
1. **Implementar > Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Tú**.
4. Acceso: **Cualquiera con el enlace**.
5. Copia la URL final `/exec`.

## 4) Pegar URL en la landing
En `index.html`, en `CONFIG.sheetsWebhookUrl`, pega esa URL.

## 5) Probar rápido (end-to-end)
Envía un POST de prueba:

```bash
curl -X POST "TU_URL_EXEC" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Ana",
    "negocio":"Clinica Uno",
    "ciudad":"Santiago",
    "telefono":"8091112233",
    "status":"nuevo",
    "lang":"es",
    "source":"landing-flowrd",
    "utm_source":"instagram",
    "utm_medium":"dm",
    "utm_campaign":"lanzamiento",
    "notifyEmail":"ventas@flowrd.ai"
  }'
```

Si responde `ok: true`, ya quedó listo.


## Nota sobre CORS (importante)
Si ves en la landing el mensaje de confirmación limitada, puede ser CORS del navegador contra Apps Script.
En ese caso revisa Google Sheet: si la fila se guardó, el envío fue exitoso.
