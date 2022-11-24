import { Router } from 'express';
import { ResumeModel } from '../models/index.js';
import { success } from '../helpers/index.js';

const router = Router();

router.post('/create', async (req, res, next) => {
	const payload = {
		...req.body,
		createdtAt: new Date().toISOString(),
		status: 'draft',
	};

	try {
		const resume = new ResumeModel(payload);
		const resumeSaved = await resume.save();

		return success(res, resumeSaved);
	} catch (error) {
		next({ status: 400, message: 'failed to create resume' });
	}
});

router.put('/update/:id', async (req, res, next) => {
	try {
		const resume = await ResumeModel.updateOne(
			{ _id: req.params.id },
			req.body
		);
		return success(res, resume);
	} catch (error) {
		next({ status: 400, message: 'failed to update resume' });
		console.log(error);
	}
});

router.get('/getAll/:userId', async (req, res, next) => {
	try {
		const resumes = await ResumeModel.find({ userId: req.params.userId });
		return success(res, resumes);
	} catch (error) {
		next({ status: 400, message: 'failed to get resume' });
		console.log(error);
	}
});

router.get('/getById/:id', async (req, res, next) => {
	try {
		const resume = await ResumeModel.findById(req.params.id);
		return success(res, resume);
	} catch (error) {
		next({ status: 400, message: 'failed to get resume' });
		console.log(error);
	}
});

router.delete('/delete/:id', async (req, res, next) => {
	try {
		await ResumeModel.deleteOne({ _id: req.params.id });
		return success(res, { message: 'resume deleted' });
	} catch (error) {
		next({ status: 400, message: 'failed to delete resume' });
		console.log(error);
	}
});

export { router };
