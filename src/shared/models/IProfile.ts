import { IEmployee } from './IEmployee'
import { IFunctionality } from './IFunctionality'

export interface IProfile {
  id?: number
  name: string
  description: string

  functionalities: IFunctionality[]
  employees: IEmployee[]

  createdAt: Date
  updatedAt: Date
}
