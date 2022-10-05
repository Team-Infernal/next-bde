import cn from "classnames";
import { MutableRefObject, useRef } from "react";

type Props = {
	title: string;
	type: "text" | "select" | "datetime";
	required?: boolean;
	options?: Option[];
};

const InputRow = ({ title, type, required = false, options }: Props) => {
	const ref = useRef(null);

	return (
		<div className="px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			<dt
				className={cn("text-sm font-medium text-gray-500 my-auto", {
					required: required,
				})}
			>
				{title}
			</dt>
			<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
				{type === "text" ? (
					<TextInput ref={ref} />
				) : type === "select" ? (
					<SelectInput
						ref={ref}
						options={options}
					/>
				) : (
					<DateInput ref={ref} />
				)}
			</dd>
		</div>
	);
};

const TextInput = ({ ref }: Input) => {
	return (
		<input
			className="input input-primary w-full"
			type="text"
			ref={ref}
		/>
	);
};

const SelectInput = ({ ref, options = [] }: SelectInput) => {
	return (
		<select
			className="select select-primary w-full"
			ref={ref}
		>
			{options.map(option => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.displayValue}
				</option>
			))}
		</select>
	);
};

const DateInput = ({ ref }: Input) => {
	return <div></div>;
};

export default InputRow;

type Input = {
	ref: MutableRefObject<any>;
};

interface SelectInput extends Input {
	options: Option[] | undefined;
}

type Option = {
	value: string | number;
	displayValue: string;
};
