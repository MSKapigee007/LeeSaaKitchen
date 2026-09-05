import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MenuItem, Testimonial } from '../../models/menu-item.model';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularItems: MenuItem[] = [];
  testimonials: Testimonial[] = [
    { name: 'Sarah M.', rating: 5, text: 'The Butter Chicken is absolutely divine! Best Indian food in Augusta. We order from LeeSaa Kitchen every week.', date: '2024-01-15' },
    { name: 'James K.', rating: 5, text: 'We used their catering for our wedding reception - 150 guests and everyone raved about the food. The Biryani was outstanding!', date: '2024-02-20' },
    { name: 'Priya R.', rating: 5, text: 'Authentic flavors that remind me of home cooking. The Dal Makhani and Garlic Naan combo is a must-try!', date: '2024-03-10' }
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.popularItems = this.menuService.getPopularItems().slice(0, 6);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
