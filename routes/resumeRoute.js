import { Router } from 'express';
import { ResumeModel, UserModel } from '../models/index.js';
import { success } from '../helpers/index.js';

const router = Router();

router.post('/create', async (req, res, next) => {
	try {
		const user = await UserModel.findOne({ _id: req.body.userId });
		if (!user) {
			next({ status: 400, message: 'failed to create resume' });
			return;
		}

		const resume = new ResumeModel({
			...req.body,
			createdtAt: new Date().toISOString(),
			contact: user._id,
		});

		const resumeSaved = await resume.save();
		return success(res, resumeSaved);
	} catch (error) {
		next({ status: 400, message: 'failed to create resume' });
	}
});

router.put('/update/:id', async (req, res, next) => {
	try {
		const resume = await ResumeModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		return success(res, resume);
	} catch (error) {
		next({ status: 400, message: 'failed to update resume' });
		console.log(error);
	}
});

router.get('/getAll/:userId', async (req, res, next) => {
	try {
		const resumes = await ResumeModel.find()
			.where('userId')
			.equals(req.params.userId)
			.populate('contact');
		return success(res, resumes);
	} catch (error) {
		next({ status: 400, message: 'failed to get resume' });
		console.log(error);
	}
});

router.get('/getById/:id', async (req, res, next) => {
	try {
		const resume = await ResumeModel.findById(req.params.id).populate(
			'contact'
		);
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
