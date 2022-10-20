import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as resumeRoute } from './routes/resumeRoute.js';
import config from './config/index.js';

const app = express();

app.use(cors());
app.use(express.json());

const options = {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(config.DB_URI, options)
	.then(
		() => console.log('DB CONNECTED'),
		app.listen(config.PORT, () => console.log(config.PORT))
	)
	.catch((error) => console.log(error));

app.use('/resume', resumeRoute);
