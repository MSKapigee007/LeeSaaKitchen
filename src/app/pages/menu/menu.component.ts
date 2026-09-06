import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PdfSection {
  title: string;
  items: {
    name: string;
    price: string;
  }[];
}

export interface PdfMenuSheet {
  title: string;
  subtitle: string;
  type: 'veg' | 'non-veg';
  sections: PdfSection[];
  footerNote: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selectedGroup: 'all' | 'veg' | 'non-veg' = 'all';

  vegMenu: PdfMenuSheet = {
    title: 'Augusta Cloud Kitchen – Veg Menu',
    subtitle: 'Contact us via WhatsApp/Instagram/Facebook',
    type: 'veg',
    footerNote: 'NOTE: We have a separate menu for non-veg items, please scroll to the next page',
    sections: [
      {
        title: 'Tiffin',
        items: [
          { name: 'Medu Vada', price: '$2 per piece' },
          { name: 'Dahi Vada', price: '$2 per piece' },
          { name: 'Masala Vada', price: '$1.5 per piece' },
          { name: 'Upma/Semiya Upma/Pongal', price: 'Half tray $50 | Full Tray $90' },
          { name: 'Puri', price: '$1.5 per piece' }
        ]
      },
      {
        title: 'Chutney',
        items: [
          { name: 'Palli/Tomato/Pudina Chutney', price: 'Half tray $35 | Full Tray $60' }
        ]
      },
      {
        title: 'Appetizers',
        items: [
          { name: 'Cauliflower 65', price: 'Single $13 | Half tray $60 | Full Tray $110' },
          { name: 'Paneer 65', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Mirchi Bajji', price: '$2 per piece' },
          { name: 'Aaloo Bajji', price: '$1 per piece' },
          { name: 'Onion/Spinach pakodi', price: 'Half tray $70 | Full Tray $130' }
        ]
      },
      {
        title: 'Entrees',
        items: [
          { name: 'Paneer Butter Masala', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Kadai Paneer', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Palak Paneer', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Shahi Paneer', price: 'Single $14 | Half Tray $70 | Full Tray $130' },
          { name: 'Brinjal Masala', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Chana/Rajma Masala', price: 'Single $14 | Half tray $70 | Full Tray $130' },
          { name: 'Mix Veg curry', price: 'Single $14 | Half tray $70 | Full Tray $130' }
        ]
      },
      {
        title: 'Dal & Sambar',
        items: [
          { name: 'Tomato/Palak Dal', price: 'Half tray $50 | Full Tray $90' },
          { name: 'Rasam', price: 'Half tray $50 | Full Tray $90' },
          { name: 'Pachi pulusu', price: 'Half tray $50 | Full Tray $90' },
          { name: 'Dal Makhni', price: 'Half tray $50 | Full Tray $90' },
          { name: 'Sambar', price: 'Half tray $60 | Full Tray $100' }
        ]
      },
      {
        title: 'Fry',
        items: [
          { name: 'Bhendi fry', price: 'Half tray $70 | Full Tray $130' },
          { name: 'Tindora/Dhondakay fry', price: 'Half tray $70 | Full Tray $130' },
          { name: 'Fryums', price: 'Half tray $30 | Full Tray $50' },
          { name: 'Papad', price: '50ct $35 | 100ct $60' }
        ]
      },
      {
        title: 'Biryanis',
        items: [
          { name: 'Paneer Biryani', price: 'Single $16 | Half tray $90 | Full tray $170' }
        ]
      },
      {
        title: 'Rice Items',
        items: [
          { name: 'Pulihora/Bagara/Fried/Curd rice', price: 'Half tray $60 | Full Tray $100' },
          { name: 'Egg Fried rice', price: 'Half tray $80 | Full Tray $150' },
          { name: 'Chicken Fried rice', price: 'Half tray $100 | Full Tray $190' },
          { name: 'Jeera/Lemon rice', price: 'Half tray $50 | Full Tray $90' },
          { name: 'White rice', price: 'Half tray $40 | Full Tray $80' }
        ]
      },
      {
        title: 'Desserts',
        items: [
          { name: 'Kesari halwa', price: 'Half tray $70 | Full Tray $140' },
          { name: 'Fruit custard', price: 'Half tray $80 | Full Tray $150' },
          { name: 'Kaddhu ka kheer', price: 'Half tray $80 | Full Tray $150' },
          { name: 'Phirni kheer', price: 'Half tray $80 | Full Tray $150' },
          { name: 'Payasam', price: 'Half tray $80 | Full Tray $150' },
          { name: 'Gulab Jamun', price: '$1.5 per piece' },
          { name: 'Double ka meetha', price: 'Half tray $90 | Full Tray $170' }
        ]
      }
    ]
  };

  nonVegMenu: PdfMenuSheet = {
    title: 'Augusta Cloud Kitchen – Non Veg Menu',
    subtitle: 'Contact us via WhatsApp/Instagram/Facebook',
    type: 'non-veg',
    footerNote: 'NOTE: All meats are halal.',
    sections: [
      {
        title: 'Appetizers',
        items: [
          { name: 'Chicken 65', price: 'Single $18 | Half tray $100 | Full tray $180' },
          { name: 'Chicken Drumsticks Grilled', price: '$2.5 per piece | 50pc $100' },
          { name: 'Chicken Wings Grilled', price: '$1.5 per piece | 50pc $70' },
          { name: 'Chicken Wings Fried', price: '$2 per piece | 50pc $80' },
          { name: 'Apollo Fish', price: 'Single $22 | Half tray $110 | Full tray $200' },
          { name: 'Fried Shrimp', price: 'Single $22 | Half tray $110 | Full tray $200' }
        ]
      },
      {
        title: 'Entrees',
        items: [
          { name: 'Regular Chicken curry', price: 'Single $14 | Half tray $80 | Full tray $150' },
          { name: 'Butter Chicken Masala', price: 'Single $16 | Half Tray $90 | Full Tray $160' },
          { name: 'Chicken Tikka Masala', price: 'Single $16 | Half Tray $90 | Full Tray $160' },
          { name: 'Green/Special Red Chicken/Murg Musallam', price: 'Single $16 | Half tray $90 | Full tray $160' },
          { name: 'Mutton curry', price: 'Single $22 | Half tray $140 | Full tray $260' },
          { name: 'Shrimp curry', price: 'Single $20 | Half tray $120 | Full tray $200' }
        ]
      },
      {
        title: 'Biryanis',
        items: [
          { name: 'Hyderabadi Chicken Dum Biryani', price: 'Single $18 | Half tray $100 | Full tray $180' },
          { name: 'Hyderabadi Mutton Dum biryani', price: 'Single $24 | Half tray $150 | Full tray $280' }
        ]
      },
      {
        title: 'Specials',
        items: [
          { name: 'Hakka Noodles', price: 'Veg $14 | Egg $15 | Chicken $16' },
          { name: 'Mutton Haleem', price: '$20' },
          { name: 'Chicken Harees', price: '$18' }
        ]
      }
    ]
  };

  setGroup(group: 'all' | 'veg' | 'non-veg') {
    this.selectedGroup = group;
  }

  get showVeg(): boolean {
    return this.selectedGroup === 'all' || this.selectedGroup === 'veg';
  }

  get showNonVeg(): boolean {
    return this.selectedGroup === 'all' || this.selectedGroup === 'non-veg';
  }
}
