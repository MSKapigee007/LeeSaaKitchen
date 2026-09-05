/**
 * Google Apps Script for Google Sheet:
 * https://docs.google.com/spreadsheets/d/1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4/edit?gid=0#gid=0
 *
 * SPREADSHEET ID: 1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4
 *
 * HOW TO ATTACH AND DEPLOY:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4/edit?gid=0#gid=0
 * 2. In Row 1, set up the columns:
 *    Col A: Order ID
 *    Col B: Timestamp
 *    Col C: Customer Name
 *    Col D: Phone
 *    Col E: Email
 *    Col F: Delivery Type
 *    Col G: Address
 *    Col H: Items Summary
 *    Col I: Subtotal ($)
 *    Col J: Total ($)
 *    Col K: Notes
 * 3. In the top menu, click Extensions -> Apps Script.
 * 4. Paste all of this code into Code.gs (replacing any sample code).
 * 5. Click "Deploy" (blue button at top right) -> "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set:
 *      Description: LeeSa's Grill Orders
 *      Execute as: Me
 *      Who has access: Anyone
 * 8. Click "Deploy" and Authorize access.
 * 9. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. You're done! Orders from the website will automatically stream into this spreadsheet.
 */

var SPREADSHEET_ID = "1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append row with order details
    sheet.appendRow([
      data.orderId || '',
      data.orderTimestamp || new Date().toLocaleString(),
      data.customerName || '',
      data.phone || '',
      data.email || '',
      data.deliveryType || 'delivery',
      data.address || '',
      data.itemsSummary || '',
      data.subtotal || 0,
      data.total || 0,
      data.notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        orderId: data.orderId,
        spreadsheetId: SPREADSHEET_ID
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("LeeSa's Grill Order Logging API for Sheet 1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4 is ACTIVE.");
}
