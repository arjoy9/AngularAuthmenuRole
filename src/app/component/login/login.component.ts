import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { usercre } from '../../_models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private builder:FormBuilder,
    private toast:ToastrService,
    private router: Router,
    private service:UserService
  ){}

  ngOnInit(): void {
    localStorage.clear();
    this.service._menulist.set([]);
  }

_response:any;

  _loginform=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  })

  proceedlogin(){

    if (this._loginform.valid) {
      let _obj:usercre={
        username:this._loginform.value.username as string,
        password:this._loginform.value.password as string

      }
      console.log(_obj);
      this.service.proceedlogin(_obj).subscribe(item=>{
        this._response=item;
        console.log(this._response);
        localStorage.setItem('token',this._response.token);
        localStorage.setItem('username',_obj.username);
        localStorage.setItem('userrole',this._response.userRole);
        this.service.Loadmenubyrole(this._response.userRole).subscribe(item=>{
          this.service._menulist.set(item);
        })
        this.router.navigateByUrl('/');
      },error=>{
        this.toast.error('Failed to login',error.error.title);
      });
    }
  }
}
