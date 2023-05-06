const path = require('path');
const fs = require('fs');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt') );

stdout.write(`Enter some text\n`);
stdin.on('data', data => {
  if (data.toString().includes('exit')) {
    output.end();
    exit();
  }
  output.write(data);
});

process.on('SIGINT', exit); 
process.on('exit', () => stdout.write('\nBye!'));

