import express, { Express } from 'express';
import session from './databases/redisSession';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/router';

const app: Express = express();

app.use(session);
app.use(helmet());
app.use(
	cors({
		credentials: true,
		origin:
			process.env.NODE_ENV === 'production'
				? process.env.FRONTEND_URL!
				: 'http://localhost:3000',
	})
);

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
