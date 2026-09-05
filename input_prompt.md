# Prompt: Build a Multi-Page Angular Website for LeeSaa / Augusta Cloud Kitchen

## Overview

Create a professional, responsive, multi-page website using **Angular 17+**, **HTML5**, and **CSS3** for **LeeSaa Kitchen** (also known as **Augusta Cloud Kitchen**) — a cloud kitchen / catering business. Use the provided PDF files as the primary source of content:

- **`Augusta_Cloud_Kitchen_Catering_Menu.pdf.pdf`** — Contains the full catering menu with food items, descriptions, pricing, and categories.
- **`logo pdf.pdf`** — Contains the business logo. Extract and use this logo across the site (header, favicon, footer).

---

## Pages to Create

### 1. **Home Page** (`/`)
- Hero banner section with a high-impact heading (e.g., "Welcome to LeeSaa Kitchen — Authentic Flavors, Delivered to Your Door").
- Display the business logo prominently in the header/navbar.
- Brief "About Us" summary section describing the cloud kitchen concept.
- Featured menu highlights (3–5 popular dishes pulled from the catering menu PDF).
- Call-to-action buttons: "View Full Menu", "Order Now", "Contact Us".
- Testimonials / reviews section (placeholder content is fine).

### 2. **Menu Page** (`/menu`)
- Parse and display the **full catering menu** from `Augusta_Cloud_Kitchen_Catering_Menu.pdf.pdf`.
- Organize items by **category** (e.g., Appetizers, Entrées, Sides, Desserts, Beverages, Catering Packages — based on what the PDF contains).
- Each menu item should display: **name**, **description** (if available), and **price**.
- Add a **filter/search bar** to let users search or filter by category.
- Use a clean card-based or grid layout for menu items.

### 3. **Catering / Services Page** (`/catering`)
- Describe catering services offered (based on the catering menu PDF).
- List catering package options if present in the PDF (e.g., per-person pricing, minimum orders, event types).
- Include a "Request a Quote" or "Book Catering" call-to-action form with fields:
  - Name, Email, Phone, Event Date, Number of Guests, Special Requests.
- Display any delivery/pickup information from the PDF.

### 4. **About Us Page** (`/about`)
- Detailed story of the kitchen, the chef, and the mission.
- Emphasize the cloud kitchen model and its benefits (fresh food, no dine-in overhead, delivery-focused).
- Team section with placeholder photos and bios.
- Core values or philosophy section (e.g., fresh ingredients, authentic recipes, community focus).

### 5. **Contact Page** (`/contact`)
- Contact form: Name, Email, Phone, Message.
- Display business contact information (phone, email, address — use placeholders if not in PDF).
- Embedded Google Maps placeholder (or static map image).
- Business hours section.
- Links to social media (placeholder icons/links).

### 6. **Order Online Page** (`/order`) *(Optional/Stretch)*
- Simple online ordering interface.
- Users can browse the menu, add items to a cart, and submit an order.
- Cart sidebar/page showing selected items, quantities, and total.
- Checkout form with delivery details.
- *(Note: No backend required — this can be a front-end-only mock.)*

---

## Technical Requirements

### Angular
- Use **Angular 17+** with standalone components.
- Implement **Angular Router** for multi-page navigation with lazy loading.
- Use **Angular Reactive Forms** for all forms (contact, catering quote, ordering).
- Create **reusable components**: Navbar, Footer, Menu Card, Testimonial Card, Contact Form.
- Use **Angular services** to manage menu data (load from a JSON file derived from the PDF content).
- Add **route animations** for smooth page transitions.

### HTML & CSS
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Fully **responsive design** — mobile-first approach using CSS Flexbox and Grid.
- Use **CSS custom properties** (variables) for a consistent color scheme and typography.
- Smooth **hover effects** and **transitions** on buttons, cards, and links.
- Sticky/fixed navigation bar with active route highlighting.
- **No CSS frameworks** (e.g., Bootstrap) — write custom CSS to demonstrate skill. *(Or optionally use Angular Material if preferred — specify which.)*

### Suggested Color Palette (adjust based on logo)
- Primary: Deep warm color from logo (e.g., #D4451A / burnt orange or #2D5016 / forest green)
- Secondary: Complementary neutral (e.g., #F5F0EB / warm cream)
- Accent: Gold/amber (#C5962A)
- Text: Dark charcoal (#2C2C2C)
- Background: Off-white (#FAFAF8)

### Typography
- Headings: A modern serif or display font (e.g., "Playfair Display" from Google Fonts)
- Body: A clean sans-serif (e.g., "Open Sans" or "Lato" from Google Fonts)

---

## Project Structure

```
leesaa-kitchen/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── hero-banner/
│   │   │   ├── menu-card/
│   │   │   ├── testimonial-card/
│   │   │   └── contact-form/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── menu/
│   │   │   ├── catering/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── order/
│   │   ├── services/
│   │   │   └── menu.service.ts
│   │   ├── models/
│   │   │   └── menu-item.model.ts
│   │   ├── data/
│   │   │   └── menu-data.json       ← Menu content extracted from PDF
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.png             ← Logo extracted from PDF
│   │   └── fonts/
│   └── styles.css                    ← Global styles, variables, resets
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Content Extraction Instructions

1. **Menu Data**: Extract all menu items from `Augusta_Cloud_Kitchen_Catering_Menu.pdf.pdf` and structure them into a `menu-data.json` file with this format:
   ```json
   {
     "categories": [
       {
         "name": "Appetizers",
         "items": [
           {
             "name": "Samosa",
             "description": "Crispy pastry filled with spiced potatoes and peas",
             "price": 8.99,
             "image": "samosa.jpg",
             "tags": ["vegetarian", "popular"]
           }
         ]
       }
     ]
   }
   ```

2. **Logo**: Extract the logo from `logo pdf.pdf` and save it as `logo.png` (or SVG if possible) in the `assets/images/` directory.

---

## Additional Features

- **SEO**: Add proper `<title>` tags and meta descriptions for each page.
- **Accessibility**: Use ARIA labels, alt text for images, keyboard navigation support.
- **Performance**: Optimize images, use lazy loading for off-screen images.
- **404 Page**: Create a custom "Page Not Found" component.
- **Loading states**: Show skeleton loaders or spinners while content loads.
- **Scroll-to-top**: Auto-scroll to top on route change.

---

## Deliverables

1. A fully functional Angular project that can be run with `ng serve`.
2. All menu content populated from the PDF data.
3. Logo integrated from the provided PDF.
4. Clean, well-commented code with consistent formatting.
5. A `README.md` with setup instructions and project description.
