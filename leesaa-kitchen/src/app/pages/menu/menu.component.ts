import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { MenuCategory } from '../../models/menu-item.model';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuCardComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: MenuCategory[] = [];
  filteredCategories: MenuCategory[] = [];
  searchQuery = '';
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

  onSearch() {
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

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result
        .map(cat => ({
          ...cat,
          items: cat.items.filter(
            item =>
              item.name.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
          )
        }))
        .filter(cat => cat.items.length > 0);
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
