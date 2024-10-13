export const fetchItems = async (params?: {
	categoryId?: number;
	offset?: number;
}) => {
	const URLParams = new URLSearchParams();
	if (params?.categoryId)
		URLParams.append('categoryId', params.categoryId.toString());
	if (params?.offset) URLParams.append('offset', params.offset.toString());

	const response = await fetch(`http://localhost:7070/api/items?${URLParams}`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};
