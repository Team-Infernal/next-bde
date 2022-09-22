import Title from "components/misc/Title";
import ChangeContainer from "components/account/update/ChangeContainer";
import ChangeEmail from "components/account/update/ChangeEmail";

const ChangeEmailPage = () => {
	return (
		<>
			<Title text="Changer d'adresse mail" />
			<ChangeContainer type="Adresse mail">
				<ChangeEmail />
			</ChangeContainer>
		</>
	);
};

export default ChangeEmailPage;
