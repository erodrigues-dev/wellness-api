import IUserService from './interfaces/IUserService'

import Employee from '../database/models/Employee'
import Profile from '../database/models/Profile'

import { compare } from '../utils/hash-password'
import ILoginResponse from './interfaces/ILoginResponse'

export class UserService implements IUserService {
  async login(email: string, password: string) {
    const user = await this.getUserWithProfileBy(email)
    if (!user) return null

    const match = await compare(password, user.password)
    if (!match) return null

    const payload = <ILoginResponse>{
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      profile: {}
    }

    if (user.profile) {
      const { id, name, functionalities: list } = user.profile
      const functionalities = list.map(item => ({
        name: item.name,
        actions: item.actions
      }))

      payload.profile = {
        id,
        name,
        functionalities
      }
    }

    return payload
  }

  private getUserWithProfileBy(email: string): Promise<Employee> {
    return Employee.findOne({
      where: { email },
      include: [
        {
          association: Employee.associations.profile,
          include: [Profile.associations.functionalities]
        }
      ]
    })
  }
}

export default new UserService()
