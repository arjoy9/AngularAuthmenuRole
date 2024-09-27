import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { updatepasssword } from '../../_models/user.model';

@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent implements OnInit {

  constructor(private builder:FormBuilder,
    private service:UserService,
    private toast:ToastrService,
    private route:Router){}

  _currentusername='';
  ngOnInit(): void {
    this._currentusername=this.service._username();
  }

  _response:any;

  _updateform = this.builder.group({
    password:this.builder.control('',Validators.required),
    otptext:this.builder.control('',Validators.required),

  })

  proceedchange(){
    if (this._updateform.valid) {
      let _obj:updatepasssword={
        username:this._currentusername,
        password:this._updateform.value.password as string,
        otptext:this._updateform.value.otptext as string
      }
      this.service.Updatepassword(_obj).subscribe(item=>{
        this._response=item;
        if (this._response.result=='pass') {
          this.toast.success('Please login with new password', 'Password changed');
          this.route.navigateByUrl('/login')
        }else{
          this.toast.error('Failed due to : ' + this._response.message, 'Resetpassword Failed')
        }
      })
    }
  }
}
