import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { loginresp, menu, menupermission, menus, registerconfirm, resetpassword, roles, updatepasssword, updateuser, usercre, userregister, users } from '../_models/user.model';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //baseUrl = environment.apiUrl;
  baseUrl ='https://localhost:7143/api/';


  _registerresonse =signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })

  _username=signal('');

  _menulist = signal<menu[]>([]);

  userregistration(_data:userregister){
    return this.http.post(this.baseUrl +'User/userregisteration', _data );
    //return this.http.post('https://localhost:7143/api/User/userregisteration', _data );
  }

  confirmregistration(_data:registerconfirm){
    return this.http.post(this.baseUrl+ 'User/confirmregisteration', _data );
  }

  proceedlogin(_data:usercre){
    return this.http.post<loginresp>(this.baseUrl + 'Authorize/GenerateToken',_data)
  }

  Loadmenubyrole(role:string){
    return this.http.get<menu[]>(this.baseUrl + 'UserRole/GetAllMenusbyrole?userrole=' + role);
  }

  Resetpassword(_data:resetpassword){
    return this.http.post(this.baseUrl + 'User/resetpassword',_data);
  }

  Forgetpassword(username:string){
    return this.http.get(this.baseUrl + 'User/forgetpassword?username=' + username);
  }

  Updatepassword(_data:updatepasssword){
    return this.http.post(this.baseUrl+ 'User/updatepassword', _data);
  }

  Getmenupermission(role:string,menuname:string){
    return this.http.get<menupermission>(this.baseUrl + 'UserRole/GetMenupermissionbyrole?userrole='+role+'&menucode=' + menuname)
  }

  GetAllUsers(){
    return this.http.get<users[]>(this.baseUrl + 'User/GetAll');
  }

  GetUserbycode(code:string) {
    return this.http.get<users>(this.baseUrl + 'User/GetBycode?code='+code);
  }

  Getallroles() {
    return this.http.get<roles[]>(this.baseUrl + 'UserRole/GetAllRoles');
  }

  Updaterole(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updaterole', _data);
  }
  Updatestatus(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updatestatus', _data);
  }

  Getallmenus() {
    return this.http.get<menus[]>(this.baseUrl + 'UserRole/GetAllMenus');
  }

  Assignrolepermission(_data:menupermission[]){
    return this.http.post(this.baseUrl + 'UserRole/assignrolepermission', _data);
  }

}
