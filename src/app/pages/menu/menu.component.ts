import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuCategory } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: MenuCategory[] = [];
  filteredCategories: MenuCategory[] = [];
  activeCategory = 'All';
  menuTypeFilter: 'all' | 'veg' | 'non-veg' = 'all';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.categories = this.menuService.getCategories();
    this.filteredCategories = [...this.categories];
  }

  filterByCategory(categoryName: string) {
    this.activeCategory = categoryName;
    this.applyFilters();
  }

  filterByMenuType(type: 'all' | 'veg' | 'non-veg') {
    this.menuTypeFilter = type;
    this.applyFilters();
  }

  private applyFilters() {
    let result = this.categories;

    // Filter by type (veg vs non-veg vs all)
    if (this.menuTypeFilter === 'veg') {
      result = result
        .map(cat => ({
          ...cat,
          items: cat.items.filter(item => item.isVegetarian)
        }))
        .filter(cat => cat.items.length > 0);
    } else if (this.menuTypeFilter === 'non-veg') {
      result = result
        .map(cat => ({
          ...cat,
          items: cat.items.filter(item => !item.isVegetarian)
        }))
        .filter(cat => cat.items.length > 0);
    }

    // Filter by category tab
    if (this.activeCategory !== 'All') {
      result = result.filter(cat => cat.name === this.activeCategory);
    }

    this.filteredCategories = result;
  }

  getCategoryNames(): string[] {
    return ['All', ...this.categories.map(c => c.name)];
  }

  getTotalItems(): number {
    return this.filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  }
}
