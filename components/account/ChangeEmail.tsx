import { AuthUser } from "next-firebase-auth";
import { useEffect, useReducer } from "react";

import { changeEmailReducer, INITIAL_STATE } from "reducers/changeEmailReducer";

type Props = {
	user: AuthUser;
};

const ChangeEmail = ({ user }: Props) => {
	const [state, dispatch] = useReducer(changeEmailReducer, INITIAL_STATE);

	useEffect(() => {
		dispatch({ type: "INITIAL_SETUP", payload: user.email });
	}, [user.email]);

	return (
		<div className="card shadow-xl bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Changer votre adresse mail</h2>
				<div>
					<input
						className="input input-primary w-full"
						type="text"
						value={user.email as string}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChangeEmail;
