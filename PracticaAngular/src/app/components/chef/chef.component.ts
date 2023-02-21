import { Component } from '@angular/core';
import { Chef } from 'src/app/Models/chef.model';
import { ChefService } from 'src/app/services/chef.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit, OnDestroy {
  chefs: Chef[] = [];
  suscription?:Subscription;

  constructor(private chefService: ChefService) { }
  ngOnInit(): void {
    this.getChefs();
    this.suscription = this.chefService.get_refresh$().subscribe(() => {
      this.getChefs();
    }
    );
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getChefs() {
    this.chefService.getChefs().subscribe(data => this.chefs = data);
  }
}
