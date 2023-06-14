import path from 'path';
import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRoute from './routes/userRoute.js';
import {
  errorHandler,
  notFound
} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

//@desc connect DB
connectDB();

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//@desc app route
app.use('/api/users', userRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//@desc error handler route
app.use(notFound);
app.use(errorHandler)

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});