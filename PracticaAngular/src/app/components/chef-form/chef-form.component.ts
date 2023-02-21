import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChefService } from 'src/app/services/chef.service';
import { Chef } from 'src/app/Models/chef.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-chef-form',
  templateUrl: './chef-form.component.html',
  styleUrls: ['./chef-form.component.css']
})
@Injectable()
export class ChefFormComponent {
  form: FormGroup;
  chef?: Chef;


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private chefService: ChefService
  ){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      edad: ['', Validators.required]
    })
  }
  OnSubmit(values: Chef) {
    this.chefService.addChefs(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
