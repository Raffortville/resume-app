export const success = (res, payload) => {
	return res.status(200).json(payload);
};
