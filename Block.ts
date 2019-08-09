import {getHashFromString} from './BlockChainUtils';


export default class Block {
    static deSerializeBlock = (serializedBlock: string): Block => {
        // FINISH
        return new Block({}, "");
    }

    static serializeBlock = (block: Block): string => {
        // FINISH
        return '';
    }
    
    id: string;
    content: object;
    prevHash: string;
    constructor(content, prevHash) {
        this.content = content;
        this.prevHash = prevHash;
    }

    hash() {
        let blockContentJsonString = JSON.stringify(this.content);
        return getHashFromString(blockContentJsonString);
    }
}
