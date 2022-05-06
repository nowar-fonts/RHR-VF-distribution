const fs = require('fs');

const rhrFilename = process.argv[2];

const file = fs.readFileSync(rhrFilename);
const fileA = Buffer.from(file).toString('base64');

console.log(`module.exports = '${fileA}';`);
