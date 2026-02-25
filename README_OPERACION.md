# Operación real (Sprints 1–4)

## 1) Configuración inmediata (Sprint 1)
Edita el objeto `CONFIG` en `index.html`:
- `whatsappNumber`: número real con código país, sin `+`.
- `calendlyUrl`: enlace real de agenda.
- `sheetsWebhookUrl`: URL de Google Apps Script Web App.
- `emailNotify`: correo de ventas.

## 2) Conexión Google Sheets (Sprint 2)
1. Crear hoja con columnas: `createdAt, status, nombre, negocio, ciudad, telefono, lang, source, notifyEmail`.
2. En Apps Script, publicar una Web App que acepte `POST` JSON.
3. Guardar cada lead con estado inicial `nuevo`.
4. (Opcional) En Apps Script, enviar correo de notificación al `notifyEmail`.

## 3) Conversión (Sprint 3)
- Mantener casos reales actualizados.
- Usar prueba 7 días por defecto y 15 días por excepción.
- Activar CTA por nicho para mensajes de WhatsApp pre-encaminados.

## 4) Automatización inicial (Sprint 4)
- Flujo base: pregunta → calificación → cita.
- Reporte semanal: tiempo de respuesta, leads recuperados, citas generadas.

## Nota
Si `sheetsWebhookUrl` sigue con `TU_SCRIPT_ID`, el formulario igual guarda en `localStorage` para no perder datos.


## Checklist 48 horas (ejecución)
1. Configurar valores reales en `CONFIG` (`whatsappNumber`, `calendlyUrl`, `sheetsWebhookUrl`, `emailNotify`).
2. Publicar Apps Script Web App y pegar URL real en `sheetsWebhookUrl`.
3. Probar alta end-to-end: formulario → Sheets (`status=nuevo`) → WhatsApp prellenado.
4. Iniciar outreach el mismo día con tracking UTM (`utm_source`, `utm_medium`, `utm_campaign`).


## Sin dominio / sin Calendly (modo rápido)
- Puedes operar sin dominio (usa URL temporal del hosting).
- Si no tienes Calendly, deja `calendlyUrl` vacío (`''`) y la landing usará WhatsApp directo.
- Cuando tengas Calendly, solo actualiza `CONFIG.calendlyUrl`.
