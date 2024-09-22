import express, { Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes/routes';
import { globalErrorHandle } from './app/middlewares/globalErrorHandle';
import { noRoutesFound } from './app/middlewares/noRoutesFound';

const app = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: 'https://mechanical-keyboard-shop-client-nine.vercel.app',
    credentials: true,
  }),
);

// app routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Mechanical Keyboard Shop server',
  });
});

// global error
app.use(globalErrorHandle);

// no route found error
app.use(noRoutesFound);

export default app;
