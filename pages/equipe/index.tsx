import Head from "next/head";

import TeamMemberCard from "components/team/TeamMemberCard";

import { app, team } from "config";

const Team = () => {
	return (
		<>
			<Head>
				<title>Équipe - {app.name}</title>
			</Head>
			<div className="flex flex-col gap-16 items-center my-10">
				<h1 className="text-3xl font-bold">Présidence</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{team.presidence.map(member => (
						<TeamMemberCard
							key={`${member.firstName} ${member.lastName}`}
							member={member}
						/>
					))}
				</div>

				<h1 className="text-3xl font-bold">Sécrétariat</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{team.secretariat.map(member => (
						<TeamMemberCard
							key={`${member.firstName} ${member.lastName}`}
							member={member}
						/>
					))}
				</div>

				<h1 className="text-3xl font-bold">Pôle Événements</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{team.poles.event.map(member => (
						<TeamMemberCard
							key={`${member.firstName} ${member.lastName}`}
							member={member}
						/>
					))}
				</div>

				<h1 className="text-3xl font-bold">Pôle Clubs</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{team.poles.club.map(member => (
						<TeamMemberCard
							key={`${member.firstName} ${member.lastName}`}
							member={member}
						/>
					))}
				</div>

				<h1 className="text-3xl font-bold">Pôle Communication</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{team.poles.comm.map(member => (
						<TeamMemberCard
							key={`${member.firstName} ${member.lastName}`}
							member={member}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Team;
