import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customer } from '../_models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  baseUrl ='https://localhost:7143/api/';


  GetAll(){
    return this.http.get<customer[]>(this.baseUrl + 'Customer/GetAll');
  }

  GetbyCode(code:string){
    return this.http.get<customer>(this.baseUrl + 'Customer/Getbycode?code='+ code);
  }

  Createcustomer(_data:customer){
    return this.http.post(this.baseUrl + 'Customer/create',_data);
  }

Updatecustomer(_data:customer){
    return this.http.put(this.baseUrl + 'Customer/Update?code=' + _data.code,_data);
}

  Deletecustomer(code:string){
    return this.http.delete(this.baseUrl + 'Customer/Remove?code=' + code);
  }
}
