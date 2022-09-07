import cn from "classnames";
import { AuthUser, useAuthUser } from "next-firebase-auth";
import React, { useEffect, useReducer } from "react";

import {
	changeEmailReducer,
	INITIAL_STATE,
	ACTIONS,
} from "reducers/changeEmailReducer";

import { verifyEmail } from "utils/formVerification";

type Props = {
	user: AuthUser;
};

const ChangeEmail = ({ user }: Props) => {
	const AuthUser = useAuthUser();

	const [state, dispatch] = useReducer(changeEmailReducer, INITIAL_STATE);

	useEffect(() => {
		dispatch({ type: "INITIAL_SETUP", payload: user.email });
	}, [user.email]);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { isValid } = verifyEmail(event.target.value);

		dispatch({
			type: ACTIONS.CHANGE,
			payload: {
				email: event.target.value,
				warning: !isValid,
			},
		});
	};

	const handleChangeEmailClick = () => {
		if (state.warning || !AuthUser.id) {
			return;
		}

		dispatch({ type: ACTIONS.LOADING });

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/account/email", {
					method: "PUT",
					body: JSON.stringify({
						email: state.email,
					}),
					headers: {
						Authorization: token as string,
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					dispatch({ type: ACTIONS.FETCH_SUCCESS });
				} else {
					dispatch({ type: ACTIONS.FETCH_ERROR });
				}
			});
	};

	return (
		<div className="card shadow-xl bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Changer votre adresse mail</h2>
				<div className="flex gap-4 justify-between">
					<input
						className={cn("input flex-grow-[3]", {
							"input-primary": !state.warning && !state.error,
							"input-warning": state.warning,
							"input-error": state.error,
						})}
						type="text"
						defaultValue={user.email as string}
						onChange={event => handleEmailChange(event)}
					/>
					<button
						className={cn("btn flex-grow", {
							"btn-primary": !state.warning && !state.error,
							"btn-success": state.success,
							"btn-warning": state.warning,
							"btn-error": state.error,
							"no-animation": state.warning,
							"cursor-default": state.warning,
							loading: state.loading,
						})}
						onClick={() => handleChangeEmailClick()}
					>
						{state.warning
							? "Invalide"
							: state.error
							? "Erreur"
							: state.success
							? "Succès!"
							: "Modifier"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangeEmail;
