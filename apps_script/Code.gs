/**
 * FlowRD AI - Webhook Google Apps Script para capturar leads desde la landing.
 *
 * Columnas esperadas en la hoja (en este orden):
 * createdAt, status, nombre, negocio, ciudad, telefono, lang, source, utm_source, utm_medium, utm_campaign, notifyEmail
 */

const SHEET_NAME = 'Leads';
// Recomendado para proyectos standalone (script.new): pega aquí el ID de tu Google Sheet.
// Si lo dejas vacío, se intentará usar la hoja vinculada (container-bound).
const SPREADSHEET_ID = '';

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const body = JSON.parse(raw);

    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'createdAt',
        'status',
        'nombre',
        'negocio',
        'ciudad',
        'telefono',
        'lang',
        'source',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'notifyEmail',
      ]);
    }

    const row = [
      body.createdAt || new Date().toISOString(),
      body.status || 'nuevo',
      body.nombre || '',
      body.negocio || '',
      body.ciudad || '',
      body.telefono || '',
      body.lang || 'es',
      body.source || 'landing-flowrd',
      body.utm_source || '',
      body.utm_medium || '',
      body.utm_campaign || '',
      body.notifyEmail || '',
    ];

    sheet.appendRow(row);

    if (body.notifyEmail) {
      MailApp.sendEmail({
        to: body.notifyEmail,
        subject: `[FlowRD] Nuevo lead: ${body.nombre || 'Sin nombre'}`,
        htmlBody: `
          <p><b>Nuevo lead recibido</b></p>
          <ul>
            <li><b>Nombre:</b> ${escapeHtml(body.nombre || '')}</li>
            <li><b>Negocio:</b> ${escapeHtml(body.negocio || '')}</li>
            <li><b>Ciudad:</b> ${escapeHtml(body.ciudad || '')}</li>
            <li><b>Teléfono:</b> ${escapeHtml(body.telefono || '')}</li>
            <li><b>Status:</b> ${escapeHtml(body.status || 'nuevo')}</li>
            <li><b>UTM:</b> ${escapeHtml((body.utm_source || '-') + ' / ' + (body.utm_medium || '-') + ' / ' + (body.utm_campaign || '-'))}</li>
          </ul>
        `,
      });
    }

    return jsonResponse(200, { ok: true, message: 'Lead guardado' });
  } catch (err) {
    return jsonResponse(500, { ok: false, error: String(err) });
  }
}

function doGet() {
  try {
    const ss = getSpreadsheet();
    return jsonResponse(200, {
      ok: true,
      message: 'Webhook FlowRD activo',
      spreadsheetId: ss.getId(),
      spreadsheetName: ss.getName(),
      sheetName: SHEET_NAME,
    });
  } catch (err) {
    return jsonResponse(500, {
      ok: false,
      message: 'Webhook FlowRD sin acceso a hoja',
      error: String(err),
    });
  }
}

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('No hay hoja activa. Define SPREADSHEET_ID o vincula el proyecto a un Google Sheet.');
  }
  return active;
}

function jsonResponse(statusCode, payload) {
  return ContentService
    .createTextOutput(JSON.stringify({ statusCode, ...payload }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
