import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const performCalculations = async () => {
  const numCPUs = cpus().length;
  const workers = [];
  const results = [];
  
  // let's create one worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(join(dirname(fileURLToPath(import.meta.url)), 'worker.js'));
    workers.push(worker);
    
    // send incremental numbers starting from 10
    const data = 10 + i;
    
    worker.postMessage(data);
    
    // when we get a result, let's store it and terminate the worker
    worker.on('message', (result) => {
      results[i] = { status: 'resolved', data: result };
      worker.terminate();
    });
    
    // if there's an error, let's handle it
    worker.on('error', (error) => {
      results[i] = { status: 'error', data: null };
      worker.terminate();
    });
  }
  
  // wait for all workers to complete
  await Promise.all(workers.map(worker => new Promise(resolve => {
    worker.on('exit', resolve);
  })));
  
  console.log(results);
};

await performCalculations();
