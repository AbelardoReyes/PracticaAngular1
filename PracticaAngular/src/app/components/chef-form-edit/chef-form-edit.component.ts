import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Chef } from 'src/app/Models/chef.model';
import { ChefService } from 'src/app/services/chef.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chef-form-edit',
  templateUrl: './chef-form-edit.component.html',
  styleUrls: ['./chef-form-edit.component.css']
})
export class ChefFormEditComponent implements OnInit{
  form: FormGroup;
  chef2?: Chef;

  chef: Chef = { id: 0, nombre: '', ap_paterno: '', ap_materno: '', nacionalidad: '', edad: 0 };
  suscription?:Subscription;
  id:number = 0;

  constructor(private route: ActivatedRoute,
    private chefService: ChefService,
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
    this.getOneChef(this.id);
    this.suscription = this.chefService.get_refresh$().subscribe(() => {
      this.getOneChef(this.id);
    }
    );
    console.log("ngOnInit");
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getOneChef(id : number){
    this.chefService.getOneChef(id).subscribe((data: Chef[]) => {
      this.chef2 = data[0];
      this.form.patchValue({
        id: this.chef2?.id,
        nombre: this.chef2?.nombre,
        ap_paterno: this.chef2?.ap_paterno,
        ap_materno: this.chef2?.ap_materno,
        nacionalidad: this.chef2?.nacionalidad,
        edad: this.chef2?.edad
      })
    });

  }
    OnSubmit(values: Chef) {
    this.chefService.updateChef(values).subscribe();
    this.form.reset();
  }
  goBack(){

  }
}
