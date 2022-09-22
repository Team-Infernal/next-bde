import Title from "components/misc/Title";
import ChangeContainer from "components/account/update/ChangeContainer";
import ChangeTelephone from "components/account/update/ChangeTelephone";

const ChangeTelephonePage = () => {
	return (
		<>
			<Title text="Changer de numéro de téléphone" />
			<ChangeContainer type="Téléphone">
				<ChangeTelephone />
			</ChangeContainer>
		</>
	);
};

export default ChangeTelephonePage;
