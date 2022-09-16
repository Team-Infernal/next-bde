import Image from "next/future/image";

const Hero = () => {
	return (
		<div
			className="hero min-h-screen bg-base-100 invisible"
			data-animate
		>
			<div className="hero-content text-center">
				<div className="flex flex-col items-center gap-16">
					<div className="max-w-md">
						<Image
							src="/img/logo (transparent).png"
							width={1091}
							height={1307}
							alt="BDE CESI ROUEN"
						/>
					</div>
					<h1 className="text-5xl font-semibold">
						Découvrez la nouvelle liste BDE de 2022-2023
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Hero;
