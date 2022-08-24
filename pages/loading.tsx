const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="loader">
				<div className="stick"></div>
				<div className="leaf leaf-top leaf-top-left"></div>
				<div className="leaf leaf-top leaf-top-right"></div>
				<div className="leaf leaf-bottom leaf-bottom-left"></div>
				<div className="leaf leaf-bottom leaf-bottom-right"></div>
			</div>
		</div>
	);
};

export default Loading;
