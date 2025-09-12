import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then( m => m.CheckoutPage)
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
    path: '**',
    redirectTo: 'login',
  },
  

];
