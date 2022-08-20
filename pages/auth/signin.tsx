import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR,
} from "next-firebase-auth";
import cn from "classnames";

import config from "config";

import errMsg from "utils/firebaseErrors";
import { verifyEmail } from "utils/formVerification";
import sleep from "utils/sleep";
import Link from "next/link";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleEmailChange = (email: string) => {
		setError("");
		setEmail(email);
	};

	const handlePasswordChange = (password: string) => {
		setError("");
		setPassword(password);
	};

	const handleSignInClick = async () => {
		if (!email && !password) {
			setError("Veuillez entrer votre adresse mail et mot de passe");
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

		setLoading(true);

		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(async () => {
				await sleep(500);
				router.push(config.router.account.path);
			})
			.catch(error => {
				setError(errMsg(error.code));
				setLoading(false);
			});
	};

	return (
		<div className="flex flex-grow">
			<div className="flex flex-col justify-center bg-base-100 shadow-xl z-30 px-20 w-1/3">
				<div className="form-control">
					<h2 className="text-3xl font-bold">Connexion</h2>
					<div>
						<label className="label">
							<span className="label-text">Adresse mail</span>
						</label>
						<input
							type="text"
							className="input input-bordered input-primary w-full"
							placeholder="Adresse mail"
							onChange={e => handleEmailChange(e.target.value)}
						/>

						<label className="label">
							<span className="label-text">Mot de passe</span>
						</label>
						<input
							type="password"
							className="input input-bordered input-primary w-full"
							placeholder="**********"
							onChange={e => handlePasswordChange(e.target.value)}
						/>
					</div>
					<button
						onClick={() => handleSignInClick()}
						className={cn("btn mt-4", {
							"btn-primary": !error,
							"btn-warning": error,
							loading: loading,
						})}
					>
						{loading ? "Connexion..." : !error ? "Se connecter" : error}
					</button>
					<div className="divider">OU</div>
					<Link href={config.router.signup.path}>
						<button className="btn btn-primary">
							<a>Se créer un compte</a>
						</button>
					</Link>
				</div>
			</div>
			<div className="flex justify-center items-center bg-base-100 flex-grow">
				<Image
					src="/img/logo.svg"
					height={800}
					width={800}
				/>
			</div>
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser()(SignIn);
