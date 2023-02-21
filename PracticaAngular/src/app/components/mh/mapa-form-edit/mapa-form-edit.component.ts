import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Mapa } from 'src/app/Models/mapa.model';
import { MapaService } from 'src/app/services/mapa.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mapa-form-edit',
  templateUrl: './mapa-form-edit.component.html',
  styleUrls: ['./mapa-form-edit.component.css']
})
export class MapaFormEditComponent implements OnInit{
  form: FormGroup;
  mapa2?: Mapa;

  suscription?:Subscription;
  id:number = 0;
  constructor(private route: ActivatedRoute,
    private mapaService: MapaService,
    location: Location,
    private fb: FormBuilder){
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      edad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneMapa(this.id);
    this.suscription = this.mapaService.get_refresh$().subscribe(() => {
      this.getOneMapa(this.id);
    }
    );
    console.log("ngOnInit");
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getOneMapa(id : number){
    this.mapaService.getOneMapa(id).subscribe((data: Mapa[]) => {
      this.mapa2 = data[0];
      this.form.patchValue({
        id: this.mapa2?.id,
        nombre: this.mapa2?.nombre,

      })
    });

  }
    OnSubmit(values: Mapa) {
    this.mapaService.updateMapa(values).subscribe();
    this.form.reset();
  }
  goBack(){

  }
}
