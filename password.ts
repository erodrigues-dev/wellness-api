import { hash, compare } from './src/shared/utils/hash-password'

const [, , command, arg1, arg2] = process.argv

if (command === 'create' && arg1) {
  hash(arg1).then(hash => {
    console.log(`
      >>> create:\n
      > pwd: ${arg1}
      > hash: ${hash}
    `)
  })
} else if (command === 'compare' && arg1 && arg2) {
  compare(arg1, arg2).then(match => {
    console.log(`
      >>> compare:\n
      > pwd: ${arg1}
      > hash: ${arg2}
      > match: ${match}
    `)
  })
} else {
  console.log(`
    >>>HELP<<<

    Commands:

    -> create:\t\thash password
    ex.: $ node password create 123

    -> compare:\t\tcompare password
    ex.: $ node password compare 12345678 '$2b$08$wTb/piIOc/Ntc96Pm6LoTeDtQgF9p3nPGle8LuvQUQw/lZURAj0oy'

    Tips: Use single quotes "'" in the password and hash
  `)
}
