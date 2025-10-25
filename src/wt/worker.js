import { parentPort } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // this function sends result of nthFibonacci computations to main thread
  parentPort.on('message', (data) => {
    const result = nthFibonacci(data);
    parentPort.postMessage(result);
  });
};

sendResult();
