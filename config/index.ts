const app: App = {
	name: "BDE CESI ROUEN",
	socials: [
		{
			name: "Instagram",
			link: "https://instagram.com/bde_cesi_rouen",
		},
	],
	partners: [],
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
};

const router: Router = {
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
};

const navbar: Navbar = [
	router.home,
	router.events,
	router.team,
	router.clubs,
	router.shop,
];

const footer: Footer = {
	about: [
		{
			name: "BDE CESI ROUEN",
			path: router.home.path,
		},
		{
			name: "Les événements",
			path: router.events.path,
		},
		{
			name: "L'équipe",
			path: router.team.path,
		},
		{
			name: "Les clubs",
			path: router.clubs.path,
		},
		{
			name: "Notre boutique",
			path: router.shop.path,
		},
	],
};

const api: API = {
	signup: "/api/auth/signup",
	signin: "/api/auth/signin",
	signout: "/api/auth/signout",
};

const team: Team = {
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
			{
				firstName: "Nicolas",
				lastName: "THIEULIN",
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
};

type App = {
	name: string;
	socials: ExternalLink[];
	partners: ExternalLink[];
	siteUrl: string;
};

type Router = {
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

type API = {
	signup: APIRoute;
	signin: APIRoute;
	signout: APIRoute;
};

type Navbar = InternalPath[];

type Footer = {
	about: InternalPath[];
};

type Team = {
	presidence: TeamMember[];
	secretariat: TeamMember[];
	poles: {
		event: TeamMember[];
		club: TeamMember[];
		comm: TeamMember[];
	};
};

type InternalPath = {
	name: string;
	path: string;
};

type APIRoute = string;

type ExternalLink = {
	name: string;
	link: string;
};

type TeamMember = {
	firstName: string;
	lastName: string;
	role: string;
};

export { api, app, footer, navbar, router, team };
