export default interface ILoginResponse {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  type: string;
  profile: {
    id: number;
    name: string;
    functionalities: {
      name: string;
      actions: number;
    }[];
  };
}
