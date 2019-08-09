"use strict";
exports.__esModule = true;
var fs = require('fs');
var readline = require('readline');
function getHashFromString(s) {
    return s
        .split('')
        .reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}
exports.getHashFromString = getHashFromString;
function getCsvData(fileName) {
    return new Promise(function (resolve) {
        var lineReader = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        });
        var csvData = new Array();
        lineReader.on('line', function (line) { return csvData
            .push(line.split(',')); });
        lineReader.on('close', function () { return resolve(csvData); });
    });
}
exports.getCsvData = getCsvData;
function getLastRowInCsv(fileName) {
    return new Promise(function (resolve) {
        var lineReader = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        });
        var currentLine;
        lineReader.on('line', function (line) { return currentLine = line; });
        lineReader.on('close', function () { return resolve(currentLine.split(',')); });
    });
}
exports.getLastRowInCsv = getLastRowInCsv;
function addRowToCsv(fileName, line) {
    //TODO: make sure that I don't need to put a carriage / line return
    // at the end of the file lolz
    return new Promise(function (resolve) { return fs
        .appendFile(fileName, line, function (error) {
        return resolve(!error);
    }); });
}
exports.addRowToCsv = addRowToCsv;
