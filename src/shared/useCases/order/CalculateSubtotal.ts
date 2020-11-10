import CustomError from '../../custom-error/CustomError';
import Activity from '../../database/models/Activity';
import CustomerDiscount from '../../database/models/CustomerDiscount';
import Package from '../../database/models/Package';
import { DiscountTypeEnum } from '../../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { OrderSubtotalViewModel } from '../../models/viewmodels/OrderSubtotalViewModel';

export class CalculateSubtotal {
  constructor(
    private customerId: number,
    private itemType: OrderItemTypeEnum,
    private itemId: number
  ) {}

  async calculate(): Promise<OrderSubtotalViewModel> {
    const subtotal = await this.getItemPrice();
    const discount = await this.calculateDiscount(subtotal);
    const total = subtotal - discount;

    return {
      subtotal,
      discount,
      total
    };
  }

  private async getItemPrice() {
    if (this.itemType === 'activity') {
      const activity = await Activity.findByPk(this.itemId);
      if (!activity) throw new CustomError('Activity not found', 400);
      return Number(activity.price);
    }

    if (this.itemType === 'package') {
      const packageModel = await Package.findByPk(this.itemId);
      if (!packageModel) throw new CustomError('Package not found', 400);
      return Number(packageModel.price);
    }

    return 0;
  }

  private async calculateDiscount(subtotal: number): Promise<number> {
    const discount = await this.getDiscount();

    if (!discount) return 0;

    if (discount.type === DiscountTypeEnum.Amount) return discount.value;

    if (discount.type === DiscountTypeEnum.Percent) {
      const percent = discount.value / 100;
      return percent * subtotal;
    }

    return 0;
  }

  private async getDiscount() {
    return CustomerDiscount.findOne({
      where: {
        customerId: this.customerId,
        relationType: this.itemType,
        relationId: this.itemId
      }
    });
  }
}
