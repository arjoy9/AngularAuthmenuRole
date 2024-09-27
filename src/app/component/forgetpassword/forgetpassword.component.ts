import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [MaterialModule,FormsModule,RouterLink],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {
  constructor(private bulider:FormsModule,private service:UserService,
    private router:Router,private toast:ToastrService){}
  ngOnInit(): void {
  }

  username = ''
  _response:any;

  proceed(){
    this.service.Forgetpassword(this.username).subscribe(item=>{
      this._response=item;
      if (this._response.result=='pass') {
        this.toast.success('OTP sent to the registered email.', 'Forget Password');
        this.service._username.set(this.username);
        this.router.navigateByUrl('/updatepassword');
      }
      else{
        this.toast.error('Failed Due to:' + this._response.message, 'Failed');
      }
    })
  }
}
