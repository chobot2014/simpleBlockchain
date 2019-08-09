"use strict";
exports.__esModule = true;
var BlockChain_1 = require("./BlockChain");
var testBlockChain = new BlockChain_1["default"]();
testBlockChain.addBlock("test content");
console.log(testBlockChain.getBlocks());
