import IProfile from './IProfile';

export default interface IEmployee {
  id?: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  imageUrl?: string;

  profileId: number;
  profile?: IProfile;

  createdAt?: Date;
  updatedAt?: Date;
}
