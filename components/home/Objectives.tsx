type HighlightProps = {
	children: React.ReactNode;
};

type ObjectiveProps = {
	children: React.ReactNode;
	delay: number;
};

const Highlight = ({ children }: HighlightProps) => {
	return (
		<span className="group-hover:text-primary font-bold transition-colors">
			{children}
		</span>
	);
};

const Objective = ({ children, delay }: ObjectiveProps) => {
	return (
		<div
			className="flex items-center bg-gray-900 p-12 rounded-lg transition-shadow shadow-lg hover:shadow-xl hover:shadow-primary invisible group"
			data-animate={delay}
		>
			<p className="text-center">{children}</p>
		</div>
	);
};

const Objective1 = () => (
	<>
		Grandir en <Highlight>popularité</Highlight> le BDE et instaurer une{" "}
		<Highlight>continuité</Highlight> entre les prochaines listes
	</>
);

const Objective2 = () => (
	<>
		Organiser des <Highlight>événements</Highlight> sportifs, soirées, tournois
		e-sports et tant d&apos;autres...
	</>
);

const Objective3 = () => (
	<>
		Instaurer des <Highlight>photos</Highlight> de chaque promo avec le club
		photo, pour permettre à chaque étudiant d&apos;avoir un{" "}
		<Highlight>souvenir</Highlight> de ses années à CESI
	</>
);

const Objective4 = () => (
	<>
		Aider les <Highlight>clubs</Highlight>, pour permettre aux étudiants de{" "}
		<Highlight>s&apos;investir</Highlight> davantage
	</>
);

const Objective5 = () => (
	<>
		Redonner à tous une <Highlight>vie étudiante</Highlight> dont nous avons été
		privé pendant le COVID
	</>
);

const objectives = [Objective1, Objective2, Objective3, Objective4, Objective5];

const Objectives = () => {
	return (
		<div className="min-h-[80vh] px-48 py-32 bg-gray-800 flex border-t-8 border-b-8 border-primary">
			<div
				className="text-neutral flex-grow flex flex-col gap-32 justify-between invisible"
				data-animate
			>
				<h2 className="text-4xl font-semibold">Nos objectifs</h2>

				<div className="flex flex-col gap-16 cursor-default">
					<div className="grid grid-cols-3 gap-16 text-3xl">
						{objectives.slice(0, 3).map((objective, index) => (
							<Objective
								key={`1-${index}`}
								delay={(index + 1) * 250}
							>
								{objective()}
							</Objective>
						))}
					</div>
					<div className="grid grid-cols-2 gap-16 text-3xl">
						{objectives.slice(3, 5).map((objective, index) => (
							<Objective
								key={`2-${index}`}
								delay={(index + 1) * 250}
							>
								{objective()}
							</Objective>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Objectives;
