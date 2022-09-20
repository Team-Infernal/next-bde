import cn from "classnames";
import { sendEmailVerification } from "firebase/auth";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

import { verifyEmail } from "utils/formVerification";

const ChangeEmail = () => {
	const AuthUser = useAuthUser();

	const [email, setEmail] = useState("");
	const [invalid, setInvalid] = useState(true);
	const [errors, setErrors] = useState<string[]>([
		"Saisissez une nouvelle adresse mail",
	]);
	const [loading, setLoading] = useState(false);
	const [changed, setChanged] = useState(false);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors([]);

		const newEmail = event.target.value.toLowerCase().trim();
		const { errors, isValid } = verifyEmail(newEmail);

		setEmail(newEmail);
		setInvalid(!isValid);

		if (!isValid) {
			setErrors(errors);
		}

		if (newEmail === AuthUser.email) {
			setErrors(["Vous ne pouvez pas réutiliser la même adresse mail"]);
			setInvalid(true);
		}
	};

	const handleEmailValidate = () => {
		setLoading(true);
		const { isValid } = verifyEmail(email);
		if (invalid || !isValid) {
			return;
		}

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/account/email", {
					method: "PUT",
					body: JSON.stringify(email),
					headers: {
						Authorization: token || "",
					},
				})
			)
			.then(response => response.json())
			.then(async data => {
				if (data.success && AuthUser.firebaseUser) {
					await sendEmailVerification(AuthUser.firebaseUser).then(() => {
						setChanged(true);
					});
				}
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				setInvalid(true);
				setErrors(["Erreur lors la modification"]);
				console.warn(err);
			});
	};

	if (changed) {
		return (
			<div>
				Votre adresse mail a bien été modifié. Veuillez vérifier votre boîte
				mail pour vérifier votre nouvelle adresse mail.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="flex flex-col gap-2">
				<label htmlFor="current-email">Adresse mail actuelle</label>
				<input
					className="input input-disabled"
					type="text"
					id="current-email"
					defaultValue={AuthUser.email || ""}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="new-email">Nouvelle adresse mail</label>
				<input
					className={cn("input", {
						"input-primary": !invalid,
						"input-warning": invalid,
					})}
					type="text"
					id="new-email"
					onChange={event => handleEmailChange(event)}
				/>
			</div>
			<button
				className={cn("btn", {
					"btn-primary": !invalid && !loading,
					"btn-warning": invalid && !loading,
					"btn-disabled": loading,
					loading: loading,
				})}
				onClick={() => handleEmailValidate()}
			>
				{errors.length > 0
					? errors[0]?.replace(/\.$/, "")
					: loading
					? "Modification en cours..."
					: "Valider la modification"}
			</button>
		</div>
	);
};

export default ChangeEmail;
