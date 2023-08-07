import { create } from 'ipfs-http-client';
import fs from 'fs';
import path from "path";


const client = create({ url: "http://127.0.0.1:5001" });

async function getLinks(ipfsPath, localPath = '.') {
  for await (const link of client.ls(ipfsPath)) {
    console.log(link);
    const newPath = path.join(localPath, link.name);

    if (link.type === "file") {
      retrieve(link.path, newPath);
    } else {
      // Создание директории, если она еще не существует
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
      }
      getLinks(link.cid, newPath);
    }
  }
}

async function retrieve(cid, filePath) {
  const writeStream = fs.createWriteStream(filePath);

  for await (const buf of client.get(cid)) {
    writeStream.write(buf);
    console.log(buf);
  }

  writeStream.end();
  console.log('Файл успешно записан');
}

getLinks('bafybeiceaoai4afxqqtb7dyh6duwrcg5fkqqdu7xcmbwulvydlluae3xni');


//   // unpack File objects from the response
//   const files = await res.files()
//   for (const file of files) {
//     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
//   }
//   // request succeeded! do something with the response object here...
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