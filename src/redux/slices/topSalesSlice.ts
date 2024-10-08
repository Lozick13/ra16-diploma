import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/Item';

const initialState: {
	items: Item[];
	loading: boolean;
	error: string | null;
} = {
	items: [],
	loading: false,
	error: null,
};

const topSalesSlice = createSlice({
	name: 'topSales',
	initialState,
	reducers: {
		setTopSalesItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload;
		},
		fetchTopSalesRequest: state => {
			state.loading = true;
			state.error = null;
		},
		fetchTopSalesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		fetchTopSalesSuccess: state => {
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	fetchTopSalesRequest,
	fetchTopSalesFailure,
	fetchTopSalesSuccess,
	setTopSalesItems,
} = topSalesSlice.actions;

const topSalesReducer = topSalesSlice.reducer;
export default topSalesReducer;
