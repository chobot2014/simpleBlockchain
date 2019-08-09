"use strict";
exports.__esModule = true;
var BlockChainUtils_1 = require("./BlockChainUtils");
var Block = /** @class */ (function () {
    function Block(content, prevHash) {
        this.content = content;
        this.prevHash = prevHash;
    }
    Block.prototype.hash = function () {
        var blockContentJsonString = JSON.stringify(this.content);
        return BlockChainUtils_1.getHashFromString(blockContentJsonString);
    };
    Block.deSerializeBlock = function (serializedBlock) {
        // FINISH
        return new Block({}, "");
    };
    Block.serializeBlock = function (block) {
        // FINISH
        return '';
    };
    return Block;
}());
exports["default"] = Block;
