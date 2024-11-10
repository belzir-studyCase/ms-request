import express from "express";
import requestRouter from './routes/request.route.js';
const app = express();
import connectToMongoDB from './database/connection.js';
import cors from 'cors';

import { swaggerUi, swaggerDocs } from './docsconfig/swaggerConfig.js';


import https from 'https';
import fs from 'fs';
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
connectToMongoDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use("/", requestRouter);
app.use(cors());
app.get('/test', (req, res) => {
  res.send('Welcome to the MS Request URL!');
});

https.createServer(options, app).listen(3002, () => {
  console.log('HTTPS server running on https://localhost:3002');
});

export default app;
