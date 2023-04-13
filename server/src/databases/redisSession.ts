import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Initialize client.
const redisClient = createClient({
	url: process.env.REDIS_URL,
});
redisClient
	.connect()
	.then(() => console.log('Redis Connected Successfully.'))
	.catch((err) => console.log('Redis Connection Failed: ', err));

const redisStore = new RedisStore({
	client: redisClient,
	prefix: 'sharpio:',
});
const secretKey = process.env.SESSION_SECRET || 'secret';

export default session({
	store: redisStore,
	saveUninitialized: false,
	secret: secretKey,
	resave: false,
	proxy: true,
	name: 'sharpioAuth',
	rolling: true,
	cookie: {
		// sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
		// sameSite: 'none',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 60 * 8, // 8 hours
		httpOnly: true,
	},
});
