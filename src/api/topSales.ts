export const fetchTopSales = async () => {
	const response = await fetch('http://localhost:7070/api/top-sales');
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}