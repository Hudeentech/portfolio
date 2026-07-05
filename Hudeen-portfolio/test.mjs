import { client } from './src/client.js';

async function run() {
  try {
    const data = await client.fetch('*[_type == "experience"]');
    console.log("EXPERIENCE:", JSON.stringify(data, null, 2));

    const data2 = await client.fetch('*[_type == "aboutInfo"]');
    console.log("ABOUT:", JSON.stringify(data2, null, 2));
    
    const types = await client.fetch('array::unique(*._type)');
    console.log("TYPES:", JSON.stringify(types, null, 2));
  } catch(e) {
    console.error(e);
  }
}
run();
