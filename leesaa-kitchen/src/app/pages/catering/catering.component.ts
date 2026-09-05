import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { GoogleSheetsService, OrderLogPayload } from '../../services/google-sheets.service';
import { MenuCategory } from '../../models/menu-item.model';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';

@Component({
  selector: 'app-catering',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuCardComponent],
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.css']
})
export class CateringComponent {
  quoteForm: FormGroup;
  submitted = false;
  isSubmitting = false;
  cateringOrderId = '';
  cateringPackages: MenuCategory | undefined;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private sheetsService: GoogleSheetsService
  ) {
    this.cateringOrderId = this.sheetsService.generateOrderId('CAT');
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      eventDate: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(10)]],
      packageType: ['Combination of Half Trays'],
      specialRequests: ['']
    });
    this.cateringPackages = this.menuService.getCategoryByName('Catering Packages');
  }

  async onSubmit() {
    if (this.quoteForm.valid) {
      this.isSubmitting = true;

      const guestsCount = this.quoteForm.value.guests;
      const packageType = this.quoteForm.value.packageType;
      const specialRequests = this.quoteForm.value.specialRequests || 'None';

      const payload: OrderLogPayload = {
        orderId: this.cateringOrderId,
        orderType: 'Catering Order',
        customerName: this.quoteForm.value.name,
        phone: this.quoteForm.value.phone,
        email: this.quoteForm.value.email,
        deliveryType: 'Catering Event Delivery',
        address: 'Event Location to be confirmed via phone',
        notes: `Catering Tray Selection: ${packageType} | Dietary/Dishes: ${specialRequests}`,
        itemsSummary: `Event Catering for ${guestsCount} Guests - Package: ${packageType}`,
        subtotal: 0,
        total: 0,
        orderTimestamp: new Date().toLocaleString(),
        eventDate: this.quoteForm.value.eventDate,
        guestsCount: guestsCount
      };

      await this.sheetsService.logOrderToGoogleSheets(payload);

      this.isSubmitting = false;
      this.submitted = true;
    } else {
      Object.keys(this.quoteForm.controls).forEach(key => {
        this.quoteForm.get(key)?.markAsTouched();
      });
    }
  }
}
