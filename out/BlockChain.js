"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Block_1 = require("./Block");
var BlockStorage_1 = require("./BlockStorage");
var BlockChain = /** @class */ (function () {
    function BlockChain(chainId) {
        if (typeof chainId !== 'undefined') {
            this._chainId = chainId;
        }
        else {
            this._chainId = (new Date()).toString();
            var genesisBlock = new Block_1["default"]("Genesis Block", 0);
            BlockStorage_1["default"].SaveBlock(this._chainId, genesisBlock);
        }
    }
    BlockChain.prototype.addBlock = function (blockContent) {
        return __awaiter(this, void 0, void 0, function () {
            var prevBlock, block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BlockStorage_1["default"].GetLastBlock(this._chainId)];
                    case 1:
                        prevBlock = _a.sent();
                        block = new Block_1["default"](blockContent, prevBlock.hash());
                        return [4 /*yield*/, BlockStorage_1["default"].SaveBlock(this._chainId, block)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockChain.prototype.getBlocks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BlockStorage_1["default"].GetAllBlocks(this._chainId)];
                    case 1: 
                    // change to get all blocks from the block storage class
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlockChain.prototype.getChainId = function () {
        return this._chainId;
    };
    BlockChain.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blocks, i, storedLastBlockHash, computedLastBlockHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBlocks()];
                    case 1:
                        blocks = _a.sent();
                        if (blocks.length > 1) {
                            for (i = 1; i < blocks.length; i++) {
                                storedLastBlockHash = blocks[i].prevHash;
                                computedLastBlockHash = blocks[i - 1].hash();
                                if (storedLastBlockHash !== computedLastBlockHash) {
                                    return [2 /*return*/, false];
                                }
                            }
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return BlockChain;
}());
exports["default"] = BlockChain;
