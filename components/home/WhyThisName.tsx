const WhyThisName = () => {
	return (
		<div className="min-h-[80vh] flex justify-center items-center">
			<div
				className="p-32 border-4 border-primary rounded-lg shadow-xl flex gap-32 items-center invisible"
				data-animate
			>
				<h2 className="text-4xl font-semibold">
					Pourquoi ce <span className="text-primary">nom</span>?
				</h2>
				<div className="max-w-sm">
					<p className="text-3xl">
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
