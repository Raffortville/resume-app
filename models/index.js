import mongoose from 'mongoose';

const SubDocSchema = new mongoose.Schema(
	{
		value: String || Number,
		key: String,
	},
	{ versionKey: false }
);

const SubDocIdSchema = new mongoose.Schema({
	id: String,
	value: String,
});

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

const ExpertiseSchema = new mongoose.Schema(
	{
		title: String,
		key: String,
		items: [SubDocIdSchema],
	},
	{ versionKey: false, _id: false }
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

const ProfileSchema = new mongoose.Schema({
	position: String,
	introduction: String,
	portfolio: String,
	sosocialMedias: String,
	education: EducationSchema,
});

const DesignSchema = new mongoose.Schema({
	profilPic: String,
	colorMain: String,
});

const ResumeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		title: String,
		status: String,
		createdtAt: Date,
		profil: ProfileSchema,
		expertises: [ExpertiseSchema],
		experiences: [ExperienceSchema],
		design: DesignSchema,
	},
	{ versionKey: false }
);

export const UserModel = mongoose.model('user', UserSchema);
export const ResumeModel = mongoose.model('resume', ResumeSchema);
