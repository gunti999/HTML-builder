const fs = require('fs');
const path = require('node:path');

const ws = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

fs.readdir('./05-merge-styles/styles', (err, files) => {
    files.forEach(css => {
        if (path.extname(css) === '.css') {
            const rs = fs.createReadStream(`./05-merge-styles/styles/${css}`);
            rs.pipe(ws);
        }
    })
})