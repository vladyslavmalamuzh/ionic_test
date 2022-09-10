export interface ICardCategoryModel{
	id: string;
	name: string;
}
export interface ICardModel{
	sku: number;
	name: string;
	type: string;
	price: number;
	upc: string;
	category: ICardCategoryModel[];
	shipping: number;
	description: string;
	manufacturer: string;
	model: string;
	url: string;
	image: string;
}
