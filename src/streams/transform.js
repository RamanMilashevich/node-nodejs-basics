import { Transform } from 'node:stream';

const transform = async () => {
  // let's create a transform stream that reverses text
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });
  
  // pipe stdin through our transform to stdout
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
