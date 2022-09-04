const config: Config = {
	router: {
		home: {
			name: "Accueil",
			path: "/",
		},
		team: {
			name: "Équipe",
			path: "/equipe",
		},
		events: {
			name: "Événements",
			path: "/evenements",
		},
		clubs: {
			name: "Clubs",
			path: "/clubs",
		},
		shop: {
			name: "Boutique",
			path: "/boutique",
		},
		cart: {
			name: "Panier",
			path: "/boutique/panier",
		},
		account: {
			name: "Compte",
			path: "/compte",
		},
		signup: {
			name: "S'enregistrer",
			path: "/auth/signup",
		},
		signin: {
			name: "Se connecter",
			path: "/auth/signin",
		},
	},
	api: {
		signup: {
			route: "/api/auth/signup",
		},
		signin: {
			route: "/api/auth/signin",
		},
		signout: {
			route: "/api/auth/signout",
		},
	},
	socials: [
		{
			name: "Instagram",
			link: "https://instagram.com/bde_cesi_rouen",
		},
	],
	partners: [],
	pages: {
		equipe: {
			presidence: [
				{
					firstName: "Alexandre",
					lastName: "MAILLY",
					role: "Président",
				},
				{
					firstName: "Romain",
					lastName: "GIRCOURT",
					role: "Vice-Président",
				},
			],
			secretariat: [
				{
					firstName: "Thomas",
					lastName: "LE MONNIER",
					role: "Secrétaire",
				},
				{
					firstName: "Cyprien",
					lastName: "PESCHET",
					role: "Trésorier",
				},
			],
			poles: {
				event: [
					{
						firstName: "Erwan",
						lastName: "VIGIER",
						role: "Responsable Pôle Événements",
					},
					{
						firstName: "Dorian",
						lastName: "CHESNAIS",
						role: "Membre Pôle Événements",
					},
					{
						firstName: "Corentin",
						lastName: "VALET",
						role: "Membre Pôle Événements",
					},
					{
						firstName: "Sébastien",
						lastName: "AUBERT",
						role: "Membre Pôle Événements",
					},
				],
				club: [
					{
						firstName: "Luca",
						lastName: "GONCALVES",
						role: "Responsable Pôle Clubs",
					},
					{
						firstName: "Matthieu",
						lastName: "MICHEL",
						role: "Membre Pôle Clubs/Assos",
					},
					{
						firstName: "Maxence",
						lastName: "BARBE PILLON",
						role: "Membre Pôle Clubs/Assos",
					},
				],
				comm: [
					{
						firstName: "Lisa",
						lastName: "RATTIER",
						role: "Responsable Pôle Communication",
					},
					{
						firstName: "Coline",
						lastName: "COELHO",
						role: "Membre Pôle Communication",
					},
					{
						firstName: "Nicolas",
						lastName: "THIEULIN",
						role: "Membre Pôle Communication",
					},
					{
						firstName: "Samuel",
						lastName: "WARD",
						role: "Gestionnaire Site Web",
					},
					{
						firstName: "Tristan",
						lastName: "JEHANNO",
						role: "Gestionnaire Site Web",
					},
				],
			},
		},
	},
};

const navbar = [
	config.router.home,
	config.router.events,
	config.router.team,
	config.router.clubs,
	config.router.shop,
];

type Config = {
	router: {
		home: InternalPath;
		team: InternalPath;
		events: InternalPath;
		clubs: InternalPath;
		shop: InternalPath;
		cart: InternalPath;
		account: InternalPath;
		signup: InternalPath;
		signin: InternalPath;
	};
	api: {
		signup: APIRoute;
		signin: APIRoute;
		signout: APIRoute;
	};
	socials: ExternalLink[];
	partners: ExternalLink[];
	pages: {
		equipe: {
			presidence: TeamMember[];
			secretariat: TeamMember[];
			poles: {
				event: TeamMember[];
				club: TeamMember[];
				comm: TeamMember[];
			};
		};
	};
};

type InternalPath = {
	name: string;
	path: string;
};

type APIRoute = {
	route: string;
};

type ExternalLink = {
	name: string;
	link: string;
};

type TeamMember = {
	firstName: string;
	lastName: string;
	role: string;
};

export default config;
export { navbar };
