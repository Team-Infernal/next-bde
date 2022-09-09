import Image from "next/future/image";
import Link from "next/link";

import { app, footer } from "config";

const Footer = () => {
	return (
		<footer className="footer p-10 bg-base-200 text-base-content">
			<div>
				<Image
					src="/img/logo (transparent).png"
					width={100}
					height={100}
					alt="Logo du BDE CESI ROUEN"
				/>
				<p className="font-semibold">BDE CESI ROUEN</p>
				<p>Copyright © 2022 - Tous droits réservés</p>
			</div>
			<div>
				<span className="footer-title">À propos de nous</span>
				{footer.about.map(link => (
					<Link
						href={link.path}
						key={link.path}
					>
						<a className="link link-hover hover:text-primary">{link.name}</a>
					</Link>
				))}
			</div>
			<div>
				<span className="footer-title">Nos réseaux</span>
				{app.socials.map(social => (
					<a
						key={social.name}
						href={social.link}
						className="link link-hover hover:text-primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						{social.name}
					</a>
				))}
			</div>
			{app.partners.length !== 0 && (
				<div>
					<span className="footer-title">Nos partenaires</span>
					{app.partners.map(social => (
						<a
							key={social.name}
							href={social.link}
							className="link link-hover hover:text-primary"
							target="_blank"
							rel="noopener noreferrer"
						>
							{social.name}
						</a>
					))}
				</div>
			)}
		</footer>
	);
};

export default Footer;
