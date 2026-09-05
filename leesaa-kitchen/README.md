# LeeSaa Kitchen (Augusta Cloud Kitchen) 🍽️

A modern, responsive multi-page web application built with **Angular 17+**, **HTML5**, and custom **CSS3** for LeeSaa Kitchen / Augusta Cloud Kitchen.

The application is built using the provided menu and branding assets from:
- `Augusta_Cloud_Kitchen_Catering_Menu.pdf.pdf`
- `logo pdf.pdf`

---

## 🚀 Features

- **6 Distinct Pages with Routing & Lazy Loading**:
  - **Home (`/`)**: Hero section, key metrics, about teaser, popular dishes grid, features, and customer reviews.
  - **Menu (`/menu`)**: Full catering & everyday menu with real-time text search, vegetarian filter toggle, and category navigation tabs.
  - **Catering (`/catering`)**: Catering packages, event capabilities, package cards, and interactive quote request form with validation.
  - **About Us (`/about`)**: Brand story, core values, culinary team introduction, and mission statement.
  - **Contact (`/contact`)**: Interactive contact inquiry form, operational hours, location card, and map placeholder.
  - **Order Online (`/order`)**: Interactive ordering workflow with item cart, quantity management, live price calculation, and delivery/pickup checkout form.
  - **404 Not Found (`/**`)**: Custom branded page for invalid routes.

- **Clean Architecture & Tech Highlights**:
  - **Angular 17 Standalone Components** (no legacy NgModules).
  - **Angular Reactive Forms** with field validation.
  - **Angular Router** with lazy loading chunks and dynamic page titles.
  - **Angular Services & Typed Models** with full TypeScript typing.
  - **Custom CSS Design System** using CSS variables, flexbox, CSS grid, and mobile-first responsiveness (no external heavy UI libraries required).

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
From the project root:
```bash
cd leesaa-kitchen
npm install
```

### Development Server
Run the local development server:
```bash
npx ng serve
```
Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

### Production Build
Compile the application for production:
```bash
npx ng build
```
The build artifacts will be generated in the `dist/leesaa-kitchen` directory.
