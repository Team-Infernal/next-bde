type Props = {
	message: string;
};

const Error = ({ message }: Props) => {
	return (
		<div className="flex-grow flex justify-center items-center">
			<h2 className="text-xl">{message}</h2>
		</div>
	);
};

export default Error;
