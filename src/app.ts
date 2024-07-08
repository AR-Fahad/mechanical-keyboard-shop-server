import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// parser
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Mechanical Keyboard Shop server',
  });
});

export default app;
