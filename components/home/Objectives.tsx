type HighlightProps = {
	children: React.ReactNode;
};

type ObjectiveProps = {
	children: React.ReactNode;
};

const Highlight = ({ children }: HighlightProps) => {
	return (
		<span className="group-hover:text-primary font-bold transition-colors">
			{children}
		</span>
	);
};

const Objective = ({ children }: ObjectiveProps) => {
	return (
		<div className="flex items-center bg-gray-900 p-8 sm:p-12 rounded-lg transition-shadow shadow-lg hover:shadow-xl hover:shadow-primary group">
			<p className="text-center text-xl sm:text-3xl">{children}</p>
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
		<div className="min-h-[80vh] px-4 sm:px-24 xl:px-48 py-16 sm:py-24 xl:py-32 bg-gray-800 flex border-t-8 border-b-8 border-primary">
			<div
				className="text-neutral flex-grow flex flex-col gap-16 sm:gap-32 justify-between items-center invisible"
				data-animate
			>
				<h2 className="text-4xl font-semibold">Nos objectifs</h2>

				<div className="flex flex-col gap-4 sm:gap-16 cursor-default">
					<div
						className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-16 text-3xl invisible"
						data-animate
					>
						{objectives.slice(0, 3).map((objective, index) => (
							<Objective key={`1-${index}`}>{objective()}</Objective>
						))}
					</div>
					<div
						className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-16 text-3xl invisible"
						data-animate
					>
						{objectives.slice(3, 5).map((objective, index) => (
							<Objective key={`2-${index}`}>{objective()}</Objective>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Objectives;
