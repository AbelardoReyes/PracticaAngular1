import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Objeto } from 'src/app/Models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-objeto-delete',
  templateUrl: './objeto-delete.component.html',
  styleUrls: ['./objeto-delete.component.css']
})
export class ObjetoDeleteComponent {
  form: FormGroup;
  objeto2?: Objeto;
  objeto: Objeto = { id: 0, rareza:0, limiteBolsa: 0, valor: 0, nombre:'',descripcion:''};
  id: number = 0;
  nombre: string = '';
  suscription?: Subscription;

  constructor(private route: ActivatedRoute, private objetoService: ObjetoService, private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group({
      id: [this.id, Validators.required],
      nombre: [this.nombre, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.nombre = this.route.snapshot.params['nombre'];
    this.getOneObjeto(this.id);
    this.suscription = this.objetoService.get_refresh$().subscribe(() => {
      this.getOneObjeto(this.id);
    });
  }

  getOneObjeto(id: number) {
    this.objetoService.getOneObjeto(id).subscribe((data: Objeto[]) => {
      this.objeto2 = data[0];
      this.form.patchValue({
        id: this.objeto2?.id,
        nombre: this.objeto2?.nombre,
      })
    });
  }
  OnSubmit(values: Objeto) {
    this.objetoService.deleteObjeto(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
