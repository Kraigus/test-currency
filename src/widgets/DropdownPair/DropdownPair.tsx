import { Select } from 'shared/ui/Select/Select';
import { memo, useEffect, useState, useRef, MutableRefObject } from 'react';
import { $api } from 'shared/api/api';
import { setTimeout } from 'timers';
interface DropdownPairProps {
	className?: string;
}

const timer = 60000

export const DropdownPair = memo((props: DropdownPairProps) => {
	const [data, setData] = useState({});
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
	useEffect(() => {	
		const fetchCurrencyData = async () => {
			try {
				const response = await $api.get('');
				setData(response.data.rates);
			} catch (error) {
				alert(error);
			}
		};
        fetchCurrencyData()
		timerRef.current = setInterval(() => {
			fetchCurrencyData()
		}, timer);
        return () => clearInterval(timerRef.current);
	}, []);
	return (
		<div>
			<Select data={data} />
			<Select data={data} />
		</div>
	);
});
