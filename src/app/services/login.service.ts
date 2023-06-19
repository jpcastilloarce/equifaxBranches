import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from 'src/app/interface/ILoginResponse';
import { Ilogin } from 'src/app/interface/ILogin';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public signIn(userLogin: Ilogin){
    return this.http
            .post<ILoginResponse>(environment.urlAPI + '/api/auth/signin', userLogin);
  }
}
