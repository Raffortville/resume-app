import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { router as resumeRoute } from './routes/resumeRoute.js';
import { router as userRoute } from './routes/userRoute.js';
import config from './config/index.js';

const app = express();

app.options('*', cors());
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Expose-Headers', '*');
	next();
});
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

if (process.env.NODE_ENV === 'production') {
	//*Set static folder up in production
	app.use(express.static('client/app/build'));
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, './client/app/build/index.html'))
	);
}
