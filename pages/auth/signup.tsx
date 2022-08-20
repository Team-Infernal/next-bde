import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR,
} from "next-firebase-auth";
import cn from "classnames";

import { verifyEmail, verifyPassword } from "utils/formVerification";
import config from "config";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [emailError, setEmailError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const router = useRouter();

	const handleSignUpClick = async () => {
		setErrors([]);
		setEmailError(false);
		setFirstNameError(false);
		setLastNameError(false);
		setPasswordError(false);

		const emailVerification = verifyEmail(email);
		const passwordVerification = verifyPassword(password);

		if (!firstName) {
			setFirstNameError(true);
			setErrors(errors => [...errors, "Veuillez renseigner votre prénom."]);
		}

		if (!lastName) {
			setLastNameError(true);
			setErrors(errors => [...errors, "Veuillez renseigner votre nom."]);
		}

		if (!emailVerification.isValid) {
			setEmailError(true);
			setErrors(errors => [...errors, ...emailVerification.errors]);
		}

		// if (!passwordVerification.isValid) {
		// 	setPasswordError(true);
		// 	setErrors(errors => [...errors, ...passwordVerification.errors]);
		// }

		if (password !== passwordConfirm) {
			setPasswordError(true);
			setErrors(errors => [
				...errors,
				"Les mots de passe ne sont pas les mêmes.",
			]);
		}

		if (errors.length !== 0) {
			return;
		}

		setLoading(true);

		const body = {
			email,
			password,
			firstName,
			lastName,
		};

		const response = await fetch(config.api.signup.route, {
			method: "POST",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		});

		const data = await response.json();

		if (!data.success) {
			setErrors(errors => [...errors, data.error]);
		}

		if (data.success) {
			const auth = getAuth();

			await signInWithEmailAndPassword(auth, email, password);

			router.push(config.router.account.path);
		}

		setLoading(false);
	};

	return (
		<div className="flex justify-center pt-16">
			<div className="card w-[33%] bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title justify-center">Création de compte</h2>
					{errors.length !== 0 && (
						<div>
							<div className="alert alert-error shadow-lg flex-col items-start">
								{errors.map(error => (
									<div key={error}>
										<span className="text-sm">{error}</span>
									</div>
								))}
							</div>
						</div>
					)}
					<div className="form-control">
						<div className="flex gap-2">
							<div className="flex-grow">
								<label className="label">
									<span className="label-text">Prénom</span>
								</label>
								<input
									onChange={e => setFirstName(e.target.value)}
									type="text"
									placeholder="Prénom"
									className={cn("input input-bordered w-full", {
										"input-primary": !firstNameError,
										"input-error": firstNameError,
									})}
								/>
							</div>

							<div className="flex-grow">
								<label className="label">
									<span className="label-text">Nom</span>
								</label>
								<input
									onChange={e => setLastName(e.target.value)}
									type="text"
									placeholder="Nom"
									className={cn("input input-bordered w-full", {
										"input-primary": !lastNameError,
										"input-error": lastNameError,
									})}
								/>
							</div>
						</div>

						<label className="label">
							<span className="label-text">Adresse mail</span>
						</label>
						<input
							onChange={e => setEmail(e.target.value)}
							type="text"
							placeholder="Adresse mail"
							className={cn("input input-bordered w-full", {
								"input-primary": !emailError,
								"input-error": emailError,
							})}
						/>

						<label className="label">
							<span className="label-text">Mot de passe</span>
						</label>
						<input
							onChange={e => setPassword(e.target.value)}
							type="password"
							placeholder="**********"
							className={cn("input input-bordered w-full", {
								"input-primary": !passwordError,
								"input-error": passwordError,
							})}
						/>

						<label className="label">
							<span className="label-text">Confirmer votre mot de passe</span>
						</label>
						<input
							onChange={e => setPasswordConfirm(e.target.value)}
							type="password"
							placeholder="**********"
							className={cn("input input-bordered w-full", {
								"input-primary": !passwordError,
								"input-error": passwordError,
							})}
						/>
					</div>
					<div className="card-actions">
						<button
							onClick={() => handleSignUpClick()}
							className={cn("btn btn-primary w-full", {
								loading: loading,
							})}
						>
							{!loading ? "S'enregistrer" : "Création de votre compte..."}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser()(SignUp);
