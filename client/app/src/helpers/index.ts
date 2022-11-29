export const checkIsValidInputFormat = (
	input: string,
	type: string
): boolean => {
	switch (type) {
		case 'email':
			const pattern = new RegExp(/.+@.+\..+/i);
			return Boolean(pattern.test(input));

		case 'password': {
			return Boolean(input.length < 7);
		}

		case 'text': {
			const letters = new RegExp(/^[a-zA-Z]*$/);
			return Boolean(input.match(letters));
		}

		case 'number': {
			const numbers = new RegExp(/^\d*(\.\d+)?$/);
			return Boolean(input.match(numbers));
		}

		default:
			return false;
	}
};

export const isStringEmpty = (input?: string): boolean => {
	return input === undefined || input === null || input === '';
};

export const isObjectEmpty = (obj: any): boolean => {
	return Object.keys(obj).length === 0;
};

export const removeEmptyOrNullKeyValueFromObject = (
	obj: any
): any | undefined => {
	const objectFilred = Object.fromEntries(
		Object.entries(obj).filter(
			([key, value]) => value !== '' || value != null || value !== undefined
		)
	);

	if (isObjectEmpty(objectFilred)) {
		return;
	}

	return objectFilred;
};
