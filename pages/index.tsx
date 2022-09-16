import Head from "next/head";
import { useEffect } from "react";

import Hero from "components/home/Hero";
import WhyThisName from "components/home/WhyThisName";
import Objectives from "components/home/Objectives";

import { app } from "config";

import sleep from "utils/sleep";

const Accueil = () => {
	useEffect(() => {
		let observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach(async entry => {
					if (entry.isIntersecting) {
						if (
							entry.target instanceof HTMLElement &&
							entry.target.dataset.animate !== "true"
						) {
							await sleep(parseInt(entry.target.dataset.animate || ""));
						}
						entry.target.classList.remove("invisible");
						entry.target.classList.add("animate-fade-in-up");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.2,
			}
		);

		document.querySelectorAll("[data-animate]").forEach(section => {
			observer.observe(section);
		});
	}, []);

	return (
		<>
			<Head>
				<title>{app.name}</title>
			</Head>
			<div className="flex-grow">
				<Hero />
				<WhyThisName />
				<Objectives />
			</div>
		</>
	);
};

export default Accueil;
