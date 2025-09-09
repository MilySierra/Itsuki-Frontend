import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'product-list',
        loadComponent: () =>
          import('./product-list/product-list.page').then((m) => m.ProductListPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'information',
        loadComponent: () =>
          import('./information/information.page').then((m) => m.InformationPage),
      },
      {
        path: 'shopping-cart',
        loadComponent: () =>
          import('./shopping-cart/shopping-cart.page').then((m) => m.ShoppingCartPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./productos/productos.page').then((m) => m.ProductosPage),
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./carrito/carrito.page').then((m) => m.CarritoPage),
  },
  {
    path: '**',
    redirectTo: 'home', // opcional: para manejar rutas no definidas
  },
];
