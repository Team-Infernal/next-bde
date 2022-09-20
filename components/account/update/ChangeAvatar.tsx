import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFolder,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthUser } from "next-firebase-auth";
import Image from "next/future/image";
import React, { useState } from "react";

import gravatar from "utils/gravatar";

const allowedFileTypes = ["image/png", "image/jpeg"];

type Props = {
	email: string;
};

const ChangeAvatar = ({ email }: Props) => {
	const AuthUser = useAuthUser();

	const [selectedAvatar, setSelectedAvatar] = useState<null | File>(null);
	const [warning, setWarning] = useState<null | string>(null);

	const handleSelectedAvatarChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setWarning(null);
		const file = event.target.files?.[0];

		if (!file) {
			setWarning("Erreur.");
			return;
		}

		if (!allowedFileTypes.includes(file.type)) {
			setWarning("Veuillez choisir une image PNG ou JPEG.");
			return;
		}

		setSelectedAvatar(event.target.files?.[0] || null);
	};

	const handleAvatarValidate = () => {
		if (!selectedAvatar) {
			return;
		}

		console.log(selectedAvatar);

		AuthUser.getIdToken()
			.then(token =>
				fetch("/api/account/avatar", {
					method: "PUT",
					body: selectedAvatar,
					headers: {
						Authorization: token || "",
					},
				})
			)
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				setWarning("Erreur.");
			});
	};

	return (
		<div className="flex flex-col gap-8 items-center">
			<div className="flex gap-8 items-center">
				<div className="w-36 rounded-full">
					<Image
						src={gravatar(email)}
						width={500}
						height={500}
						alt="Votre avatar actuel"
					/>
				</div>
				{selectedAvatar && (
					<>
						<div>
							<FontAwesomeIcon
								icon={faAngleDoubleRight}
								className="text-primary text-3xl"
							/>
						</div>
						<div className="w-36 rounded-full">
							<Image
								src={URL.createObjectURL(selectedAvatar)}
								width={500}
								height={500}
								alt="Votre nouvel avatar"
							/>
						</div>
					</>
				)}
			</div>
			<div className="flex flex-col items-center gap-4">
				{warning && <div className="alert alert-warning">{warning}</div>}
				<label
					className="btn gap-1"
					htmlFor="avatar-input"
				>
					<div className="flex gap-2">
						<FontAwesomeIcon icon={faFolder} />
						Chosir un avatar
					</div>
					{selectedAvatar && <span>{selectedAvatar.name}</span>}
				</label>
				<input
					type="file"
					accept="image/png, image/jpeg"
					id="avatar-input"
					className="hidden"
					onChange={handleSelectedAvatarChange}
				/>
				{selectedAvatar && (
					<>
						<button
							className="btn btn-primary"
							onClick={() => handleAvatarValidate()}
						>
							Valider
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ChangeAvatar;
