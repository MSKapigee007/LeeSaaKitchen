import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'LeeSaa Kitchen - Authentic South Asian Cuisine'
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'Our Menu - LeeSaa Kitchen'
  },
  {
    path: 'build-your-bowl',
    loadComponent: () => import('./pages/build-bowl/build-bowl.component').then(m => m.BuildBowlComponent),
    title: 'Build Your Bowl - LeeSa\'s Grill In-Store Menu'
  },
  {
    path: 'catering',
    loadComponent: () => import('./pages/catering/catering.component').then(m => m.CateringComponent),
    title: 'Catering Services - LeeSaa Kitchen'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us - LeeSaa Kitchen'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us - LeeSaa Kitchen'
  },
  {
    path: 'order',
    loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent),
    title: 'Order Online - LeeSaa Kitchen'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 - Page Not Found'
  }
];
