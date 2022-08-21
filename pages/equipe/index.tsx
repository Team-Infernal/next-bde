import TeamMemberCard from "components/team/TeamMemberCard";

import config from "config";

const Team = () => {
	const { equipe } = config.pages;

	return (
		<div className="flex flex-col gap-16 items-center my-10">
			<h1 className="text-3xl font-bold">Présidence</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{equipe.presidence.map(member => (
					<TeamMemberCard
						key={`${member.firstName} ${member.lastName}`}
						member={member}
					/>
				))}
			</div>

			<h1 className="text-3xl font-bold">Sécrétariat</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{equipe.secretariat.map(member => (
					<TeamMemberCard
						key={`${member.firstName} ${member.lastName}`}
						member={member}
					/>
				))}
			</div>

			<h1 className="text-3xl font-bold">Pôle Événements</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{equipe.poles.event.map(member => (
					<TeamMemberCard
						key={`${member.firstName} ${member.lastName}`}
						member={member}
					/>
				))}
			</div>

			<h1 className="text-3xl font-bold">Pôle Clubs</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{equipe.poles.club.map(member => (
					<TeamMemberCard
						key={`${member.firstName} ${member.lastName}`}
						member={member}
					/>
				))}
			</div>

			<h1 className="text-3xl font-bold">Pôle Communication</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{equipe.poles.comm.map(member => (
					<TeamMemberCard
						key={`${member.firstName} ${member.lastName}`}
						member={member}
					/>
				))}
			</div>
		</div>
	);
};

export default Team;
