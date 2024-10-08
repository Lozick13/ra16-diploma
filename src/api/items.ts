export const fetchItems = async () => {
	const response = await fetch('http://localhost:7070/api/items');
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};

export const fetchItemsByCategories = async (id: string) => {
	const params = new URLSearchParams({ categoryId: id });

	const response = await fetch(`http://localhost:7070/api/items?${params}`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};

export const fetchItemsWithOffset = async (offset: number = 6) => {
	const response = await fetch(`http://localhost:7070/api/items?offset=${offset}`);
	if (!response.ok) {
			throw new Error(response.statusText);
	}
	return await response.json();
};