import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjetoService } from 'src/app/services/objeto.service';
import { Objeto } from 'src/app/Models/objeto.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-objeto-form',
  templateUrl: './objeto-form.component.html',
  styleUrls: ['./objeto-form.component.css']
})
@Injectable()
export class ObjetoFormComponent {
  form: FormGroup;
  objeto?: Objeto;


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private objetoService: ObjetoService
  ){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      rareza: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      limiteBolsa: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
    })
  }
  OnSubmit(values: Objeto) {
    this.objetoService.addObjeto(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
