import { Routes } from '@angular/router';

export const routes: Routes = [
 {path: 'login', loadComponent: () => import('./login/login.page').then(m =>m.LoginPage)      },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'productos',
    loadComponent: () => import('./productos/productos.page').then( m => m.ProductosPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then( m => m.CarritoPage)
  }
];
