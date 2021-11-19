const api = require('./squareApi');
const { v4: uuid } = require('uuid');

const plans = [
  {
    id: '#weekly',
    type: 'SUBSCRIPTION_PLAN',
    subscription_plan_data: {
      name: 'weekly plan',
      phases: [
        {
          cadence: 'WEEKLY',
          recurring_price_money: {
            currency: 'USD',
            amount: 0
          }
        }
      ]
    }
  },
  {
    id: '#monthly',
    type: 'SUBSCRIPTION_PLAN',
    subscription_plan_data: {
      name: 'monthly plan',
      phases: [
        {
          cadence: 'MONTHLY',
          recurring_price_money: {
            currency: 'USD',
            amount: 0
          }
        }
      ]
    }
  }
];

const create = () => {
  api
    .post('/catalog/batch-upsert', {
      idempotency_key: uuid(),
      batches: [{ objects: plans }]
    })
    .then(({ data }) => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.log(err));
};

module.exports = create;
