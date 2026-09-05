import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { MenuCategory, MenuItem } from '../../models/menu-item.model';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuCardComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  categories: MenuCategory[] = [];
  cart: CartItem[] = [];
  showCart = false;
  orderPlaced = false;
  searchQuery = '';
  filteredCategories: MenuCategory[] = [];
  checkoutForm: FormGroup;
  orderNumber = Math.floor(Math.random() * 9000 + 1000);

  constructor(private menuService: MenuService, private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      deliveryType: ['delivery'],
      notes: ['']
    });
  }

  ngOnInit() {
    this.categories = this.menuService.getCategories().filter(c => c.name !== 'Catering Packages');
    this.filteredCategories = [...this.categories];
  }

  addToCart(item: MenuItem) {
    const existing = this.cart.find(c => c.item.name === item.name);
    if (existing) { existing.quantity++; } else { this.cart.push({ item, quantity: 1 }); }
  }

  removeFromCart(index: number) { this.cart.splice(index, 1); }

  updateQuantity(index: number, delta: number) {
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) this.cart.splice(index, 1);
  }

  getCartTotal(): number { return this.cart.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0); }
  getCartCount(): number { return this.cart.reduce((sum, ci) => sum + ci.quantity, 0); }
  toggleCart() { this.showCart = !this.showCart; }

  onSearch() {
    if (!this.searchQuery.trim()) { this.filteredCategories = [...this.categories]; return; }
    const query = this.searchQuery.toLowerCase();
    this.filteredCategories = this.categories.map(cat => ({ ...cat, items: cat.items.filter(item => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) })).filter(cat => cat.items.length > 0);
  }

  placeOrder() {
    if (this.checkoutForm.valid && this.cart.length > 0) {
      this.orderPlaced = true;
    } else {
      Object.keys(this.checkoutForm.controls).forEach(key => { this.checkoutForm.get(key)?.markAsTouched(); });
    }
  }
}
