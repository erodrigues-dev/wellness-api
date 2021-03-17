import discountService from '../../../shared/services/CustomerDiscountService';

type GetData = {
  user_id: number;
  relation_type: string;
  relation_id: number;
};

export class GetDiscountUseCase {
  async get(data: GetData) {
    const discount = await discountService.find(data.user_id, data.relation_type, data.relation_id);

    return {
      type: discount?.type,
      value: Number(discount?.value) || 0
    };
  }
}
