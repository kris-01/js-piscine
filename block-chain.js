// const hashCode = str =>
//   (
//     [...str].reduce((h, c) => (h = (h << 5) - h + c.charCodeAt(0)) & h, 0) >>> 0
//   ).toString(36)


class Block {
    constructor(index, hash, data, prev) {
        this.index = index;
        this.hash = hash;
        this.data = data;
        this.prev = prev;
        this.chain = blockChain;
    }
}

const Genesis = { index: 0, hash: '0' }


function blockChain(data, prev = this) {
    try {
        prev.index === undefined
    } catch (e) {
        prev = Genesis
    }
    // if (prev.index === undefined) {
    //     prev = Genesis
    // }
    var newBlock = new Block;
    newBlock.index = prev.index + 1;
    newBlock.data = data;
    newBlock.hash = hashCode(newBlock.index + prev.hash + JSON.stringify(newBlock.data));
    newBlock.prev = prev;
    return newBlock;
   
};


const first = blockChain({ a: 1 })
console.log(first.index) //           -> 1
console.log(first.data) //            -> { a: 1 }
console.log(first.prev) //            -> { index: 0, hash: "0" }
console.log(first.hash) //            -> '1103f27'
console.log(hashCode('10{"a":1}')) // -> '1103f27'

const second = first.chain({ hello: 'world' })
console.log(second)
console.log(second.hash) //                           -> '18drvvc'
console.log(hashCode('21103f27{"hello":"world"}')) // -> '18drvvc'

const chain = second
  .chain({ value: 4455 })
  .chain({ some: 'data' })
  .chain({ cool: 'stuff' })

const fork = second
  .chain({ value: 335 })
  .chain({ some: 'data' })
  .chain({ cool: 'stuff' })

console.log(chain.hash) //  -> '1qr3qfs'
console.log(fork.hash) //   -> '1x9gsc1'
console.log(chain.index) // -> 5
console.log(fork.index) //  -> 5