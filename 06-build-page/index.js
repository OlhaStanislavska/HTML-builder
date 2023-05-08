const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
  return console.error('Error Found:', err);
  }
});

let template = '';
const indexStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
const bundleStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

readStream.on('data', chunk => template += chunk);
readStream.on('end', createIndexHTML);

function createIndexHTML() {
  fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
    files.forEach((file, index) => {
      const fileName = path.basename(file.name, path.extname(file.name));
      fs.readFile(path.join(__dirname, 'components', file.name), 'utf8', (err, data) => {
        if (err) {
          return console.error('Error Found:', err);
        }
        template = template.replace(`{{${fileName}}}`, data);
        if (index === files.length - 1) {
          indexStream.write(template);
        }
      });
    })
  });
}

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on('data', chunk => bundleStream.write(chunk));
    }
  })
});

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, dirs) => {
  dirs.forEach(dir => {
    if (dir.isDirectory()) {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name), { recursive: true }, (err) => {
        if (err) {
          return console.error('Error Found:', err);
        }
        fs.readdir(path.join(__dirname, 'assets', dir.name), {withFileTypes: true}, (err, files) => {
          files.forEach(file => {
            if (file.isFile()) {
              fs.copyFile(path.join(__dirname, 'assets', dir.name, file.name), path.join(__dirname, 'project-dist', 'assets', dir.name, file.name), (err) => {
                if (err) {
                  console.log('Error Found:', err);
                }
              });
            }
          })
        })
      });
    }
  })
});