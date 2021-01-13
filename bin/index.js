const { program } = require('commander');

const list = require('./list-subscription-plans');
const create = require('./create-subscription-plans');

program.version('0.0.1');

program
  .command('list')
  .description('list all subscriptions plans')
  .action(list);

program
  .command('create')
  .description('create weekly and monthly subscription plans')
  .action(create);

program.parse(process.argv);
