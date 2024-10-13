import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../api/types';

const initialState: {
	topSalesItems: Item[];
	topSalesLoading: boolean;
	topSalesError: string | null;
} = {
	topSalesItems: [],
	topSalesLoading: false,
	topSalesError: null,
};

const topSalesSlice = createSlice({
	name: 'topSales',
	initialState,
	reducers: {
		setTopSalesItems: (state, action: PayloadAction<Item[]>) => {
			state.topSalesItems = action.payload;
		},
		fetchTopSalesItemsRequest: state => {
			state.topSalesLoading = true;
			state.topSalesError = null;
		},
		fetchTopSalesItemsFailure: (state, action: PayloadAction<string>) => {
			state.topSalesLoading = false;
			state.topSalesError = action.payload;
		},
		fetchTopSalesItemsSuccess: state => {
			state.topSalesLoading = false;
			state.topSalesError = null;
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
