import mongoose, { Schema } from 'mongoose';

const SubDocIdSchema = new mongoose.Schema(
	{
		id: String,
		value: String,
	},
	{ versionKey: false, _id: false }
);

const ObjectKeyItems = new mongoose.Schema(
	{
		title: String,
		key: String,
		items: [SubDocIdSchema],
	},
	{ versionKey: false, _id: false }
);

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
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

const EducationSchema = new mongoose.Schema(
	{
		academy: String,
		period: { start: String, end: String },
		certificate: String,
	},
	{ versionKey: false }
);

const ExperienceSchema = new mongoose.Schema(
	{
		exp_id: String,
		company: String,
		period: { start: String, end: String },
		place: String,
		occupiedPosition: String,
		achievements: ObjectKeyItems,
		stack: ObjectKeyItems,
		description: String,
		project: String,
	},
	{ versionKey: false }
);

const ProfileSchema = new mongoose.Schema(
	{
		position: String,
		introduction: String,
		portfolio: String,
		socialMedias: String,
		education: EducationSchema,
	},
	{ versionKey: false }
);

const DesignSchema = new mongoose.Schema(
	{
		profilPic: String,
		colorMain: { name: String, hex: String },
	},
	{ versionKey: false }
);

const ResumeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		title: String,
		createdtAt: Date,
		contact: { type: Schema.Types.ObjectId, ref: 'user' },
		profil: ProfileSchema,
		expertises: [ObjectKeyItems],
		experiences: [ExperienceSchema],
		design: DesignSchema,
	},
	{ versionKey: false }
);

export const UserModel = mongoose.model('user', UserSchema);
export const ResumeModel = mongoose.model('resume', ResumeSchema);
