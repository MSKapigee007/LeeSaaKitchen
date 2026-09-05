import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface OptionItem {
  name: string;
  desc?: string;
  price?: number;
  icon?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isHalal?: boolean;
}

interface StepSection {
  id: string;
  stepNum: number;
  title: string;
  heading: string;
  subtitle: string;
  type: 'single' | 'multiple';
  minRequired?: number;
  maxSelect?: number;
  items: OptionItem[];
}

@Component({
  selector: 'app-build-bowl',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './build-bowl.component.html',
  styleUrls: ['./build-bowl.component.css']
})
export class BuildBowlComponent {
  baseBowlPrice = 11.99;
  orderAdded = false;

  // Selected state
  selectedBase: OptionItem | null = null;
  selectedProteins: OptionItem[] = [];
  selectedAddOns: OptionItem[] = [];
  selectedCheese: OptionItem | null = null;
  selectedVeggies: OptionItem[] = [];
  selectedSauces: OptionItem[] = [];
  selectedSeasoning: OptionItem[] = [];
  specialInstructions = '';

  sections: StepSection[] = [
    {
      id: 'base',
      stepNum: 1,
      title: 'Base',
      heading: 'CHOOSE YOUR BASE',
      subtitle: 'Pick 1 wholesome foundation for your bowl',
      type: 'single',
      items: [
        { name: 'Warm Basmati Rice', desc: 'Aromatic long-grain steamed basmati rice', icon: '🍚', isVegetarian: true },
        { name: 'Brown Rice & Quinoa', desc: 'Hearty whole grain fiber blend', icon: '🌾', isVegetarian: true, isPopular: true },
        { name: 'Fragrant Jeera / Lemon Rice', desc: 'Lightly spiced with cumin or lemon & mustard seeds', icon: '🍋', isVegetarian: true },
        { name: 'Fresh Crisp Greens Mix', desc: 'Chopped romaine, baby spinach & arugula', icon: '🥗', isVegetarian: true },
        { name: 'Half Greens & Half Grain', desc: 'Best of both worlds: crisp salad + warm grain', icon: '⚖️', isVegetarian: true, isPopular: true }
      ]
    },
    {
      id: 'protein',
      stepNum: 2,
      title: 'Protein',
      heading: 'POWER IT UP',
      subtitle: 'Select your savory centerpiece (1 included, extra +$3.50)',
      type: 'multiple',
      maxSelect: 2,
      items: [
        { name: 'Chicken Tikka / 65', desc: 'Smoky grilled halal chicken tossed in tandoori spices', icon: '🍗', isHalal: true, isPopular: true },
        { name: 'Butter Chicken Morsels', desc: 'Juicy halal chicken in creamy spiced tomato butter glaze', icon: '🍖', isHalal: true },
        { name: 'Braised Halal Mutton / Goat', desc: 'Slow-cooked melt-in-mouth mutton with warm spices', icon: '🥩', price: 2.50, isHalal: true },
        { name: 'Grilled Paneer Tikka', desc: 'Marinated cottage cheese cubes grilled with peppers', icon: '🧀', isVegetarian: true, isPopular: true },
        { name: 'Spiced Garbanzo / Chana', desc: 'Protein-packed savory chickpeas simmered in herbs', icon: '🧆', isVegetarian: true },
        { name: 'Crispy Falafel / Pakodi', desc: 'Golden crunchy lentil and herb fritters', icon: '🥟', isVegetarian: true }
      ]
    },
    {
      id: 'addons',
      stepNum: 3,
      title: 'Add-Ons',
      heading: 'MAKE IT EXTRA',
      subtitle: 'Boost taste, crunch & indulgence (Select any)',
      type: 'multiple',
      items: [
        { name: 'Crispy Samosa Crunch', desc: 'Crushed golden potato samosa pastry', icon: '🥟', price: 1.50, isVegetarian: true, isPopular: true },
        { name: 'Boiled Egg (Halal)', desc: 'Farm fresh sliced boiled egg', icon: '🥚', price: 1.25 },
        { name: 'Spicy Potato Cutlet', desc: 'Pan-seared seasoned aloo patty', icon: '🥔', price: 1.50, isVegetarian: true },
        { name: 'Crispy Colored Fryums', desc: 'Traditional South Asian crunchy bite', icon: '🥨', price: 0.99, isVegetarian: true },
        { name: 'Extra Butter Glaze / Ghee Drizzle', desc: 'Pure desi ghee or warm makhani drizzle', icon: '🧈', price: 1.00, isVegetarian: true }
      ]
    },
    {
      id: 'cheese',
      stepNum: 4,
      title: 'Cheese',
      heading: 'SAY CHEESE 🧀',
      subtitle: 'Indo-American fusion cheesy touch (Select 1 or none)',
      type: 'single',
      items: [
        { name: 'Shredded Monterey Jack & Cheddar', desc: 'Classic melted American blend', icon: '🧀', isVegetarian: true },
        { name: 'Crumbled Indian Paneer', desc: 'Mild and creamy freshly crumbled paneer', icon: '🤍', isVegetarian: true, isPopular: true },
        { name: 'Spicy Ghost Pepper Jack', desc: 'For those who want an extra spicy kick', icon: '🌶️', isVegetarian: true },
        { name: 'No Cheese', desc: 'Keep it light & dairy-free', icon: '🚫' }
      ]
    },
    {
      id: 'veggies',
      stepNum: 5,
      title: 'Veggies',
      heading: 'LOAD UP THE VEGGIES',
      subtitle: 'Fresh, crunchy, and pickled toppings (Select up to 4)',
      type: 'multiple',
      maxSelect: 4,
      items: [
        { name: 'Pickled Red Onions (Lachha)', icon: '🧅', isVegetarian: true, isPopular: true },
        { name: 'Diced Cucumbers & Roma Tomatoes', icon: '🥒', isVegetarian: true },
        { name: 'Roasted Sweet Corn with Chaat Masala', icon: '🌽', isVegetarian: true, isPopular: true },
        { name: 'Sauteed Bell Peppers & Onions', icon: '🫑', isVegetarian: true },
        { name: 'Spicy Jalapeño / Green Chilies', icon: '🌶️', isVegetarian: true },
        { name: 'Shredded Carrots & Cabbage Slaw', icon: '🥕', isVegetarian: true },
        { name: 'Fresh Baby Spinach', icon: '🍃', isVegetarian: true }
      ]
    },
    {
      id: 'sauces',
      stepNum: 6,
      title: 'Sauces',
      heading: 'DRIZZLE & DRESS',
      subtitle: 'Signature homemade dressings & chutneys (Select up to 3)',
      type: 'multiple',
      maxSelect: 3,
      items: [
        { name: 'Makhani / Butter Chicken Sauce', desc: 'Rich, creamy mild tomato butter sauce', icon: '🍛', isPopular: true },
        { name: 'Cool Mint & Cilantro Chutney', desc: 'Fresh refreshing herbal kick', icon: '🌿', isVegetarian: true, isPopular: true },
        { name: 'Sweet Tamarind Date Glaze', desc: 'Tangy and sweet traditional reduction', icon: '🍯', isVegetarian: true },
        { name: 'Spicy Chili Garlic Mayo', desc: 'Indo-American creamy garlic heat', icon: '🌶️' },
        { name: 'Cool Cucumber Raita', desc: 'Wholesome seasoned yogurt drizzle', icon: '🥛', isVegetarian: true },
        { name: 'Fiery Andhra Karam Chutney', desc: 'Spicy South Indian red chili relish', icon: '🔥', isVegetarian: true }
      ]
    },
    {
      id: 'seasoning',
      stepNum: 7,
      title: 'Seasoning',
      heading: 'FINISH WITH FLAVOR',
      subtitle: 'The finishing aromatic flourish (Select up to 2)',
      type: 'multiple',
      maxSelect: 2,
      items: [
        { name: 'Authentic Chaat Masala', desc: 'Tangy, savory South Asian spice dust', icon: '✨', isPopular: true },
        { name: 'Toasted Cumin & Sea Salt', desc: 'Earthy roasted jeera fragrance', icon: '🧂' },
        { name: 'Fresh Chopped Cilantro & Lime', desc: 'Zesty citrus herbaceous finish', icon: '🍋', isPopular: true },
        { name: 'Crispy Fried Onions (Birista)', desc: 'Sweet, caramelized crunchy onions', icon: '🧅', isPopular: true },
        { name: 'Crushed Red Pepper Flakes', desc: 'Pure chili heat', icon: '🌶️' }
      ]
    }
  ];

