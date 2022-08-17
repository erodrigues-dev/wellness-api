interface ListData {
  user_id: number;
  page: number;
  limit: number;
}

export class AppointmentsListUseCase {
  async list({ user_id, page = 1, limit = 10 }: ListData) {
    // const data = await Schedule.findAll({
    //   where: {
    //     customerId: user_id
    //   },
    //   include: [
    //     {
    //       association: 'orderActivity',
    //       attributes: ['id', 'name', 'duration'],
    //       include: [
    //         {
    //           association: 'activity',
    //           attributes: ['imageUrl']
    //         },
    //         {
    //           association: 'category',
    //           attributes: ['name']
    //         }
    //       ]
    //     }
    //   ],
    //   order: [['date', 'desc']],
    //   limit: limit + 1,
    //   offset: (page - 1) * limit
    // });
    const data = [];

    const rows = data.map(item => ({
      id: item.id,
      title: item.orderActivity.name,
      category: item.orderActivity.category.name,
      image_url: item.orderActivity.activity.imageUrl,
      duration: item.orderActivity.duration,
      date: item.date,
      start: item.start,
      end: item.end,
      status: item.status
    }));

    return {
      hasNextPage: rows.length > limit,
      rows: rows.slice(0, limit)
    };
  }
}
