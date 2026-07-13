// Google Apps Script — paste this into Extensions > Apps Script on your Google Sheet.
// See README.md for full step-by-step setup instructions.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVPs');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVPs');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Guests', 'Dietary needs / message']);
  }

  var data = e.parameter;
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.attending || '',
    data.guests || '',
    data.notes || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
