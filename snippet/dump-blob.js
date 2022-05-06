const fs = require('fs');

const filename = process.argv[2];

const file = fs.readFileSync(filename);
const fileA = Buffer.from(file).toString('base64');

console.log(`module.exports = '${fileA}';`);
