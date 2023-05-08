const path = require('path');
const fs = require('fs');

const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css') );

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on('data', chunk => bundle.write(chunk));
    }
  })
});