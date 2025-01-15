import fs from "fs";
import https from "https";

export function downloadFile(url, filename, cb) {
  const stream = fs.createWriteStream(filename);

  https.get(url, (res) => {
    res.pipe(stream);
    stream.on('finish', () => {
      stream.close();
      cb?.();
    });
  }).on('error', (err) => {
    stream.unlink(filename);
    cb?.(err.message);
  })
}

export function loadDataFromFile(filename, onSuccess, onError) {
  fs.readFile(filename, (error, data) => {
    if (error) {
      console.error(error);
      onError(error);
      return;
    }

    onSuccess(JSON.parse(data));
  })
}

