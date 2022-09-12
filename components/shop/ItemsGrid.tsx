import ItemCard from "components/shop/ItemCard";

import { ShopItem } from "types";

type Props = {
	items: ShopItem[];
};

const ItemsGrid = ({ items }: Props) => {
	return (
		<div className="grid lg:grid-cols-3 gap-16">
			{items.map((item, index) => (
				<ItemCard
					key={`item-${item.id}`}
					item={item}
				/>
			))}
		</div>
	);
};

export default ItemsGrid;
