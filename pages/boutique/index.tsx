import Head from "next/head";

import Header from "components/shop/Header";
import ItemsGrid from "components/shop/ItemsGrid";

import { app } from "config";

const Shop = () => {
	return (
		<>
			<Head>
				<title>Boutique - {app.name}</title>
			</Head>
			<div className="flex-grow flex flex-col gap-16 py-16 px-48">
				<Header />
				<ItemsGrid />
			</div>
		</>
	);
};

export default Shop;
