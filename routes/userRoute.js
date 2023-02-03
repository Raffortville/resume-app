import { Router } from 'express';
import { UserModel } from '../models/index.js';
import { success } from '../helpers/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
	const { userName, email } = req.body;

	try {
		const user = new UserModel({ email, userName });
		const userSaved = await user.save();

		if (userSaved) {
			return success(res, userSaved);
		}
	} catch (error) {
		next(error);
	}
});

router.post('/getUser', async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		return success(res, user);
	} catch (error) {
		next(error);
	}
});

router.put('/update/:id', async (req, res, next) => {
	try {
		const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return success(res, user);
	} catch (error) {
		next(error);
	}
});

export { router };
