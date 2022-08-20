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
};

const navbar = [
	config.router.home,
	config.router.events,
	config.router.team,
	config.router.shop,
];

export default config;
export { navbar };
