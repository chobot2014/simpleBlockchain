const fs = require('fs');
const readline = require('readline');

export function getHashFromString(s) {
    return s
        .split('')
        .reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
}

export function getCsvData(fileName: string): Promise<Array<Array<string>>> {
    return new Promise((resolve) => {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        });
        const csvData = new Array<Array<string>>();
        lineReader.on('line', line => csvData
            .push(line.split(',')));

        lineReader.on('close', () => resolve(csvData));
    });
}

export function getLastRowInCsv(fileName: string): Promise<Array<string>> {
    return new Promise(resolve => {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        });
        let currentLine: string;
        lineReader.on('line', line => currentLine = line);
        lineReader.on('close', () => resolve(currentLine.split(',')));
    });
}



export function addRowToCsv(fileName: string, line: string): Promise<boolean> {
    //TODO: make sure that I don't need to put a carriage / line return
    // at the end of the file lolz
    return new Promise<boolean>(resolve => fs
        .appendFile(fileName, line, (error) =>
            resolve(!error)));
}