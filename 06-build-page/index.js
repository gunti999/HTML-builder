const fs = require('fs');
const path = require('node:path');

const projectDist = `${__dirname}/project-dist`;

function folderCopy(folderName) {
    fs.rm(`${projectDist}/${folderName}`, { recursive: true, force: true }, (err) => {
        fs.mkdir(`${projectDist}/${folderName}`, { recursive: true }, (err) => {
            fs.readdir(`${__dirname}/${folderName}`, (err, files) => {
                files.forEach((file) => {
                    fs.stat(`${__dirname}/${folderName}/${file}`, (err, stat) => {
                        if (stat.isDirectory()) {
                            folderCopy(`${folderName}/${file}`);
                        } else {
                            const rs = fs.createReadStream(`${__dirname}/${folderName}/${file}`);
                            const ws = fs.createWriteStream(`${projectDist}/${folderName}/${file}`);
                            rs.pipe(ws);
                        }
                    })
                })
            })
        })
    })
}

function cssBundler(folderName) {
    const ws = fs.createWriteStream(`${projectDist}/style.css`);
    fs.readdir(`${__dirname}/${folderName}`, (err, files) => {
        files.forEach(css => {
            if (path.extname(css) === '.css') {
                const rs = fs.createReadStream(`${__dirname}/${folderName}/${css}`);
                rs.on('data', (chunk) => {
                    ws.write(chunk);
                    ws.write('\n');
                })
            }
        })
    })
}

function htmlBundler() {
    const rs = fs.createReadStream(`${__dirname}/template.html`);
    const regExp = /{{(\w*)}}/gi;
    let content = '';
    rs.on('data', (chunk) => {
        content += chunk.toString();
        let find = chunk.toString().match(regExp);
        find.forEach(el => {
            let name = el.slice(2, -2);
            const read = fs.createReadStream(`${__dirname}/components/${name}.html`);
            read.on('data', (html) => {
                content = content.replace(el, html.toString());
                fs.writeFile(`${projectDist}/index.html`, content, (err) => {})
            })
        })
    })
}


    fs.mkdir(projectDist, (err) => {
        htmlBundler();
        folderCopy('assets');
        cssBundler('styles');
    })
