export interface IUserRegister {
  displayName: string;
  username: string;
  password: string;
  cpf: string;
  telefone: string;
}

export interface IResponse {
  status?: number;
  success?: boolean;
  message?: string;
  data?: any; 
  error?: any; 
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  displayName: string;
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IProduct {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: string;          
    installmentInfo?: string; 
    specifications?: string[]; 
    gallery?: string[];     
    category: ICategory;
}

export interface ICategoryMenuItem {
  id: number;
  label: string;
  command?: () => void;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IAddress {
    id?: number;
    title?: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
    city: string;       
    estado?: string;
    cep: string;
    userId?: number;
}

export interface IOrderItem {
    id: number;
    product: IProduct;
    quantity: number;
    unit_price: number;
}

export interface IOrder {
    id: number;
    data: string;
    total: number;
    address: IAddress;
    items: IOrderItem[];
    freight?: number;         
    paymentMethod?: string;
}