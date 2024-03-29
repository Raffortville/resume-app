const config = {
	FIREBASE: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBSE_AUTHDOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBSE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINIG_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID,
	},
	API: {
		url:
			process.env.NODE_ENV === 'development'
				? process.env.REACT_APP_LOCAL_API_URL
				: process.env.REACT_APP_API_URL,
	},
};

export default config;
