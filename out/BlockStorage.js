"use strict";
// abstract the block storage process
// eventually this will save each block to some proper database
// but as of right now, will save to a csv file
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
var BlockChainUtils_1 = require("./BlockChainUtils");
var CsvChainStorage = /** @class */ (function () {
    function CsvChainStorage(chainId) {
        this.fileName = "./" + chainId + ".csv";
    }
    CsvChainStorage.prototype.getChainBlocks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var csvData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BlockChainUtils_1.getCsvData(this.fileName)];
                    case 1:
                        csvData = _a.sent();
                        return [2 /*return*/, csvData.map(function (blockData) { return ({
                                id: blockData[0],
                                content: JSON.parse(blockData[1]),
                                prevHash: blockData[2]
                            }); })];
                }
            });
        });
    };
    CsvChainStorage.prototype.getLastChainBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastRow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BlockChainUtils_1.getLastRowInCsv(this.fileName)];
                    case 1:
                        lastRow = _a.sent();
                        return [2 /*return*/, {
                                id: lastRow[0],
                                content: JSON.parse(lastRow[1]),
                                prevHash: lastRow[2]
                            }];
                }
            });
        });
    };
    CsvChainStorage.prototype.saveBlock = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, BlockChainUtils_1.addRowToCsv(this.fileName, block.id + "," + JSON.stringify(block.content) + "," + block.prevHash)];
            });
        });
    };
    return CsvChainStorage;
}());
var BlockStorage = /** @class */ (function () {
    function BlockStorage() {
    }
    BlockStorage.GetAllBlocks = function (chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var csvChainStorage;
            return __generator(this, function (_a) {
                csvChainStorage = new CsvChainStorage(chainId);
                return [2 /*return*/, csvChainStorage.getChainBlocks()];
            });
        });
    };
    BlockStorage.GetBlock = function (chainId, blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var csvChainStorage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        csvChainStorage = new CsvChainStorage(chainId);
                        return [4 /*yield*/, csvChainStorage.getChainBlocks()];
                    case 1: return [2 /*return*/, (_a.sent())
                            .find(function (x) { return x.id === blockId; })];
                }
            });
        });
    };
    BlockStorage.SaveBlock = function (chainId, block) {
        return __awaiter(this, void 0, void 0, function () {
            var csvChainStorage;
            return __generator(this, function (_a) {
                csvChainStorage = new CsvChainStorage(chainId);
                return [2 /*return*/, csvChainStorage.saveBlock(block)];
            });
        });
    };
    BlockStorage.GetLastBlock = function (chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var csvChainStorage;
            return __generator(this, function (_a) {
                csvChainStorage = new CsvChainStorage(chainId);
                return [2 /*return*/, csvChainStorage.getLastChainBlock()];
            });
        });
    };
    return BlockStorage;
}());
exports["default"] = BlockStorage;
