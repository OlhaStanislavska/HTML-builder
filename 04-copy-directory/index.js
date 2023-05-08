const path = require('path');
const fs = require('fs');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
    return console.error('Error Found:', err);
    }
  });
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) {
          console.log('Error Found:', err);
        }
      });
    })
  });
}

copyDir();