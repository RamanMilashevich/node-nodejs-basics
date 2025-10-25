const parseEnv = () => {
  // let's find all environment variables that start with 'RSS_'
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  
  // now let's print them in the required format
  console.log(envVars);
};

parseEnv();
