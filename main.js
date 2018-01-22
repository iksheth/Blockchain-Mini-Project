const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        //Will Be Added Autometically
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        //Returns Most Recent Block in chain
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        //Adds New Block in chain
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        //Function will take each block and will Re-Calculate it's Previous block's hash
        // and verifies is block valid or not by comparing  "previousHash" to new Recent Hash of Previous Block.


        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "20/12/2017", { amount: 4 }));
myCoin.addBlock(new Block(2, "20/12/2017", { amount: 8 }));

console.log(JSON.stringify(myCoin,null,4));

console.log('Blockchain valid? ' + myCoin.isChainValid());

console.log('Changing an alterd block...');
myCoin.chain[1].data = { amount: 100 };
// myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log("Blockchain valid? " + myCoin.isChainValid());

// console.log(JSON.stringify(myCoin, null, 4));