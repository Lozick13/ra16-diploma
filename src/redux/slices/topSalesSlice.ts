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
		fetchTopSalesItemsRequest: state => {
			state.loading = true;
			state.error = null;
		},
		fetchTopSalesItemsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		fetchTopSalesItemsSuccess: state => {
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	fetchTopSalesItemsRequest,
	fetchTopSalesItemsFailure,
	fetchTopSalesItemsSuccess,
	setTopSalesItems,
} = topSalesSlice.actions;

const topSalesReducer = topSalesSlice.reducer;
export default topSalesReducer;
