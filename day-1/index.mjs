import { createReadStream } from 'fs';
import { createInterface } from 'readline';

let input = createReadStream('./input.txt');

let currentBatch = 0;
let batchCount = 1;
let maxBatch = -Infinity;
let maxBatchIndex = 1;
let topBatches = [];

const checkBatch = (num) => {
    const isEmpty = !num;
    const setMax = () => currentBatch > maxBatch ? (maxBatch = currentBatch) & (maxBatchIndex = batchCount) : null;
    const setTopBatches = top => topBatches = [...topBatches, currentBatch].sort((a, b) => b - a).slice(0, top);
    const resetBatch = () => { currentBatch = 0; batchCount++; };
    const addToBatch = () => currentBatch += Number(num);
    isEmpty ? setMax() & setTopBatches(3) & resetBatch() : addToBatch();
}

createInterface({ input })
    .on('line', checkBatch)
    .on('close', () => {
        console.log(`step 1: max ${maxBatch} batchIndex ${maxBatchIndex}`);
        console.log(`step 2: top 3 ${topBatches} total ${topBatches.reduce((p, a) => p += a, 0)}`);
    });