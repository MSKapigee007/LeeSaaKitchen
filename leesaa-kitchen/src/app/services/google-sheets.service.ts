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
   * Google Apps Script Web App endpoint URL.
   * You can replace this with your deployed Google Apps Script URL.
   */
  private googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbwYOUR_SCRIPT_ID_HERE/exec';

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
   * Logs order payload to Google Sheets via Google Apps Script web app endpoint.
   * Uses no-cors fetch so the request is safely transmitted even without direct CORS headers.
   * Also backs up the order in browser localStorage as a fallback.
   */
  async logOrderToGoogleSheets(order: OrderLogPayload): Promise<boolean> {
    // 1. Always save order to local storage log as an immediate client-side fallback
    this.saveToLocalLog(order);

    // 2. Transmit to Google Apps Script / Google Sheets
    try {
      if (this.googleAppsScriptUrl && !this.googleAppsScriptUrl.includes('YOUR_SCRIPT_ID_HERE')) {
        await fetch(this.googleAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        });
        console.log(`[GoogleSheetsService] Successfully dispatched order #${order.orderId} to Google Sheets.`);
      } else {
        console.info(`[GoogleSheetsService] Order #${order.orderId} logged locally. (Provide Google Apps Script Web App URL to stream directly into Google Sheets).`, order);
      }
      return true;
    } catch (err) {
      console.warn(`[GoogleSheetsService] Could not reach Google Sheets endpoint directly; saved locally:`, err);
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
