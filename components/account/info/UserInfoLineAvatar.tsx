import Image from "next/future/image";
import Link from "next/link";

import gravatar from "utils/gravatar";

type Props = {
	email: string;
	photoURL: string | null;
};

const UserInfoLineAvatar = ({ email, photoURL }: Props) => {
	return (
		<div className="px-4 py-5 sm:grid sm:grid-cols-3 group">
			<dt className="text-gray-500 flex items-center">
				Avatar {!photoURL && "(Gravatar)"}
			</dt>
			<dd className="flex items-center">
				<div className="avatar">
					<div className="w-16 rounded-full">
						<Image
							src={photoURL || gravatar(email)}
							width={64}
							height={64}
							alt="Votre avatar"
						/>
					</div>
				</div>
			</dd>
			<div className="flex justify-end items-center">
				<Link href="/compte/change-avatar">
					<a>
						<button className="btn btn-sm opacity-0 group-hover:opacity-100">
							Modifier
						</button>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default UserInfoLineAvatar;
