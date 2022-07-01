export interface IRegisterUser {
  login: string;
  password: string;
}

export interface IUserCreate {
  email: string;
  firstName: string;
  secondName: string;
  id: number;
}

export interface ICreateUser {
  email: string;
  firstName: string;
  secondName: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  role: any; //!
  isDeleted: boolean;
}
