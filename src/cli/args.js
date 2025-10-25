const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = [];
  
  // let's process the command line arguments in pairs
  for (let i = 0; i < args.length; i += 2) {
    if (args[i] && args[i + 1]) {
      const propName = args[i].replace('--', '');
      const value = args[i + 1];
      parsedArgs.push(`${propName} is ${value}`);
    }
  }
  
  // now let's print them in the required format
  console.log(parsedArgs.join(', '));
};

parseArgs();
