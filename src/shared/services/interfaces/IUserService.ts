import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants'
import ILoginResponse from './ILoginResponse'

export default interface IUserService {
  login(email: string, password: string): Promise<ILoginResponse>
}
