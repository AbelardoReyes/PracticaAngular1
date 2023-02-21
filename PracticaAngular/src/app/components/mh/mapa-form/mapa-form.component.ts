import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapaService } from 'src/app/services/mapa.service';
import { Mapa } from 'src/app/Models/mapa.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mapa-form',
  templateUrl: './mapa-form.component.html',
  styleUrls: ['./mapa-form.component.css']
})
@Injectable()
export class MapaFormComponent {
  form: FormGroup;
  mapa?: Mapa;


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private mapaService: MapaService
  ){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      totalZonas: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
    })
  }
  OnSubmit(values: Mapa) {
    this.mapaService.addMapa(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
