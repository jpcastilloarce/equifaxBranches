import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IBranch } from '../interface/IBranch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  public getBranch(branch: IBranch){
    const params = new HttpParams().set('latitude', branch.latitude).set('longitude', branch.longitude);
    return this.http
            .get(environment.urlAPI + '/api/branch', { params });
  }
}
