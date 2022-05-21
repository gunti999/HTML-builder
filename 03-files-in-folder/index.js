const fs = require('fs');
const path = require('node:path');

fs.readdir('./03-files-in-folder/secret-folder', { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
        if (file.isFile()) {
            fs.stat((`./03-files-in-folder/secret-folder/${file.name}`), (err, stats) => {
                let fileName = file.name.split('.');
                console.log(`${fileName[0]}-${path.extname(file.name).slice(1)}-${stats.size} байт`);
            })
        }
    })
})