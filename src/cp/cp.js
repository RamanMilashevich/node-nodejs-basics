import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const spawnChildProcess = async (args) => {
  const scriptPath = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');
  
  // let's spawn the child process with the script
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });
  
  // forward stdin to child process
  process.stdin.pipe(child.stdin);
  
  // forward child process stdout to parent stdout
  child.stdout.pipe(process.stdout);
  
  // handle child process errors
  child.on('error', (error) => {
    console.error('Child process error:', error);
  });
  
  // handle child process exit
  child.on('exit', (code) => {
    process.exit(code);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
