/**
 * Google Apps Script for Google Sheet:
 * https://docs.google.com/spreadsheets/d/1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4/edit?gid=0#gid=0
 *
 * SPREADSHEET ID: 1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4
 *
 * ALL ORDERS SUPPORTED:
 * 1. Online Food Orders (Regular menu cart)
 * 2. Build Your Bowl Orders (Custom NutriBowls with Base, Proteins, Add-Ons, Cheese, Veggies, Sauces, Seasoning)
 * 3. Catering Orders (Event catering, tray requests, guest counts & date)
 *
 * RECOMMENDED HEADERS FOR ROW 1 OF YOUR GOOGLE SHEET:
 * Col A: Order ID
 * Col B: Timestamp
 * Col C: Order Type (Online Order / Build Your Bowl / Catering Order)
 * Col D: Customer Name
 * Col E: Phone
 * Col F: Email
 * Col G: Delivery Type / Event Info
 * Col H: Delivery Address / Venue
 * Col I: Order Details / Bowl Recipe / Tray Package
 * Col J: Subtotal ($)
 * Col K: Total ($)
 * Col L: Special Instructions / Notes
 *
 * HOW TO DEPLOY:
 * 1. In your Google Sheet, click Extensions -> Apps Script.
 * 2. Replace Code.gs with this exact file.
 * 3. Click "Deploy" (top right) -> "New deployment" -> Select "Web app".
 * 4. Execute as: "Me", Who has access: "Anyone".
 * 5. Click "Deploy" and Authorize.
 */

var SPREADSHEET_ID = "1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4";

function doPost(e) {
  try {
    var sheet;
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    } catch (err) {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    }
    var data = JSON.parse(e.postData.contents);

    // Format event details if catering
    var deliveryOrEvent = data.deliveryType || 'Delivery';
    if (data.eventDate) {
      deliveryOrEvent += " (Date: " + data.eventDate + " | Guests: " + (data.guestsCount || 'N/A') + ")";
    }

    // Append full order row
    sheet.appendRow([
      data.orderId || '',
      data.orderTimestamp || new Date().toLocaleString(),
      data.orderType || 'Online Order',
      data.customerName || '',
      data.phone || '',
      data.email || '',
      deliveryOrEvent,
      data.address || 'N/A',
      data.itemsSummary || '',
      data.subtotal || 0,
      data.total || 0,
      data.notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        orderId: data.orderId,
        orderType: data.orderType,
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
  return ContentService.createTextOutput("LeeSa's Grill Order & Catering API is ACTIVE for Sheet: " + SPREADSHEET_ID);
}
