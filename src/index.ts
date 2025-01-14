import { connect } from '@/database';
import { addRoutes } from '@/setup';
import { logger } from '@/utils';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config({
  path: `.env${
    process.env.NODE_ENV === 'development' ? '' : `.${process.env.NODE_ENV}`
  }`,
});

const app: Express = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

addRoutes(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }
  res.status(500).json({ message: `Something went wrong! ${err.message}` });
});

if (process.env.NODE_ENV !== 'test') {
  // Start the Express server
  const PORT: number = (process.env.PORT || 3300) as number;
  app.listen(PORT, '0.0.0.0', async () => {
    await connect();
    logger.info(`Server is running on port ${PORT}`);
  });
}
export { app };
