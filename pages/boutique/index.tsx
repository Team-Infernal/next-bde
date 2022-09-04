import Header from "components/shop/Header";
import ItemsGrid from "components/shop/ItemsGrid";

const Shop = () => {
	return (
		<div className="flex-grow flex flex-col gap-16 py-16 px-48">
			<Header />
			<ItemsGrid />
		</div>
	);
};

export default Shop;
