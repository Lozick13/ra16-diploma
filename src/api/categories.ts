import { URL } from './url';

export const fetchCategories = async () => {
	const response = await fetch(`${URL}/categories`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};
