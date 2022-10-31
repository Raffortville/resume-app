export const checkIsValidInputFormat = (
	input: string,
	type: string
): boolean => {
	switch (type) {
		case 'email':
			const pattern = new RegExp(/.+@.+\..+/i);
			return Boolean(!pattern.test(input));

		case 'password': {
			return Boolean(input.length < 7);
		}

		case 'text': {
			const letters = /^[A-Za-z]+$/;
			return Boolean(!input.match(letters));
		}

		case 'number': {
			const numbers = /^[0-9]+$/;
			return Boolean(!input.match(numbers));
		}

		default:
			return false;
	}
};

export const isStringEmpty = (input?: string): boolean => {
	return input === undefined || input === null || input === '';
};
