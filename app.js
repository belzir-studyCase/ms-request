import express from "express";
import requestRouter from './routes/request.route.js';
import bodyParser from 'body-parser';
const app = express();
import connectToMongoDB from './database/connection.js';
connectToMongoDB();
app.use(express.json());
// Set default route for '/'

app.use("/", requestRouter);

app.get('/test', (req, res) => {
  res.send('Welcome to the MS Request URL!');
});

app.listen(3002, () => {
  console.log(`Server is running at http://localhost:3002`);
});

// Export the app instance
export default app;
