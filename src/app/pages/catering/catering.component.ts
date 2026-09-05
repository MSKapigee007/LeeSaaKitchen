import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
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
  cateringPackages: MenuCategory | undefined;

  constructor(private fb: FormBuilder, private menuService: MenuService) {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      eventDate: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(10)]],
      packageType: ['Gold Package'],
      specialRequests: ['']
    });
    this.cateringPackages = this.menuService.getCategoryByName('Catering Packages');
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.submitted = true;
    } else {
      Object.keys(this.quoteForm.controls).forEach(key => {
        this.quoteForm.get(key)?.markAsTouched();
      });
    }
  }
}
