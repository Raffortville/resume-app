import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import config from '../../config';

const firebaseConfig = {
	apiKey: config.FIREBASE.apiKey,
	authDomain: config.FIREBASE.authDomain,
	projectId: config.FIREBASE.projectId,
	storageBucket: config.FIREBASE.storageBucket,
	messagingSenderId: config.FIREBASE.messagingSenderId,
	appId: config.FIREBASE.appId,
};

const firebaseApp = initializeApp(firebaseConfig);

const fireBaseAuth = getAuth(firebaseApp);
const firebaseStorageRef = getStorage(firebaseApp);
const storageRef = ref(firebaseStorageRef, 'images');

export { fireBaseAuth, storageRef, ref };
