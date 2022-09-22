import { collection, getDocs, getFirestore } from "firebase/firestore";

import Title from "components/misc/Title";
import Header from "components/shop/Header";
import ItemsGrid from "components/shop/ItemsGrid";
import Error from "components/misc/Error";

import db from "lib/initApp";

import { ShopItem } from "types";

type Props = {
	items: ShopItem[];
	success: boolean;
};

const Shop = ({ items, success }: Props) => {
	return (
		<>
			<Title text="Boutique" />
			<div className="flex-grow flex flex-col gap-8 lg:gap-16 py-8 lg:py-16 px-8 lg:px-48">
				<Header />
				{success ? (
					<ItemsGrid items={items} />
				) : (
					<Error message="Erreur lors du chargement de la boutique. Veuillez réessayer." />
				)}
			</div>
		</>
	);
};

export const getServerSideProps = async () => {
	try {
		const firestore = getFirestore(db);
		const itemsSnap = await getDocs(collection(firestore, "shop"));

		let items: ShopItem[] = [];

		itemsSnap.forEach(doc => {
			if (!doc.exists()) {
				return;
			}
			const data = doc.data();
			items.push({
				...(data as ShopItem),
				id: doc.id,
			});
		});

		return {
			props: {
				items,
				success: true,
			},
		};
	} catch (err) {
		return {
			props: {
				items: [],
				succes: false,
			},
		};
	}
};

export default Shop;
