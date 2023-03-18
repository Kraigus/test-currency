import React, {
	InputHTMLAttributes,
	memo,
	useRef,
	useState,
	useEffect,
} from 'react';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
	const ref = useRef<HTMLInputElement>(null);
	const { value, type = 'number', placeholder = 'Введите число' } = props;
	const [state, setState] = useState(value);
	const [disabled, setDisabled] = useState(true);

	const formatInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		let s = '',
			temp,
			num = e.target.value.toString().split('.'),
			n = num[0];
		while (n.length > 3) {
			temp = n.substring(n.length - 3);
			s = ',' + temp + s;
			n = n.slice(0, -3);
		}
		if (n) s = n + s;
		if (num[1]) s += '.' + num[1];
		setState(s);
	};

	const onClick = () => {
		setDisabled(false);
	};

	const onBlur = () => {
		setDisabled(true);
	};
	
	useEffect(() => {
		if (disabled === false) {
			ref.current.focus();
		}
	}, [disabled]);

	return (
		<div onClick={onClick}>
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={formatInputValue}
				placeholder={placeholder}
				disabled={disabled}
				onBlur={onBlur}
			/>
			<span>{state}</span>
		</div>
	);
});
