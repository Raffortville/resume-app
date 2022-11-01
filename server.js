import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { router as resumeRoute } from './routes/resumeRoute.js';
import { router as userRoute } from './routes/userRoute.js';
import config from './config/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/user', userRoute);
app.use('/resume', resumeRoute);

app.use((err, res) => {
	return res.status(err.status || 400).json({
		status: err.status || 400,
		message: err.message || 'there was an error processing request',
	});
});
