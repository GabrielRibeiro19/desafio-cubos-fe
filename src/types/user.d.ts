
export interface IUser {
  id: string
  name: string
  email: string
  password: string
  created_at: string
  updated_at: string
}

export interface IResponseGetUser {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface ICreateUser {
  name: string
  email: string
  password: string
}
