const config = {
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
		shop: {
			name: "Boutique",
			path: "/boutique",
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
						firstName: "Samuel",
						lastName: "WARD",
						role: "Gestionnaire Site Web",
					},
					{
						firstName: "Tristan",
						lastName: "JEHANNO",
						role: "Gestionnaire Site Web",
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
				],
			},
		},
	},
};

const navbar = [
	config.router.home,
	config.router.events,
	config.router.team,
	config.router.shop,
];

export default config;
export { navbar };
