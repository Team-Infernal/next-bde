import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";

import Breadcrumbs from "components/shop/Breadcrumbs";
import Item from "components/shop/Item";

import db from "lib/initApp";

import { ShopItem } from "types";

type Props = {
	item: ShopItem;
};

const ItemPage = ({ item }: Props) => {
	return (
		<div className="flex-grow pb-8 px-48">
			<Breadcrumbs
				parentPageName={item.category}
				currentPageName={item.name}
			/>
			<Item item={item} />
		</div>
	);
};

export default ItemPage;

export const getStaticPaths: GetStaticPaths = async () => {
	const firestore = getFirestore(db);
	const querySnapshot = await getDocs(collection(firestore, "shop"));

	let items: any[] = [];
	querySnapshot.forEach(doc => {
		items.push({
			params: {
				item: doc.id,
			},
		});
	});

	return {
		paths: items,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const item = params?.item as string;

	const firestore = getFirestore(db);
	const querySnapshot = await getDoc(doc(firestore, "shop", item));

	if (!querySnapshot.exists()) {
		return {
			props: {},
		};
	}

	const data = querySnapshot.data();

	return {
		props: {
			item: {
				id: querySnapshot.id,
				...data,
			},
		},
	};
};
