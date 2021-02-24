import CustomError from '../../../shared/custom-error/CustomError';
import Activity from '../../../shared/database/models/Activity';
import Package from '../../../shared/database/models/Package';
import {
    ProductDetailViewModel, ProductInfoActivity, ProductInfoPackage, ProductType
} from './models';

export class ProductDetailUseCase {
  async load(id: number, type: ProductType): Promise<ProductDetailViewModel> {
    if (type === 'activity') return this.loadActivity(id);

    return this.loadPackage(id);
  }

  async loadActivity(
    id: number
  ): Promise<ProductDetailViewModel<ProductInfoActivity>> {
    const model = await Activity.findByPk(id, {
      include: {
        association: 'category',
        attributes: ['name']
      }
    });

    if (!model) throw new CustomError('product not found', 404);

    return {
      id: model.id,
      title: model.name,
      description: model.description,
      image_url: model.imageUrl,
      type: 'activity',
      info: {
        category: model.category.name,
        duration: model.duration,
        max_peoples: model.maxPeople,
        price: Number(model.price)
      }
    };
  }

  async loadPackage(
    id: number
  ): Promise<ProductDetailViewModel<ProductInfoPackage>> {
    const model = await Package.findByPk(id, {
      include: [
        { association: 'category', attributes: ['name'] },
        { association: 'activities', include: ['category'] }
      ]
    });

    return {
      id: model.id,
      description: model.description,
      image_url: model.imageUrl,
      title: model.name,
      type: 'package',
      info: {
        price: Number(model.price),
        category: model.category.name,
        recurrency: model.recurrencyPay,
        type: model.type,
        total: Number(model.total) || null,
        expiration: model.expiration,
        items: model.activities.map(item => ({
          id: item.id,
          image_url: item.imageUrl,
          price: Number(item.price),
          title: item.name,
          category: item.category.name,
          type: 'activity',
          quantity: item.PackageActivity?.quantity
        }))
      }
    };
  }
}
