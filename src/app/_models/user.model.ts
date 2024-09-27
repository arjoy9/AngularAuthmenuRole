export interface userregister {
  username:string;
  name:string;
  phone:string;
  email:string;
  password:string;
}

export interface registerconfirm {
  userid:number;
  username:string;
  otptext:string;

}

export interface usercre {
  username:string;
  password:string;
}

export interface loginresp {
  token:string;
  refreshToken:string;
  userrole:string;
}

export interface menu {
  code:string;
  name:string;
}

export interface resetpassword {
  username:string;
  oldpassword:string;
  newpassword:string;
}

export interface updatepasssword {
  username: string,
  password: string,
  otptext: string
}

export interface menupermission{
  code:string;
  name:string;
  haveview:boolean;
  haveadd:boolean;
  haveedit:boolean;
  havedelete:boolean;
}

export interface users{
  username: string,
  name: string,
  email: string,
  phone: string,
  isactive: boolean,
  statusname: string,
  role: string
}

export interface roles {
  code: string
  name: string
  status: boolean
}
export interface updateuser {
  username: string;
  role: string;
  status:boolean
}

export interface menus {
  code: string
  name: string
  status: boolean
}

