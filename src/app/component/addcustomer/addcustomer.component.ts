import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../_service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { customer } from '../../_models/customer.model';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [MaterialModule,RouterLink,ReactiveFormsModule],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {

  _response:any;
  title ='Add Customer';
  editcode='';
  isedit=false;
  editdata!: customer;

  constructor(private builder:FormBuilder,private service:CustomerService,
    private toastr:ToastrService,private router:Router,private act:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.editcode = this.act.snapshot.paramMap.get('code') as string;
    if (this.editcode !='' && this.editcode !=null) {
      this.isedit=true;
      this.title='Edit Customer';
      this.customerfrom.controls['code'].disable();

      this.service.GetbyCode(this.editcode).subscribe(item => {
        this.editdata = item;
        this.customerfrom.setValue({
          code: this.editdata.code,
          name: this.editdata.name,
          email: this.editdata.email,
          phone: this.editdata.phone,
          creditlimit: this.editdata.creditlimit,
          status: this.editdata.isActive
        })
      })
    }
  }

  customerfrom=this.builder.group({
    code:this.builder.control('',Validators.required),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    phone:this.builder.control('',Validators.required),
    creditlimit:this.builder.control(0,Validators.required),
    status:this.builder.control(true)
  })

  savecustomer(){
    if (this.customerfrom.valid) {
      let _obj: customer ={
        code:this.customerfrom.value.code as string,
        name: this.customerfrom.value.name as string,
        email: this.customerfrom.value.email as string,
        phone: this.customerfrom.value.phone as string,
        creditlimit: this.customerfrom.value.creditlimit as number,
        isActive:this.customerfrom.value.status as boolean,
        statusname:''
      }
      if (!this.isedit) {
        this.service.Createcustomer(_obj).subscribe(item=>{
          this._response=item;
          if (this._response.result==='pass') {
            this.toastr.success('Created successfully','Success');
            this.router.navigateByUrl('/customer');
          }
          else{
            this.toastr.error('Due to :' + this._response.massage,'Failed');
          }
        })
      }
      else{
        _obj.code = this.editcode;
        this.service.Updatecustomer(_obj).subscribe(item=>{
          this._response=item;
          if (this._response.result==='pass') {
            this.toastr.success('Updated successfully','Success');
            this.router.navigateByUrl('/customer');
          }
          else{
            this.toastr.error('Due to :' + this._response.massage,'Failed');
          }
        })
      }
    }
  }



}
