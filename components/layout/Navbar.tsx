import { useAuthUser } from "next-firebase-auth";

const Navbar = () => {
	const AuthUser = useAuthUser();
	console.log(AuthUser);

	return <div></div>;
};

export default Navbar;
