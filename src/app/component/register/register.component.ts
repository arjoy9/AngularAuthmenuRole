import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { registerconfirm, userregister } from '../../_models/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private builder:FormBuilder,
    private service:UserService,
    private toast:ToastrService,
    private route:Router){

  }

  _response:any;

  _regform = this.builder.group({
    username:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    password:this.builder.control('',Validators.required),
    confirmpassword:this.builder.control('',Validators.required),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    phone:this.builder.control('',Validators.required),
  })

  proceedregister(){
    if (this._regform.valid) {
      let _obj:userregister={
        username:this._regform.value.username as string,
        name:this._regform.value.name as string,
        phone:this._regform.value.phone as string,
        email:this._regform.value.email as string,
        password:this._regform.value.password as string
      }
    this.service.userregistration(_obj).subscribe(item=>{
      this._response=item;
      console.log(this._response);
      if (this._response.result=='pass') {
        let _confirmobj:registerconfirm={
          userid:this._response.message,
          username:_obj.username,
          otptext:''
        }
        this.service._registerresonse.set(_confirmobj);
        this.toast.success('Validate OTP & complete the registeration ','Registeration')
        this.route.navigateByUrl('/confirmotp')
      }
      else{
        this.toast.error('Failed due to :' + this._response.message,'Registeration Failed')
      }
    })

    }
  }

}
