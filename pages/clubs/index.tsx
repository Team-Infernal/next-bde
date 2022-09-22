import Title from "components/misc/Title";
import Unavailable from "components/misc/Unavailable";

const Clubs = () => {
	return (
		<>
			<Title text="Clubs" />
			<div className="flex-grow flex justify-center items-center h-screen lg:h-fit">
				<Unavailable />
			</div>
		</>
	);
};

export default Clubs;
