import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { resetpassword } from '../../_models/user.model';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  constructor(private builder:FormBuilder,private service:UserService,private toast:ToastrService,private router:Router){
  }

  _response:any;

  _resetform=this.builder.group({
    //username:this.builder.control('',Validators.required),
    oldpassword: this.builder.control('',Validators.required),
    newpassword:this.builder.control('',Validators.required)
  })

  proceedchange(){
    if (this._resetform.valid) {
      let obj: resetpassword ={
        //username:this._resetform.value.username as string,
        username: localStorage.getItem('username') as string,
        oldpassword:this._resetform.value.oldpassword as string,
        newpassword:this._resetform.value.newpassword as string
      }
      this.service.Resetpassword(obj).subscribe(item=>{
        this._response = item;
        if (this._response.result=='pass') {
          this.toast.success('please login with new password','Password change');
          this.router.navigateByUrl('/login');
        }
        else{
          this.toast.error('failed due to :' + this._response.message,'Retsetpassword Failed');
        }
      })
    }
  }

}
