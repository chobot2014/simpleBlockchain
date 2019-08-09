import Block from './Block';

import BlockStorage from './BlockStorage';


export default class BlockChain {
    private _chainId: string;
    constructor(chainId?: string) {
        if (typeof chainId !== 'undefined') {
            this._chainId = chainId;
        } else {
            this._chainId = (new Date()).toString();
            const genesisBlock = new Block("Genesis Block", 0);
            BlockStorage.SaveBlock(this._chainId, genesisBlock);
        }
    }

    async addBlock(blockContent) {
        let prevBlock = await BlockStorage.GetLastBlock(this._chainId); 
        let block = new Block(blockContent, prevBlock.hash());
        await BlockStorage.SaveBlock(this._chainId, block);
    }

    async getBlocks() {
        // change to get all blocks from the block storage class
        return await BlockStorage.GetAllBlocks(this._chainId);
    }

    getChainId() {
        return this._chainId;
    }       

    async validate() {
        // this will be slow
        // should walk through, probably with a generator func
        const blocks = await this.getBlocks();
        if (blocks.length > 1) {
            for (let i = 1; i < blocks.length; i++) {
                let storedLastBlockHash = blocks[i].prevHash;
                let computedLastBlockHash = blocks[i - 1].hash();
                if (storedLastBlockHash !== computedLastBlockHash) {
                    return false;
                }
            }
        }
        return true;
    }
}