import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../models/Category';

const initialState: {
	categories: Category[];
	loading: boolean;
	error: string | null;
} = {
	categories: [],
	loading: false,
	error: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		fetchCategoriesRequest: state => {
			state.loading = true;
			state.error = null;
		},
		fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		fetchCategoriesSuccess: state => {
			state.loading = false;
			state.error = null;
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
