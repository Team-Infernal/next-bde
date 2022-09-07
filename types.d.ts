import { DocumentReference } from "firebase/firestore";

type EventResponse = {
	name: string;
	organiser: string;
	yearMonth: string;
	location: string;
	timestamp: number;
};

type ShopItem = {
	id: string;
	name: string;
	description: string;
	sizes: ShopItemSizes;
	price: number;
	promo: number | null;
	category: string;
	images: string[];
};

type ShopItemSizes = {
	xs: boolean;
	s: boolean;
	m: boolean;
	l: boolean;
	xl: boolean;
	"2xl": boolean;
};

type CartItem = {
	id: string;
	ref: DocumentReference;
	quantity: number;
	size?: string;
};

type CartFinalItem = {
	id: string;
	quantity: number;
	size?: string;
	item: ShopItem;
};

type ShopAllItemSizes = ["xs", "s", "m", "l", "xl", "2xl"];

type Action = {
	type: string;
	payload?: any;
};
