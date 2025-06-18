// // types/user.ts

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: string;
}

 export interface UserResponse extends UserCreate {
  id: string;
  isConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Data {
  id: string;
  role: string;
  token: string;
}

export interface UserData {
  success: string;
  data: Data;
  // token: string;
  // user: UserResponse
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  is_active?: boolean;
}
