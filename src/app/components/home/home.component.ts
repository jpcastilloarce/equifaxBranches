import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/interface/IBranch';
import { BranchService } from 'src/app/services/branch.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  formBranch: FormGroup;
  subBranch$: Subscription | undefined;
  error: boolean = false;
  successful: boolean = false;
  msgError:string = "";
  msgJson:string = "";

  constructor(
    private formBuilder: FormBuilder,
    private branchServices: BranchService
  ) {
    this.formBranch = formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    })
  }
  
  getBranch() {
    this.error = false;
    this.msgError = "";
    this.successful = false;
    this.msgJson = "";
    const reqBranch : IBranch = {
      latitude : this.formBranch.value.latitude,
      longitude : this.formBranch.value.longitude
    };
    this.subBranch$ = this.branchServices.getBranch(reqBranch).subscribe({
      next : res => {
        this.successful = true;
        this.msgJson = JSON.stringify(res);
      },
      error : () => {
        this.error = true;
        this.msgError = "No se encontró información";
      }
    });
  }

  ngOnDestroy(): void {
      if (this.subBranch$){
        this.subBranch$.unsubscribe();
      }
  }
}
