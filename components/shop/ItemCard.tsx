import Image from "next/future/image";
import Link from "next/link";

import { router } from "config";

import { ShopItem } from "types";

type Props = {
	item: ShopItem;
};

const ItemCard = ({ item }: Props) => {
	return (
		<div className="card card-compact w-full bg-base-100 shadow-xl">
			<figure>
				<Image
					src={item.images[0]}
					width={800}
					height={450}
					alt={item.name}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{item.name}</h2>
				<div className="card-actions justify-end">
					<Link href={`${router.shop.path}/${item.id}`}>
						<a>
							<button className="btn btn-primary">Voir plus</button>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
