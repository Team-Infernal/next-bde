import cn from "classnames";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useState } from "react";

import { api, app, router } from "config";

import { verifyEmail, passChars } from "utils/formVerification";
import errMsg from "utils/firebaseErrors";
import sleep from "utils/sleep";

const localRouter = router;

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleInputChange = (
		changeFunc: React.Dispatch<React.SetStateAction<string>>,
		data: string
	) => {
		setError("");
		changeFunc(data);
	};

	const handleSignUpClick = async () => {
		if (!firstName || !lastName) {
			setError("Veuillez entrer votre nom et prénom");
			return;
		}

		if (!email) {
			setError("Veuillez entrer votre adresse mail");
			return;
		}

		if (!verifyEmail(email).isValid) {
			setError("Veuillez entrer une adresse mail valide");
			return;
		}

		if (!password) {
			setError("Veuillez entrer votre mot de passe");
			return;
		}

		if (password.length < 8 || password.length > 128) {
			setError("Le mot de passe doit contenir entre 8 et 128 caractères");
			return;
		}

		if (
			!password.split("").some(l => passChars.lowercase.includes(l)) ||
			!password.split("").some(l => passChars.uppercase.includes(l)) ||
			!password.split("").some(l => passChars.numbers.includes(l)) ||
			!password.split("").some(l => passChars.special.includes(l))
		) {
			setError(
				"Le mot de passe doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et 1 caractère spécial"
			);
			return;
		}

		if (!passwordConfirm) {
			setError("Veuillez confirmer votre mot de passe");
			return;
		}

		if (password !== passwordConfirm) {
			setError("Les mots de passe ne sont pas les mêmes");
			return;
		}

		setLoading(true);

		const cleanEmail = email.trim().toLowerCase();
		const cleanPassword = password.trim();
		const cleanFirstName =
			firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
		const cleanLastName =
			lastName.substring(0, 1).toUpperCase() + lastName.substring(1);

		const body = {
			email: cleanEmail,
			password: cleanPassword,
			firstName: cleanFirstName,
			lastName: cleanLastName,
		};

		const response = await fetch(api.signup, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (!data.success) {
			setError(data.error);
			setLoading(false);
			return;
		}

		const auth = getAuth();
		signInWithEmailAndPassword(auth, cleanEmail, cleanPassword)
			.then(async () => {
				await sleep(500);
				router.push(localRouter.account.path);
			})
			.catch(error => {
				setError(errMsg(error.code));
				setLoading(false);
			});
	};

	return (
		<>
			<Head>
				<title>Créer un compte - {app.name}</title>
			</Head>
			<div className="flex flex-grow">
				<div className="flex flex-col justify-center bg-base-100 shadow-xl z-30 p-5 lg:px-20 lg:w-1/3 w-full">
					<div className="form-control">
						<h2 className="text-3xl font-bold text-center sm:text-left">
							Créer un compte
						</h2>
						<div>
							<div className="flex flex-col md:flex-row md:gap-4">
								<div className="form-control flex-grow">
									<label className="label">
										<span className="label-text">Prénom</span>
									</label>
									<input
										type="text"
										className="input input-bordered input-primary w-full"
										placeholder="Prénom"
										onChange={e =>
											handleInputChange(setFirstName, e.target.value)
										}
									/>
								</div>

								<div className="form-control flex-grow">
									<label className="label">
										<span className="label-text">Nom</span>
									</label>
									<input
										type="text"
										className="input input-bordered input-primary w-full"
										placeholder="Nom"
										onChange={e =>
											handleInputChange(setLastName, e.target.value)
										}
									/>
								</div>
							</div>

							<label className="label">
								<span className="label-text">Adresse mail</span>
							</label>
							<input
								type="text"
								className="input input-bordered input-primary w-full"
								placeholder="Adresse mail"
								onChange={e => handleInputChange(setEmail, e.target.value)}
							/>

							<label className="label">
								<span className="label-text">Mot de passe</span>
							</label>
							<input
								type="password"
								className="input input-bordered input-primary w-full"
								placeholder="**********"
								onChange={e => handleInputChange(setPassword, e.target.value)}
							/>

							<label className="label">
								<span className="label-text">Confirmation du mot de passe</span>
							</label>
							<input
								type="password"
								className="input input-bordered input-primary w-full"
								placeholder="**********"
								onChange={e =>
									handleInputChange(setPasswordConfirm, e.target.value)
								}
							/>
						</div>
						<button
							onClick={() => handleSignUpClick()}
							className={cn("btn mt-4", {
								"btn-primary": !error,
								"btn-warning": error,
								loading: loading,
							})}
						>
							{loading
								? "Création de votre compte..."
								: !error
								? "S'enregistrer"
								: error}
						</button>
						<div className="divider">OU</div>
						<Link href={localRouter.signin.path}>
							<button className="btn btn-primary">
								<a>Se connecter</a>
							</button>
						</Link>
					</div>
				</div>
				<div className="hidden lg:flex justify-center items-center bg-base-100 flex-grow">
					<Image
						src="/img/logo.svg"
						height={800}
						width={800}
						alt="Logo du BDE CESI Rouen"
					/>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser()(SignUp);
