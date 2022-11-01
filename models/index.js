import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		uid: { type: String, required: true },
		userName: String,
		emailPro: String,
		firstName: String,
		lastName: String,
		city: String,
		phone: String,
		country: String,
	},
	{ versionKey: false }
);

const SubDocSchema = new mongoose.Schema(
	{
		value: String || Number,
		id: String,
	},
	{ versionKey: false }
);

const ExpertiseSchema = new mongoose.Schema(
	{
		expertiseKey: String || Number,
		name: String,
		skills: [SubDocSchema],
	},
	{ versionKey: false }
);

const EducationSchema = new mongoose.Schema(
	{
		academy: String,
		period: String,
		certificate: String,
	},
	{ versionKey: false }
);

const ExperienceSchema = new mongoose.Schema(
	{
		company: String,
		period: String,
		place: String,
		occupiedPosition: String,
		achievements: [SubDocSchema],
		stack: [SubDocSchema],
		description: String,
		project: String,
		exp_id: String,
	},
	{ versionKey: false }
);

const ResumeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		position: String,
		introduction: String,
		portfolio: String,
		socialMedias: String,
		expertises: [ExpertiseSchema],
		softSkills: [SubDocSchema],
		experiences: Array,
		createdtAt: Date,
		state: String,
		experiences: [ExperienceSchema],
		education: EducationSchema,
		profilPic: String,
		colorMain: String,
	},
	{ versionKey: false }
);

export const UserModel = mongoose.model('user', UserSchema);
export const ResumeModel = mongoose.model('resume', ResumeSchema);
