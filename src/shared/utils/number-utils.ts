export function formatMoney(value: number) {
  const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd'
  });

  return intl.format(value);
}
