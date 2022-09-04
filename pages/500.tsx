const InternalServerError = () => {
	return (
		<div className="flex-grow flex items-center justify-center flex-col gap-4">
			<h1 className="text-primary text-3xl font-semibold">Erreur 500</h1>
			<p>Une erreur est survenue. Veuillez réssayer plus tard.</p>
		</div>
	);
};

export default InternalServerError;
