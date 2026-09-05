import { Injectable } from '@angular/core';
import { MenuCategory, MenuItem } from '../models/menu-item.model';
import menuData from '../data/menu-data.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private categories: MenuCategory[] = menuData.categories as MenuCategory[];

  getCategories(): MenuCategory[] {
    return this.categories;
  }

  getPopularItems(): MenuItem[] {
    return this.categories
      .flatMap(cat => cat.items)
      .filter(item => item.isPopular);
  }

  searchItems(query: string): MenuItem[] {
    const lowerQuery = query.toLowerCase();
    return this.categories
      .flatMap(cat => cat.items)
      .filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
  }

  getCategoryByName(name: string): MenuCategory | undefined {
    return this.categories.find(cat => cat.name === name);
  }

  getVegetarianItems(): MenuItem[] {
    return this.categories
      .flatMap(cat => cat.items)
      .filter(item => item.isVegetarian);
  }
}
