import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/Item';

const initialState: {
	items: Item[];
	loading: boolean;
	error: string | null;
	offsetLoading: boolean;
	offsetError: string | null;
	fetchOffsetItems: boolean;
} = {
	items: [],
	loading: false,
	error: null,
	offsetLoading: false,
	offsetError: null,
	fetchOffsetItems: true,
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload;
		},
		addItems: (state, action: PayloadAction<Item[]>) => {
			state.items = [...state.items, ...action.payload];
		},

		fetchItemsRequest: state => {
			state.loading = true;
			state.error = null;
		},
		fetchItemsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		fetchItemsSuccess: state => {
			state.loading = false;
			state.error = null;
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchOffsetItemsRequest: (state, _action: PayloadAction<number>) => {
			state.offsetLoading = true;
			state.offsetError = null;
		},
		fetchOffsetItemsFailure: (state, action: PayloadAction<string>) => {
			state.offsetLoading = false;
			state.offsetError = action.payload;
		},
		fetchOffsetItemsSuccess: (state, action: PayloadAction<number>) => {
			state.offsetLoading = false;
			state.offsetError = null;

			if (action.payload < 6) state.fetchOffsetItems = false;
		},
	},
});

export const {
	fetchItemsRequest,
	fetchItemsFailure,
	fetchItemsSuccess,
	fetchOffsetItemsRequest,
	fetchOffsetItemsFailure,
	fetchOffsetItemsSuccess,
	setItems,
	addItems,
} = itemsSlice.actions;

const itemsReducer = itemsSlice.reducer;
export default itemsReducer;
