import { Component } from '@angular/core';
import { Objeto } from 'src/app/Models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.css']
})
export class ObjetoComponent implements OnInit, OnDestroy {
  objetos: Objeto[] = [];
  suscription?:Subscription;

  constructor(private objetoService: ObjetoService) { }
  ngOnInit(): void {
    this.getObjetos();
    this.suscription = this.objetoService.get_refresh$().subscribe(() => {
      this.getObjetos();
    }
    );
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getObjetos() {
    this.objetoService.getIObjeto().subscribe(data => this.objetos = data);
  }
}
