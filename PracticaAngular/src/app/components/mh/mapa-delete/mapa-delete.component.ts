import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Mapa } from 'src/app/Models/mapa.model';
import { MapaService } from 'src/app/services/mapa.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mapa-delete',
  templateUrl: './mapa-delete.component.html',
  styleUrls: ['./mapa-delete.component.css']
})
export class MapaDeleteComponent {
  form: FormGroup;
  mapa2?: Mapa;
  mapa: Mapa = { id: 0, totalZonas:0, nombre: '', descripcion:''};
  id: number = 0;
  nombre: string = '';
  suscription?: Subscription;

  constructor(private route: ActivatedRoute, private mapaService: MapaService, private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group({
      id: [this.id, Validators.required],
      nombre: [this.nombre, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.nombre = this.route.snapshot.params['nombre'];
    this.getOneMapa(this.id);
    this.suscription = this.mapaService.get_refresh$().subscribe(() => {
      this.getOneMapa(this.id);
    });
  }

  getOneMapa(id: number) {
    this.mapaService.getOneMapa(id).subscribe((data: Mapa[]) => {
      this.mapa2 = data[0];
      this.form.patchValue({
        id: this.mapa2?.id,
        nombre: this.mapa2?.nombre,
      })
    });
  }
  OnSubmit(values: Mapa) {
    this.mapaService.deleteMapa(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
