import { create } from 'ipfs-http-client';
import { CarWriter } from '@ipld/car';
import { MemoryBlockstore } from 'blockstore-core/memory';
import { CID } from 'multiformats/cid';

async function convertHashToCar(ipfsHash) {
  // Create an instance of IPFS client
  const ipfs = create();

  // Convert ipfsHash to CID instance
  let cid;
  try {
    cid = CID.parse(ipfsHash);
    console.log(`CID successfully created: ${cid.toString()}`);
    console.log(`CID Object: `, cid);
  } catch (err) {
    console.error('Error while creating CID:', err);
    return;
  }

  // Create a Writer for CAR
  let writer, out;
  try {
    ({ writer, out } = await CarWriter.create({
      blockstore: new MemoryBlockstore(),
      roots: cid,
    }));
  } catch (err) {
    console.error('Error while creating CAR writer:', err);
    return;
  }

  // Get the stream of bytes by IPFS hash
  const bytesStream = ipfs.cat(ipfsHash);

  // Read the stream of bytes and add blocks to CAR
  try {
    for await (const chunk of bytesStream) {
      await writer.put({ cid, bytes: chunk });
    }
  } catch (err) {
    console.error('Error while adding chunks to CAR:', err);
    return;
  }

  // Finish writing
  await writer.close();

  // Get CAR as Uint8Array
  const carBytes = await out.toBytes();

  // Use carBytes as you like, for example, save as a file or send to a server
  console.log('CAR file successfully created:', carBytes);
}

// Example of use
convertHashToCar('bafzbeicnvxhpjwpnt5ju3h5mtenp3y63rl272sib6ebauutmqe2ymax36e').catch(console.error);
