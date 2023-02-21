import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario?: Usuario;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private db: FormBuilder,
    private loginService: LoginService,
    private location: Location,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  OnSubmit(values: Usuario) {
    this.loginService.login(values).subscribe();
    this.form.reset();
    this.router.navigate(['/chef']);
  }
}
