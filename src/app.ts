import express from  "express";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.ts'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.use('/api/auth',authRoutes);


export default app;