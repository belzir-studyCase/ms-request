import express from "express";
import requestRouter from './routes/request.route.js';
const app = express();
import connectToMongoDB from './database/connection.js';
import { swaggerUi, swaggerDocs } from './docsconfig/swaggerConfig.js';
connectToMongoDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use("/", requestRouter);

app.get('/test', (req, res) => {
  res.send('Welcome to the MS Request URL!');
});

app.listen(3002, () => {
  console.log(`Server is running at http://localhost:3002`);
});
export default app;
