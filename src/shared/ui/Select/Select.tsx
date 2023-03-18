import { memo, SelectHTMLAttributes, useRef, useState, useEffect } from 'react';

type HTMLSelectProps = Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	'value' | 'onChange'
>;

interface SelectProps extends HTMLSelectProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	data: any;
}

export const Select = memo((props: SelectProps) => {
	const ref = useRef<HTMLSelectElement>(null);
	const { value, placeholder, data } = props;
	const [state, setState] = useState(value);

	const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setState(e.target.value);
	};

	return (
		<div>
			<select
				defaultValue={state}
				ref={ref}
				placeholder={placeholder}
				value={value}
				onChange={onChangeHandler}
			>
				{Object.entries(data).map((el) => {
					return (
						<option key={el[0]} value={el[1].toString()}>
							{el[0] + ' ' + el[1].toString()}
						</option>
					);
				})}
			</select>
		</div>
	);
});
