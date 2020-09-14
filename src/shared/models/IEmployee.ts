import { IProfile } from './IProfile'

export interface IEmployee {
  id?: number
  name: string
  email: string
  password: string
  specialty: string
  imageUrl: string

  profile: IProfile

  createdAt: Date
  updatedAt: Date
}
