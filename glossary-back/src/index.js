import express from "express";
import { downloadFile, loadDataFromFile } from "./utils.js";

const PORT = 8100;
const DATA_DIR = './data/'
const DEFAULT_DIR = 'default/';
const GLOSSARY_FILENAME = 'glossary.json';
const MIND_MAP_FILENAME = 'mindmap.json';

const state = {
  glossary: null,
  mindMap: null
}

// CORS middleware
const allowCrossDomain = (_, response, next) => {
  response.header(`Access-Control-Allow-Origin`, `*`);
  response.header(`Access-Control-Allow-Methods`, `GET,POST,PUT,DELETE,OPTIONS`);
  next();
};

const fromRawToGlossary = (data) => {
  return Object.keys(data).map((key) => ({ keyword: key, definition: data[key] }));
}

const patchFileEndpoint = (url, filename, response) => {
  if (!url) {
    response.writeHead(400);
    response.end('No url provided');
    return;
  }

  downloadFile(url, filename, (err) => {
    if (err) {
      response.writeHead(400);
      response.end(`Download error: ${err}`);
      return;
    } 
    
    loadDataFromFile(`${DATA_DIR}${GLOSSARY_FILENAME}`, 
      (data) => {
        state.glossary = data;
        response.writeHead(200);
        response.end();
      },
      (err) => {
        response.writeHead(400);
        response.end(`File reading error: ${err}`);
      }
    );
  });
};

const app = express();

app.use(allowCrossDomain);
app.use(express.json());

app.get("/mind-map", (_, response) => {
  if (state.mindMap) {
    response.writeHead(200);
    response.end(JSON.stringify(state.mindMap));
  } else {
    response.writeHead(400);
    response.end('Mind map is not ready');
  }
});

app.get("/glossary", (request, response) => {
  if (state.glossary === null) {
    response.writeHead(400);
    response.end('Glossary is not ready');
    return;
  }

  const term = request.query.term;

  if (!term) {
    response.writeHead(200);
    response.end(JSON.stringify(fromRawToGlossary(state.glossary)));

    return;
  }

  const description = state.glossary[term];

  if (description) {
    response.writeHead(200);
    response.end(description);
  } else {
    response.writeHead(404);
    response.end('Term has not been found');
  }
});

app.get("/ready", (_, response) => {
  if (state.glossary && state.mindMap) {
    response.writeHead(200);
    response.end('Service is ready');
  } else {
    response.writeHead(400);
    response.end('Service is not ready yet');
  }
});

app.put("/update-glossary", (request, response) => {
  console.log(request.body.glossaryUrl);
  const targetUrl = request.body.glossaryUrl;
  patchFileEndpoint(targetUrl, `${DATA_DIR}${GLOSSARY_FILENAME}`, response);
});

app.put("/update-mindmap", (request, response) => {
  console.log(request.body);
  const targetUrl = request.body.mindMapUrl;
  patchFileEndpoint(targetUrl, `${DATA_DIR}${MIND_MAP_FILENAME}`, response);
});

app.listen(PORT, () => {
  console.log('Listening on port = ', PORT);
  loadDataFromFile(`${DATA_DIR}${DEFAULT_DIR}${GLOSSARY_FILENAME}`, (data) => state.glossary = data, () => state.glossary = null);
  loadDataFromFile(`${DATA_DIR}${DEFAULT_DIR}${MIND_MAP_FILENAME}`, (data) => state.mindMap = data, () => state.mindMap = null);
});