  constructor() {
    // Default select first base
    this.selectedBase = this.sections[0].items[0];
  }

  selectBase(item: OptionItem) {
    this.selectedBase = item;
  }

  toggleProtein(item: OptionItem) {
    const idx = this.selectedProteins.findIndex(p => p.name === item.name);
    if (idx >= 0) {
      this.selectedProteins.splice(idx, 1);
    } else {
      if (this.selectedProteins.length < 2) {
        this.selectedProteins.push(item);
      } else {
        this.selectedProteins.shift();
        this.selectedProteins.push(item);
      }
    }
  }

  isProteinSelected(item: OptionItem): boolean {
    return this.selectedProteins.some(p => p.name === item.name);
  }

  toggleAddOn(item: OptionItem) {
    const idx = this.selectedAddOns.findIndex(a => a.name === item.name);
    if (idx >= 0) {
      this.selectedAddOns.splice(idx, 1);
    } else {
      this.selectedAddOns.push(item);
    }
  }

  isAddOnSelected(item: OptionItem): boolean {
    return this.selectedAddOns.some(a => a.name === item.name);
  }

  selectCheese(item: OptionItem) {
    this.selectedCheese = item;
  }

  toggleVeggie(item: OptionItem) {
    const idx = this.selectedVeggies.findIndex(v => v.name === item.name);
    if (idx >= 0) {
      this.selectedVeggies.splice(idx, 1);
    } else {
      if (this.selectedVeggies.length < 4) {
        this.selectedVeggies.push(item);
      }
    }
  }

