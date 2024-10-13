import { URL } from './url';

export const fetchTopSales = async () => {
	const response = await fetch(`${URL}/top-sales`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};
