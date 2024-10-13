
export interface Category {
	id: number;
	title: string;
}
export interface Item {
	id: number;
	category: number;
	title: string;
	price: number;
	images: string[];
}
