import config from "config";
import Image from "next/future/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="footer p-10 bg-base-200 text-base-content">
			<div>
				<Image
					src="/img/logo (transparent).png"
					width={100}
					height={100}
				/>
				<p className="font-semibold">BDE CESI Rouen</p>
				<p>Copyright © 2022 - Tous droits réservés</p>
			</div>
			<div>
				<span className="footer-title">À propos de nous</span>
				<Link href={config.router.home.path}>
					<a className="link link-hover hover:text-primary">BDE CESI Rouen</a>
				</Link>
				<Link href={config.router.team.path}>
					<a className="link link-hover hover:text-primary">L'équipe</a>
				</Link>
				<Link href={config.router.events.path}>
					<a className="link link-hover hover:text-primary">Les événements</a>
				</Link>
				<Link href={config.router.shop.path}>
					<a className="link link-hover hover:text-primary">Notre boutique</a>
				</Link>
			</div>
			<div>
				<span className="footer-title">Nos réseaux</span>
				{config.socials.map(social => (
					<a
						key={social.name}
						href={social.link}
						className="link link-hover hover:text-primary"
					>
						{social.name}
					</a>
				))}
			</div>
			{config.partners.length !== 0 && (
				<div>
					<span className="footer-title">Nos partenaires</span>
					{config.partners.map(social => (
						<a
							key={social.name}
							href={social.link}
							className="link link-hover hover:text-primary"
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
