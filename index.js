import { create } from 'ipfs-http-client';
import { CarWriter } from '@ipld/car';
import { CID } from 'multiformats/cid';
import fs from 'fs';
import itToStream from "it-to-stream";

async function convertHashToCar(ipfsHash) {

  const ipfs = create({ url: "http://127.0.0.1:5001" });

  let cid;
  try {
    cid = CID.parse(ipfsHash);
    console.log(`CID successfully created: ${cid.toString()}`);
  } catch (err) {
    console.error('Error while creating CID:', err);
    return;
  }

  let { writer, out } = await CarWriter.create([cid]);

  const bytesIterable = ipfs.cat(cid);

  for await (const chunk of bytesIterable) {
    console.log(chunk);
    await writer.put({ cid, bytes: chunk });
  }

  await writer.close();

  const outStream = itToStream.readable(out);
  outStream.pipe(fs.createWriteStream('example.car'));
}

convertHashToCar('bafkreiftgqgcr6ivx5spmkbklxilkfie4bvs7ckapanvbb5cmj2ty44dei').catch(console.error);

process.once('uncaughtException', (err, origin) => {
  console.error(err);
})

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