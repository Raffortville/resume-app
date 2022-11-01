import { Router } from 'express';
import { ResumeModel } from '../models/index.js';
import { success } from '../helpers/index.js';

const router = Router();

router.post('/', async (req, res, next) => {
	let paylod = { ...req.body, createdtAt: new Date().toISOString() };

	try {
		const resume = ResumeModel(paylod);
		const resumeSaved = await resume.save();

		return success(res, resumeSaved);
	} catch (error) {
		next({ status: 400, message: 'failed to create resume' });
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		await updateOne({ _id: req.params.id }, req.body);
		return success(res, {});
	} catch (error) {
		next({ status: 400, message: 'failed to save resume' });
		console.log(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const resumes = await find({ userId: req.params.id });
		return success(res, resumes);
	} catch (error) {
		next({ status: 400, message: 'failed to save resume' });
		console.log(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await deleteOne({ _id: req.params.id });
		return success(res, {});
	} catch (error) {
		next({ status: 400, message: 'failed to save resume' });
		console.log(error);
	}
});

export { router };
