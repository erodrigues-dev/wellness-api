# TODO

## Square

- [x] create/update customer
- [x] create/update catalog recurrency items
- [ ] hooks
  - [ ] payment
  - [ ] subscription
  - [ ] invoice ?
  - [ ] order ?

- [ ] create payment and annotate hooks fireds
- [x] create subscription and annotate hooks fireds

# webhooks

## create subscription

| date                     | event                | status          |
|--------------------------|----------------------|-----------------|
| 2020-12-03T00:42:04Z     | invoice.created      | draft           |
| 2020-12-03T00:42:04.321Z | payment.created      | status approved |
| 2020-12-03T00:42:03.695Z | subscription.created | status active   |
| 2020-12-03T00:42:06Z     | invoice.payment_made | status PAID     |
|2020-12-03T00:42:05Z|invoice.published|PAYMENT_PENDING|
|2020-12-03T00:42:06.436Z|payment.updated|COMPLETED|
|2020-12-03T00:42:12.21Z|payment.updated|COMPLETED|

