import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GoogleSheetsService, OrderLogPayload } from '../../services/google-sheets.service';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './build-bowl.component.html',
  styleUrls: ['./build-bowl.component.css']
})
export class BuildBowlComponent {
  baseBowlPrice = 11.99;
  orderPlaced = false;
  isSubmitting = false;
  bowlOrderId = '';
  showCheckoutStep = false;
  checkoutForm!: FormGroup;

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
      heading: 'CHOOSE YOUR CHEESE',
      subtitle: 'Pick 1 melted or grated finish',
      type: 'single',
      items: [
        { name: 'Shredded Pepper Jack', desc: 'Zesty, spicy melted kick', icon: '🌶️', isVegetarian: true, isPopular: true },
        { name: 'Cheddar & Mozzarella Blend', desc: 'Classic golden gooey blend', icon: '🧀', isVegetarian: true },
        { name: 'Crumbled Paneer / Feta', desc: 'Fresh mild crumbly cheese', icon: '🥛', isVegetarian: true },
        { name: 'No Cheese (Dairy-Free)', desc: 'Keep it clean and light', icon: '🌱', isVegetarian: true }
      ]
    },
    {
      id: 'veggies',
      stepNum: 5,
      title: 'Veggies',
      heading: 'FRESH TOPPINGS & GREENS',
      subtitle: 'Choose up to 4 garden fresh crisp veggies',
      type: 'multiple',
      maxSelect: 4,
      items: [
        { name: 'Pickled Red Onions', desc: 'Tangy homemade spiced crunch', icon: '🧅', isVegetarian: true, isPopular: true },
        { name: 'Cucumber & Tomato Kachumber', desc: 'Diced salad with lemon herb dressing', icon: '🥒', isVegetarian: true, isPopular: true },
        { name: 'Sweet Charred Corn', desc: 'Roasted corn kernels with chaat herbs', icon: '🌽', isVegetarian: true },
        { name: 'Shredded Carrots & Cabbage', desc: 'Crisp slaw tossed with mustard seeds', icon: '🥕', isVegetarian: true },
        { name: 'Tandoori Roasted Bell Peppers', desc: 'Charred tri-color capsicum', icon: '🫑', isVegetarian: true },
        { name: 'Baby Spinach Leaves', desc: 'Tender fresh nutrient greens', icon: '🥬', isVegetarian: true }
      ]
    },
    {
      id: 'sauce',
      stepNum: 6,
      title: 'Sauces',
      heading: 'SAUCED & FLAVORED',
      subtitle: 'Pick up to 3 house signature sauces',
      type: 'multiple',
      maxSelect: 3,
      items: [
        { name: 'Creamy Tikka Masala Gravy', desc: 'Rich, mildly spiced tomato butter cream sauce', icon: '🥫', isVegetarian: true, isPopular: true },
        { name: 'Fiery Mirchi Ka Salan', desc: 'Hyderabadi nutty sesame-peanut chili sauce', icon: '🔥', isVegetarian: true, isPopular: true },
        { name: 'Mint & Cilantro Chutney', desc: 'Bright, herbaceous cool and tangy punch', icon: '🌿', isVegetarian: true },
        { name: 'Sweet & Tangy Tamarind Glaze', desc: 'Classic date-tamarind soothing sweetness', icon: '🍯', isVegetarian: true },
        { name: 'Cooling Cucumber Raita', desc: 'Whipped whole milk yogurt with cumin & herbs', icon: '🥣', isVegetarian: true },
        { name: 'Spicy Garlic Chili Mayo', desc: 'Creamy garlic sauce with spicy red chili', icon: '🌶️', isVegetarian: true }
      ]
    },
    {
      id: 'seasoning',
      stepNum: 7,
      title: 'Finishing',
      heading: 'THE FINAL TOUCH',
      subtitle: 'Choose up to 2 artisanal seasoning & crunch toppers',
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

  constructor(
    private fb: FormBuilder,
    private sheetsService: GoogleSheetsService
  ) {
    // Default select first base
    this.selectedBase = this.sections[0].items[0];
    this.bowlOrderId = this.sheetsService.generateOrderId('BWL');
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      deliveryType: ['pickup'],
      address: [''],
      specialInstructions: ['']
    });
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

  proceedToCheckout() {
    if (this.canSubmit()) {
      this.showCheckoutStep = true;
      setTimeout(() => {
        const checkoutEl = document.getElementById('checkout-step');
        if (checkoutEl) {
          checkoutEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }

  getIngredientsSummary(): string {
    const parts: string[] = [];
    if (this.selectedBase) parts.push(`Base: ${this.selectedBase.name}`);
    if (this.selectedProteins.length) parts.push(`Protein: ${this.selectedProteins.map(p => p.name).join(', ')}`);
    if (this.selectedAddOns.length) parts.push(`Add-ons: ${this.selectedAddOns.map(a => `${a.name} (+$${a.price})`).join(', ')}`);
    if (this.selectedCheese && this.selectedCheese.name !== 'No Cheese') parts.push(`Cheese: ${this.selectedCheese.name}`);
    if (this.selectedVeggies.length) parts.push(`Veggies: ${this.selectedVeggies.map(v => v.name).join(', ')}`);
    if (this.selectedSauces.length) parts.push(`Sauces: ${this.selectedSauces.map(s => s.name).join(', ')}`);
    if (this.selectedSeasoning.length) parts.push(`Finishing: ${this.selectedSeasoning.map(sn => sn.name).join(', ')}`);
    return parts.join(' | ');
  }

  async submitBowlOrder() {
    if (this.checkoutForm.valid && this.canSubmit()) {
      this.isSubmitting = true;
      const formVal = this.checkoutForm.value;
      const subtotal = this.calculateTotal();
      const total = formVal.deliveryType === 'delivery' ? subtotal + 5.00 : subtotal;
      const itemsSummary = `Custom NutriBowl: ${this.getIngredientsSummary()}`;

      const payload: OrderLogPayload = {
        orderId: this.bowlOrderId,
        orderType: 'Build Your Bowl',
        customerName: formVal.name,
        phone: formVal.phone,
        email: formVal.email,
        deliveryType: formVal.deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Store Pickup',
        address: formVal.deliveryType === 'delivery' ? (formVal.address || 'Delivery Address') : 'In-Store Pickup (3221 Wrightsboro Rd)',
        notes: formVal.specialInstructions || 'None',
        itemsSummary: itemsSummary,
        subtotal: parseFloat(subtotal.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        orderTimestamp: new Date().toLocaleString()
      };

      await this.sheetsService.logOrderToGoogleSheets(payload);

      this.isSubmitting = false;
      this.orderPlaced = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      Object.keys(this.checkoutForm.controls).forEach(k => this.checkoutForm.get(k)?.markAsTouched());
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
    this.orderPlaced = false;
    this.showCheckoutStep = false;
    this.bowlOrderId = this.sheetsService.generateOrderId('BWL');
    this.checkoutForm.reset({
      name: '',
      phone: '',
      email: '',
      deliveryType: 'pickup',
      address: '',
      specialInstructions: ''
    });
  }
}
