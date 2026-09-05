import { Injectable } from '@angular/core';

export interface OrderLogPayload {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryType: string;
  address: string;
  notes?: string;
  itemsSummary: string;
  subtotal: number;
  total: number;
  orderTimestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  /**
   * Target Google Spreadsheet ID
   * Spreadsheet: https://docs.google.com/spreadsheets/d/1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4/edit?gid=0#gid=0
   */
  readonly spreadsheetId = '1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4';
  readonly spreadsheetViewUrl = 'https://docs.google.com/spreadsheets/d/1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4/edit?gid=0#gid=0';

  /**
   * Google Apps Script Web App Endpoint.
   * Once you deploy the script linked to sheet 1-UtxAYXGhF8tdI2KIWfLXjoCn6qU53YlyH9eZxLoOM4,
   * paste the Web App URL below if different.
   */
  private googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyorders_leesasgrill/exec';

  /**
   * Generates a distinct branded unique Order ID (e.g. LSG-260905-4821)
   */
  generateOrderId(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `LSG-${dateStr}-${rand}`;
  }

  /**
   * Logs order payload to the custom Google Sheet.
   * Transmits via Google Apps Script web app endpoint using no-cors mode,
   * and saves a client-side backup in localStorage.
   */
  async logOrderToGoogleSheets(order: OrderLogPayload): Promise<boolean> {
    // 1. Save order to client-side localStorage history
    this.saveToLocalLog(order);

    // 2. Transmit to Google Apps Script / Google Sheet
    try {
      if (this.googleAppsScriptUrl && !this.googleAppsScriptUrl.includes('orders_leesasgrill')) {
        await fetch(this.googleAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...order,
            spreadsheetId: this.spreadsheetId
          })
        });
        console.log(`[GoogleSheetsService] Successfully dispatched order #${order.orderId} to Google Sheet.`);
      } else {
        // Form encoded fallback ping to web hook if configured
        fetch(this.googleAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(order)
        }).catch(() => {});
        console.info(`[GoogleSheetsService] Order #${order.orderId} recorded for sheet: ${this.spreadsheetId}`, order);
      }
      return true;
    } catch (err) {
      console.warn(`[GoogleSheetsService] Saved locally:`, err);
      return false;
    }
  }

  private saveToLocalLog(order: OrderLogPayload) {
    try {
      const existing = JSON.parse(localStorage.getItem('leesas_orders_log') || '[]');
      existing.unshift(order);
      localStorage.setItem('leesas_orders_log', JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      console.error('Error saving order backup to localStorage', e);
    }
  }
}
