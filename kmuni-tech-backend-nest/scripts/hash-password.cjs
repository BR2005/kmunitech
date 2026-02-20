const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.cjs <password>');
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64);
process.stdout.write(`scrypt$${salt.toString('hex')}$${hash.toString('hex')}`);
