import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import userRouter from "./user/user.route.js";
dotenv.config({ debug: false }); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_DEV_URI!],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,      
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// User routes
app.use('/user', userRouter);

// Connect to DB, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`this is ${process.env.NODE_ENV} environment`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
