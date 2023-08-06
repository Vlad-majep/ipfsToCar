import { create } from 'ipfs-http-client';
import { Web3Storage } from 'web3.storage'


async function retrieve (cid) {
  const client = create({ url: "http://127.0.0.1:5001" });
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }
}

async function getFile(cid) {
  const chunks = [];
  for await (const chunk of ipfs.cat(cid)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

getFile('bafzbeicnvxhpjwpnt5ju3h5mtenp3y63rl272sib6ebauutmqe2ymax36e').then(content => {
  console.log('File content:', content.toString());
}).catch(error => {
  console.error('An error occurred:', error);
});

// Example of use
getFile11('bafzbeicnvxhpjwpnt5ju3h5mtenp3y63rl272sib6ebauutmqe2ymax36e').catch(console.error); // site
// convertHashToCar('bafybeibrkegmkwxp46rtz63gu25exeexhbzu42gye6wqm3w3i2ok4qalpi').catch(console.error); // pepa




//   // unpack File objects from the response
//   const files = await res.files()
//   for (const file of files) {
//     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
//   }
//   // request succeeded! do something with the response object here...
// }


// function makeStorageClient () {
//   return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY4MmU1QTc4NDAzNTllNTU2NUFDMTgyOWNhNEMwMTA0MjYyMENDQkUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkwMTMyODYyNTgsIm5hbWUiOiJ0ZXN0In0.OeWGKuWHSgGUOttrL4MqqdxSZZ3Z9pBM6tTX8O3oDlA" })
// }





// process.once('uncaughtException', (err, origin) => {
//   console.error(err);
// })

  
  // writer._mutex.then(r => {
  //   console.log('writer._mutex', r);
  // }).catch(e => {
  //   console.error('writer._mutex e', e);
  // });
  

  // await new Promise((resolve) => {
  //   asyncIteratorToStream(bytesIterable)
  //       .on('data', (chunk) => {
  //         console.log('data', chunk);
  //         writer.put({cid: cid, bytes: chunk});
  //       })
  //       .on('close', (chunk) => {
  //         console.log('close');
  //         resolve();
  //       });
  // });
    // process.on('uncaughtException', (err) => {
  //   console.error('There was an uncaught error', err);
  //   // process.exit(1) //mandatory (as per the Node docs)
  // });
  
  
  //
  // bytesIterable.pipe(writer);
  // // Read the stream of bytes and add blocks to CAR
  // // try {
  // //   for await (const chunk of bytesIterable) {
  // //     console.log('chunk', chunk);
  // //     await writer.put({ cid, bytes: chunk });
  // //   }
  // // } catch (err) {
  // //   console.error('Error while adding chunks to CAR:', err);
  // //   return;
  // // }
  //
  // // Finish writing
  // await writer.close();
  //
  // // Get CAR as Uint8Array
  // const carBytes = await out.toBytes();
  //
  // // Use carBytes as you like, for example, save as a file or send to a server
  // console.log('CAR file successfully created:', carBytes);