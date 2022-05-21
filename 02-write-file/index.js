const fs = require('fs');
const readline = require('readline');
const { stdin, stdout } = require('process');

const writeStream = fs.createWriteStream('./02-write-file/text.txt');
const rl = readline.createInterface({ input: stdin, output: stdout });
const prefOne = 'Не пиши сюда: ';
const prefTwo = 'Я же попросил: ';

rl.setPrompt(prefOne);
rl.prompt();

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
    } else {
        writeStream.write(input);
        rl.setPrompt(prefTwo);
        rl.prompt();
    }
}).on('close', () => {
    console.log('\nНу вот, сломал!');
})