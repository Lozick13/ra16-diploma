import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/Item';

const initialState: {
	items: Item[];
	itemsLoading: boolean;
	itemsError: string | null;
	offsetItemsLoading: boolean;
	offsetItemsError: string | null;
	fetchOffsetItems: boolean;
} = {
	items: [],
	itemsLoading: false,
	itemsError: null,
	offsetItemsLoading: false,
	offsetItemsError: null,
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
			state.itemsLoading = true;
			state.itemsError = null;
		},
		fetchItemsFailure: (state, action: PayloadAction<string>) => {
			state.itemsLoading = false;
			state.itemsError = action.payload;
		},
		fetchItemsSuccess: state => {
			state.itemsLoading = false;
			state.itemsError = null;
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchOffsetItemsRequest: (state, _action: PayloadAction<number>) => {
			state.offsetItemsLoading = true;
			state.offsetItemsError = null;
		},
		fetchOffsetItemsFailure: (state, action: PayloadAction<string>) => {
			state.offsetItemsLoading = false;
			state.offsetItemsError = action.payload;
		},
		fetchOffsetItemsSuccess: (state, action: PayloadAction<number>) => {
			state.offsetItemsLoading = false;
			state.offsetItemsError = null;

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
