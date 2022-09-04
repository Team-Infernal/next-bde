import cn from "classnames";

import { Action, ShopAllItemSizes, ShopItemSizes } from "types";

type Props = {
	sizes: ShopItemSizes;
	selectedSize: SelectedSize;
	dispatch: React.Dispatch<Action>;
};

type SelectedSize = {
	size: string;
	available: boolean;
};

const allSizes: ShopAllItemSizes = ["xs", "s", "m", "l", "xl", "2xl"];

const ItemSizes = ({ sizes, selectedSize, dispatch }: Props) => {
	return (
		<>
			<div className="grid grid-cols-6 gap-2 w-max">
				{allSizes.map(size =>
					sizes[size] ? (
						<button
							key={size}
							className={cn("btn btn-primary", {
								"btn-outline": selectedSize.size !== size,
							})}
							onClick={() =>
								dispatch({
									type: "CHANGE_SIZE",
									payload: {
										size,
										available: true,
									},
								})
							}
						>
							{size.toUpperCase()}
						</button>
					) : (
						<button
							key={size}
							className={cn("btn btn-warning", {
								"btn-outline": selectedSize.size !== size,
							})}
							onClick={() =>
								dispatch({
									type: "CHANGE_SIZE",
									payload: {
										size,
										available: false,
									},
								})
							}
						>
							{size.toUpperCase()}
						</button>
					)
				)}
			</div>
		</>
	);
};

export default ItemSizes;
