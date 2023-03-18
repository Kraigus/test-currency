import { Input } from "shared/ui/Input/Input";
import { memo } from "react";

interface InputPairProps {
	className?: string;
}
export const InputPair = memo((props: InputPairProps) => {
	
	return (
		<div>
			<Input />
            <Input />
		</div>
	);
});
