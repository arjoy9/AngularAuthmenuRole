import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { registerconfirm } from '../../_models/user.model';

@Component({
  selector: 'app-confirmotp',
  standalone: true,
  imports: [FormsModule,MaterialModule,RouterLink],
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css'
})
export class ConfirmotpComponent implements OnInit {

  otptext='';
  regrsponse !:registerconfirm;
  _response:any;
  constructor(private toast:ToastrService,private route:Router,
    private service:UserService){}

  ngOnInit(): void {
    this.regrsponse = this.service._registerresonse();
  }

  confirmOTP(){
    this.regrsponse.otptext=this.otptext;
    this.service.confirmregistration(this.regrsponse).subscribe(item=>{
      this._response=item;
      if (this._response.result=='pass') {
        this.toast.success('Registration completed successfully.','Success');
        this.service._registerresonse.set({
          userid: 0,
          username: '',
          otptext: ''
        })
        this.route.navigateByUrl('/login');
      }
      else{
        this.toast.error('Failed Due to ' + this._response.message,'Registration Failed');
      }
    })
  }
}
