import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const options = {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(process.env.DB_URI, options)
	.then(
		() => console.log('DB CONNECTED'),
		app.listen(PORT, () => console.log(PORT))
	)
	.catch((error) => console.log(error));
