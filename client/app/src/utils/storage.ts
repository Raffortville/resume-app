import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { storageRef, ref } from '../services';

export const sendPicToStorage = async (
	imageFile: File,
	id: string
): Promise<string | undefined> => {
	const profilPicsRef = ref(storageRef, `images/profilPics/${id}`);
	const snapshot = await uploadBytes(profilPicsRef, imageFile);
	return await getDownloadURL(snapshot.ref);
};
