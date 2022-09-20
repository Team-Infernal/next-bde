import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

import Loader from "components/misc/Loader";

type Props = {
	children: React.ReactNode;
	type: string;
};

const ChangeContainer = ({ children, type }: Props) => {
	const AuthUser = useAuthUser();

	if (!AuthUser.firebaseUser) {
		return (
			<div className="flex-grow flex justify-center items-center">
				<Loader scale={2} />
			</div>
		);
	}

	return (
		<div className="flex-grow flex justify-center animate-fade-in-up">
			<div className="card w-[36rem] bg-base-100 shadow-xl my-16 h-fit">
				<div className="card-body">
					<Link href="/compte">
						<a className="link link-hover">
							<FontAwesomeIcon icon={faAngleLeft} /> Retour
						</a>
					</Link>
					<h2 className="card-title text-2xl">
						Mise à jour -<span className="text-primary">{type}</span>
					</h2>
					<div className="flex-grow flex mt-4">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeContainer;
