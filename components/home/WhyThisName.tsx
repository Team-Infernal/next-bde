const WhyThisName = () => {
	return (
		<div className="min-h-[50vh] sm:min-h-[80vh] flex justify-center items-center p-8 sm:p-16">
			<div
				className="p-8 sm:p-16 lg:p-32 border-4 border-primary rounded-lg shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-32 items-center invisible"
				data-animate
			>
				<h2 className="text-center text-4xl font-semibold">
					Pourquoi ce <span className="text-primary">nom</span>?
				</h2>
				<div className="max-w-sm">
					<p className="text-2xl sm:text-3xl text-center sm:text-left">
						En choisissant ce nom, c&apos;est{" "}
						<span className="text-primary font-semibold">notre école</span> qui
						est <span className="text-primary font-semibold">représentée</span>{" "}
						et qui devient facilement{" "}
						<span className="text-primary font-semibold">identifiable</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default WhyThisName;
