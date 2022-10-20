import * as dotenv from 'dotenv';

dotenv.config();

export default {
	PORT: process.env.PORT || 3001,
	DB_URI: process.env.DB_URI,
	FB: {
		apiKey: process.env.FBapiKey,
		authDomain: process.env.FBauthDomain,
		projectId: process.env.FBprojectId,
		storageBucket: process.env.FBstorageBucket,
		messagingSenderId: process.env.FBmessagingSenderId,
		appId: process.env.FBappId,
	},
};
