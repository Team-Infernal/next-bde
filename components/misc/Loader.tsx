type Props = {
	scale?: number;
};

const Loader = ({ scale = 3 }: Props) => {
	return (
		<div className="flex-grow flex justify-center items-center">
			<div
				className="branch-loader"
				style={{ transform: `scale(${scale})` }}
			>
				<div className="stick"></div>
				<div className="leaf leaf-top leaf-top-left"></div>
				<div className="leaf leaf-top leaf-top-right"></div>
				<div className="leaf leaf-bottom leaf-bottom-left"></div>
				<div className="leaf leaf-bottom leaf-bottom-right"></div>
			</div>
		</div>
	);
};

export default Loader;
