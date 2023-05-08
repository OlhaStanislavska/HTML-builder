const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, '/secret-folder', file.name), (err, stats) => {
        console.log(path.basename(file.name, path.extname(file.name)), 
        '-', 
        path.extname(file.name).slice(1), 
        '-',
        stats.size / 1024, 'kb');
      });
    }
  })
});