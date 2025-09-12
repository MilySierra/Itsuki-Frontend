import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, cart , person, informationCircleOutline } from 'ionicons/icons';
import { CarritoService } from '../services/carrito-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, IonBadge, AsyncPipe],
})

export class MainLayoutComponent implements OnInit{

  cantidadProductos$!: Observable<number>;

  constructor(private carritoService: CarritoService) { 
    addIcons({ home, cart, person, informationCircleOutline });
  }

  ngOnInit(): void {
    this.cantidadProductos$ = this.carritoService.cantidadProductos$;
  }
}
