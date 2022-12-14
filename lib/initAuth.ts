import { init } from "next-firebase-auth";

import { api, router } from "config";

const initAuth = () => {
	init({
		authPageURL: router.signin.path,
		appPageURL: router.home.path,
		loginAPIEndpoint: api.signin,
		logoutAPIEndpoint: api.signout,
		onLoginRequestError: err => {
			console.error(err);
		},
		onLogoutRequestError: err => {
			console.error(err);
		},
		firebaseAdminInitConfig: {
			credential: {
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
				clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "",
				privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY || "",
			},
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
		},
		firebaseClientInitConfig: {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
		},
		cookies: {
			name: "BDE-CESI-Rouen",
			keys: [
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: 14 * 24 * 60 * 60 * 1000,
			overwrite: true,
			path: "/",
			sameSite: "strict",
			secure: false, // prod = true
			signed: true,
		},
		onVerifyTokenError: err => {
			console.error(err);
		},
		onTokenRefreshError: err => {
			console.error(err);
		},
	});
};

export default initAuth;
