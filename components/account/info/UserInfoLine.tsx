import Link from "next/link";

type Props = {
	title: string;
	value: string | null;
	edit?: string;
};

const UserInfoLine = ({ title, value, edit }: Props) => {
	return (
		<div className="px-4 py-5 sm:grid sm:grid-cols-3 group">
			<dt className="text-gray-500 flex items-center">{title}</dt>
			{value ? (
				<dd className="flex items-center">{value}</dd>
			) : (
				<dd className="text-gray-500 flex items-center italic">
					Non renseigné(e)
				</dd>
			)}
			{edit && (
				<div className="flex justify-end items-center">
					<Link href={`/compte/${edit}`}>
						<a>
							<button className="btn btn-sm opacity-0 group-hover:opacity-100">
								Modifier
							</button>
						</a>
					</Link>
				</div>
			)}
		</div>
	);
};

export default UserInfoLine;
