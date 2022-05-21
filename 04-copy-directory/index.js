const fs = require('fs');

const path = './04-copy-directory/files';

function copyDir(folderPath) {
    fs.rm('./04-copy-directory/files-copy', { recursive: true, force: true }, (err) => {
        fs.mkdir('./04-copy-directory/files-copy', (err) => {
            fs.readdir(folderPath, (err, files) => {
                files.forEach(file => {
                    const readStream = fs.createReadStream(`./04-copy-directory/files/${file}`);
                    const writeStream = fs.createWriteStream(`./04-copy-directory/files-copy/${file}`);
                    readStream.pipe(writeStream);
                })
            })
        })
    })
}

copyDir(path);

