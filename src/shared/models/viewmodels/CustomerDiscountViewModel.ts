export default class CustomerDiscountViewModel {
  id: number;
  relationId: number;
  relationName: string;
  relationType: string;
  relationPrice: number;
  type: string;
  value: number;
  customerId: number;
  customerName: string;
  userId: number;
  userName: string;
  createdAt: Date;
  updatedAt: Date;

  static from(obj: any): CustomerDiscountViewModel {
    const view = new CustomerDiscountViewModel();

    view.id = obj.id;
    view.relationId = obj.relation_id;
    view.relationName = obj.relation_name;
    view.relationType = obj.relation_type;
    view.relationPrice = Number(obj.relation_price);
    view.type = obj.type;
    view.value = Number(obj.value);
    view.customerId = obj.customer_id;
    view.customerName = obj.customer_name;
    view.userId = obj.user_id;
    view.userName = obj.user_name;
    view.createdAt = obj.created_at;
    view.updatedAt = obj.updated_at;

    return view;
  }
}
