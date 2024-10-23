import { URL } from './url';

export const fetchItems = async (params?: {
  categoryId?: number;
  offset?: number;
  quest?: string;
}) => {
  const URLParams = new URLSearchParams();
  if (params?.categoryId) URLParams.append('categoryId', params.categoryId.toString());
  if (params?.offset) URLParams.append('offset', params.offset.toString());
  if (params?.quest) URLParams.append('q', params.quest.toString());

  const response = await fetch(`${URL}/items?${URLParams}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const fetchItem = async (id: number) => {
  const response = await fetch(`${URL}/items/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