  isVeggieSelected(item: OptionItem): boolean {
    return this.selectedVeggies.some(v => v.name === item.name);
  }

  toggleSauce(item: OptionItem) {
    const idx = this.selectedSauces.findIndex(s => s.name === item.name);
    if (idx >= 0) {
      this.selectedSauces.splice(idx, 1);
    } else {
      if (this.selectedSauces.length < 3) {
        this.selectedSauces.push(item);
      }
    }
  }

  isSauceSelected(item: OptionItem): boolean {
    return this.selectedSauces.some(s => s.name === item.name);
  }

  toggleSeasoning(item: OptionItem) {
    const idx = this.selectedSeasoning.findIndex(s => s.name === item.name);
    if (idx >= 0) {
      this.selectedSeasoning.splice(idx, 1);
    } else {
      if (this.selectedSeasoning.length < 2) {
        this.selectedSeasoning.push(item);
      }
    }
  }

  isSeasoningSelected(item: OptionItem): boolean {
    return this.selectedSeasoning.some(s => s.name === item.name);
  }

  calculateTotal(): number {
    let total = this.baseBowlPrice;
    
    // Extra protein surcharge if more than 1
    if (this.selectedProteins.length > 1) {
      total += 3.50;
    }
    // Specific protein upcharge (e.g. Mutton)
    this.selectedProteins.forEach(p => {
      if (p.price) total += p.price;
    });

    // Add-ons
    this.selectedAddOns.forEach(a => {
      if (a.price) total += a.price;
    });

    return total;
  }

  canSubmit(): boolean {
    return !!this.selectedBase && this.selectedProteins.length > 0;
  }

  addBowlToOrder() {
    if (this.canSubmit()) {
      this.orderAdded = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  resetBowl() {
    this.selectedBase = this.sections[0].items[0];
    this.selectedProteins = [];
    this.selectedAddOns = [];
    this.selectedCheese = null;
    this.selectedVeggies = [];
    this.selectedSauces = [];
    this.selectedSeasoning = [];
    this.orderAdded = false;
  }
}
