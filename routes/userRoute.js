import { Router } from 'express';
import userModel from '../models/index.js';
import { isStringEmpty } from '../helpers/index.js';
import { success } from '../helpers/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
	const { userName, email } = req.body;

	try {
		if (!isStringEmpty(userName) && !isStringEmpty(email)) {
			const user = await new userModel({
				userName: req.body.userName,
				email: req.body.email,
			});
			const userSaved = await user.save();
			return success(res, userSaved);
		}
	} catch (err) {
		next({ status: 400, message: 'failed to create account' });
	}
});

router.post('/loadUser', async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await findOne({ email: email });
		return success(res, user);
	} catch (error) {
		next({ status: 400, message: 'failed to log' });
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const user = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		return success(res, user);
	} catch (error) {
		next({ status: 400, message: 'failed to update your infos' });
	}
});

export { router };
