import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent {
  @Input() item!: MenuItem;
  @Input() showAddToCart = false;
  @Output() addToCart = new EventEmitter<MenuItem>();

  onAddToCart() {
    this.addToCart.emit(this.item);
  }
}
