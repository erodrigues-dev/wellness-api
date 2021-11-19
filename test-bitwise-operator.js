const bitwise = require('bitwise-operator');

bitwise.unsafe = true;

function generateBits(bits) {
  let permissions = 1;
  for (let bit = 1; bit <= bits; bit++) {
    permissions += 2 ** bit;
  }
  return permissions;
}

function shouldValidateUntil52Bits() {
  console.log(`>> Should validate until 52 bits`);

  const bits = generateBits(52);
  const check = 2 ** 4;
  const result = bitwise.and(check, bits);
  const success = check === result;

  console.log(`- ${success ? 'OK' : 'FAIL'}`);
}

function shouldFailValidateGreaterThan52Bits() {
  console.log(`>> Should FAIL validate greater than 52 bits`);

  const bits = generateBits(53);
  const check = 2 ** 2;
  const result = bitwise.and(check, bits);
  const success = check !== result;
  console.log(`- ${success ? 'OK' : 'FAIL'}`);
}

console.log('# Bitwise testes:');
shouldValidateUntil52Bits();
shouldFailValidateGreaterThan52Bits();
