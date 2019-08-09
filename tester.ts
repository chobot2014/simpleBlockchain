
import BlockChain from './BlockChain';

const testBlockChain = new BlockChain();

testBlockChain.addBlock("test content");

console.log(testBlockChain.getBlocks());