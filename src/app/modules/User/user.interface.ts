export type TUser ={
  name: string;
  email: string;
  image?:string;
  role: 'admin' | 'user';
  password: string;
  phone: string;
  address: string;
}


