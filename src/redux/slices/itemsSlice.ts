import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../api/types';

const initialState: {
	items: Item[];
	itemsLoading: boolean;
	itemsError: string | null;
	fetchItems: boolean;
} = {
	items: [],
	itemsLoading: false,
	itemsError: null,
	fetchItems: true,
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

		fetchItemsRequest: (
			state,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			_action: PayloadAction<
				{ categoryId?: number; offset?: number } | undefined
			>
		) => {
			state.itemsLoading = true;
			state.itemsError = null;
			state.fetchItems = true;
		},
		fetchItemsFailure: (state, action: PayloadAction<string>) => {
			state.itemsLoading = false;
			state.itemsError = action.payload;
		},
		fetchItemsSuccess: (state, action: PayloadAction<number | undefined>) => {
			state.itemsLoading = false;
			state.itemsError = null;

			if (Number(action.payload) < 6) state.fetchItems = false;
		},
	},
});

export const {
	fetchItemsRequest,
	fetchItemsFailure,
	fetchItemsSuccess,
	setItems,
	addItems,
} = itemsSlice.actions;

const itemsReducer = itemsSlice.reducer;
export default itemsReducer;
