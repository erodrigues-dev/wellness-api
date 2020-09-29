import ICategory from '../../models/ICategory';

export default interface ICategoryService {
  list(name: string, page: number, limit: number): Promise<ICategory[]>;
  count(name: string): Promise<number>;
  get(id: number): Promise<ICategory>;
  create(category: ICategory): Promise<ICategory>;
  update(category: ICategory): Promise<void>;
}
