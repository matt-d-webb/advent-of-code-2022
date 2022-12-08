import { createReadStream } from 'fs';
import { createInterface } from 'readline';

let input = createReadStream('./input.txt');
let currentBatch = 0;
let batchCount = 1;
let maxBatch = -Infinity;
let maxBatchIndex = 1;

const checkBatch = (num) => {
    const isEmpty = !num;
    const setMax = () => currentBatch > maxBatch ? (maxBatch = currentBatch) & (maxBatchIndex = batchCount) : null;
    const resetBatch = () => { currentBatch = 0; batchCount++; }
    const incrementBatch = () => currentBatch += Number(num);
    isEmpty ? setMax() & resetBatch() : incrementBatch();
}

createInterface({ input })
    .on('line', checkBatch)
    .on('close', () => console.log(`max ${maxBatch} batchIndex ${maxBatchIndex}`));