import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../models/Category';

const initialState: {
	categories: Category[];
	CategoriesLoading: boolean;
	CategoriesError: string | null;
} = {
	categories: [],
	CategoriesLoading: false,
	CategoriesError: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		fetchCategoriesRequest: state => {
			state.CategoriesLoading = true;
			state.CategoriesError = null;
		},
		fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
			state.CategoriesLoading = false;
			state.CategoriesError = action.payload;
		},
		fetchCategoriesSuccess: state => {
			state.CategoriesLoading = false;
			state.CategoriesError = null;
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
