import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ilogin } from 'src/app/interface/ILogin';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subLogin$: Subscription | undefined;
  error: boolean = false;
  msgError:string = "";
  
  constructor(
    formBuilder: FormBuilder,
    private router:Router,
    private loginService: LoginService
  ) {
    this.formLogin = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.formLogin.value.username = "";
  }

  Login() {
    const userLogin : Ilogin = {
      username : this.formLogin.value.username,
      password : this.formLogin.value.password
    };
    this.subLogin$ = this.loginService.signIn(userLogin).subscribe({
      next : res => {
        const token = res.accessToken;
        sessionStorage.setItem('token', token);
        this.router.navigate(['/home'])
      },
      error : () => {
        this.error = true;
        this.msgError = "Usuario y contraseña incorrecta";
      }
    });
  }

  ngOnDestroy(): void {
      if (this.subLogin$){
        this.subLogin$.unsubscribe();
      }
  }
}