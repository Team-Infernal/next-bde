import Image from "next/future/image";

type Props = {
	member: {
		firstName: string;
		lastName: string;
		role: string;
	};
};

const TeamMemberCard = ({ member }: Props) => {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				<Image
					src="/img/logo (transparent, no text).png"
					width={200}
					height={112.5}
					alt={`Photo de ${member.firstName} ${member.lastName}`}
					className="pt-8"
				/>
			</figure>
			<div className="card-body items-center">
				<h2 className="card-title">{`${member.firstName} ${member.lastName}`}</h2>
				<div className="badge badge-primary">{member.role}</div>
			</div>
		</div>
	);
};

export default TeamMemberCard;
