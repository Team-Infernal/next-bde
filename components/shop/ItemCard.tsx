import Image from "next/future/image";
import Link from "next/link";

import { router } from "config";

type Props = {
	id: number;
};

const ItemCard = ({ id }: Props) => {
	return (
		<div className="card card-compact w-full bg-base-100 shadow-xl">
			<figure>
				<Image
					src={"https://placeimg.com/800/450/arch"}
					width={800}
					height={450}
					alt={""}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">Item {id}</h2>
				<p>Item {id} description</p>
				<div className="card-actions justify-end">
					<Link href={`${router.shop.path}/item-${id}`}>
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
