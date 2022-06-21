const crypto = require('crypto');

const randomToken = () => crypto.randomBytes(8).toString('hex');
console.log(randomToken());

module.exports = randomToken;
