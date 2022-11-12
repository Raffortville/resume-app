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

const ProfileSchema = new mongoose.Schema({
	position: String,
	introduction: String,
	portfolio: String,
	sosocialMedias: String,
	expertises: [ExpertiseSchema],
	softSkills: [SubDocSchema],
	education: EducationSchema,
});

const DesignSchema = new mongoose.Schema({
	profilPic: String,
	colorMain: String,
});

const ResumeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		createdtAt: Date,
		state: String,
		profil: ProfileSchema,
		experiences: [ExperienceSchema],
		design: DesignSchema,
	},
	{ versionKey: false }
);

export const UserModel = mongoose.model('user', UserSchema);
export const ResumeModel = mongoose.model('resume', ResumeSchema);
