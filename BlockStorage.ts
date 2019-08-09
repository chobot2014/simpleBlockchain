import Block from './Block';
import { getCsvData, addRowToCsv, getLastRowInCsv } from './BlockChainUtils';

// interface to code off of
interface IChainStorage {
    getChainBlocks: () => Promise<Array<Block>>;
    getLastChainBlock: () => Promise<Block>;
    saveBlock: (block: Block) => Promise<boolean>
}


// implementation of ChainStorage using a csv file
class CsvChainStorage implements IChainStorage {
    fileName: string;
    constructor(chainId: string) {
        this.fileName = `./${chainId}.csv`;
    }

    async getChainBlocks(): Promise<Array<Block>> {
        const csvData = await getCsvData(this.fileName);
        return csvData.map(blockData => ({
            id: blockData[0],
            content: JSON.parse(blockData[1]),
            prevHash: blockData[2]
        } as Block));
    }

    async getLastChainBlock(): Promise<Block> {
        let lastRow = await getLastRowInCsv(this.fileName);
        return {
            id: lastRow[0],
            content: JSON.parse(lastRow[1]),
            prevHash: lastRow[2]
        } as Block;            
    }

    async saveBlock(block: Block): Promise<boolean> {
        return addRowToCsv(
            this.fileName,
            `${block.id},${JSON.stringify(block.content)},${block.prevHash}`
        );
    }
}

export default class BlockStorage {
    static async GetAllBlocks(chainId: string): Promise<Array<Block>> {
        let csvChainStorage = new CsvChainStorage(chainId);
        return csvChainStorage.getChainBlocks();
    }

    static async GetBlock(chainId: string, blockId: string): Promise<Block> {
        //TODO: replace this logic
        let csvChainStorage = new CsvChainStorage(chainId);
        return (await csvChainStorage.getChainBlocks())
            .find(x => x.id === blockId);
    }

    static async SaveBlock(chainId: string, block: Block): Promise<boolean> {
        let csvChainStorage = new CsvChainStorage(chainId);
        return csvChainStorage.saveBlock(block);
    }

    static async GetLastBlock(chainId: string) {
        let csvChainStorage = new CsvChainStorage(chainId);
        return csvChainStorage.getLastChainBlock();
    }
}