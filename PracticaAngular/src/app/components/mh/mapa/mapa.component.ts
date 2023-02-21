import { Component } from '@angular/core';
import { Mapa } from 'src/app/Models/mapa.model';
import { MapaService } from 'src/app/services/mapa.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
<<<<<<< HEAD

=======
>>>>>>> 0d8fb5258aed0a3d8f0ebcddeb8e4f4b29648497

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
<<<<<<< HEAD

export class MapaComponent implements OnInit, OnDestroy {
  mapas: Mapa[] = [];
  suscription?: Subscription;

=======
export class MapaComponent implements OnInit, OnDestroy {
  mapas: Mapa[] = [];
  suscription?:Subscription;

>>>>>>> 0d8fb5258aed0a3d8f0ebcddeb8e4f4b29648497
  constructor(private mapaService: MapaService) { }
  ngOnInit(): void {
    this.getMapas();
    this.suscription = this.mapaService.get_refresh$().subscribe(() => {
      this.getMapas();
    }
    );
  }
<<<<<<< HEAD
  ngOnDestroy(): void {
=======
  ngOnDestroy():void {
>>>>>>> 0d8fb5258aed0a3d8f0ebcddeb8e4f4b29648497
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getMapas() {
<<<<<<< HEAD
    this.mapaService.getIMapa().subscribe(data => this.mapas = data);
=======
    this.mapaService.getMapas().subscribe(data => this.mapas = data);
>>>>>>> 0d8fb5258aed0a3d8f0ebcddeb8e4f4b29648497
  }
}

