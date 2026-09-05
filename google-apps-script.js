/**
 * Google Apps Script to log LeeSa's Grill orders directly into Google Sheets.
 *
 * HOW TO SET UP IN 2 MINUTES:
 * 1. Open Google Sheets (https://sheets.new) and create a new sheet.
 * 2. Name your sheet tab "Orders" (default is usually "Sheet1", you can keep or rename).
 * 3. Add header row (Row 1):
 *    [Order ID, Timestamp, Customer Name, Phone, Email, Delivery Type, Address, Items Summary, Subtotal, Total, Notes]
 * 4. Click Extensions -> Apps Script.
 * 5. Paste the code below into Code.gs.
 * 6. Click Deploy -> New deployment.
 * 7. Select type: "Web app".
 * 8. Execute as: "Me", Who has access: "Anyone".
 * 9. Click Deploy and copy the Web App URL (starts with https://script.google.com/macros/s/...).
 * 10. Paste the URL into `googleAppsScriptUrl` inside `src/app/services/google-sheets.service.ts`.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append row with order details
    sheet.appendRow([
      data.orderId || '',
      data.orderTimestamp || new Date().toLocaleString(),
      data.customerName || '',
      data.phone || '',
      data.email || '',
      data.deliveryType || '',
      data.address || '',
      data.itemsSummary || '',
      data.subtotal || 0,
      data.total || 0,
      data.notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("LeeSa's Grill Order Logging API is active.");
}
