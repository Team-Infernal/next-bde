type Props = {
	name: string | null;
};

const Header = ({ name }: Props) => {
	return (
		<div>
			<h1 className="text-3xl font-semibold">
				Bienvenue dans votre espace client{name && `, ${name.split("_")[0]}`}
			</h1>
		</div>
	);
};

export default Header;
