export const fetchCategories = async () => {
	const response = await fetch('http://localhost:7070/api/categories');
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};
