import ItemCard from "components/shop/ItemCard";

const items = new Array(25).fill("Item");

const ItemsGrid = () => {
	return (
		<div className="grid grid-cols-3 gap-16">
			{items.map((item, index) => (
				<ItemCard
					key={`item-${index}`}
					id={index}
				/>
			))}
		</div>
	);
};

export default ItemsGrid;
