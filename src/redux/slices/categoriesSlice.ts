import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../api/types';

const initialState: {
	categories: Category[];
	categoriesLoading: boolean;
	categoriesError: string | null;
} = {
	categories: [],
	categoriesLoading: false,
	categoriesError: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		fetchCategoriesRequest: state => {
			state.categoriesLoading = true;
			state.categoriesError = null;
		},
		fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
			state.categoriesLoading = false;
			state.categoriesError = action.payload;
		},
		fetchCategoriesSuccess: state => {
			state.categoriesLoading = false;
			state.categoriesError = null;
		},
	},
});

export const {
	fetchCategoriesRequest,
	fetchCategoriesFailure,
	fetchCategoriesSuccess,
	setCategories,
} = categoriesSlice.actions;

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
