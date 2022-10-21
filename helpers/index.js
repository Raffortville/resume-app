export const success = (res, payload) => {
	return res.status(200).json(payload);
};

export const isStringEmpty = (input) => {
	if (input === undefined || input === null || input === '') return true;
	else return false;
};
