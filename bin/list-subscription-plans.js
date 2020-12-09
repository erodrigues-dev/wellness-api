const api = require('./squareApi');

const list = () => {
  api
    .post('/catalog/search', {
      object_types: ['SUBSCRIPTION_PLAN']
    })
    .then(({ data }) => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.log(err));
};

module.exports = list;
