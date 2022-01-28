import React, { useState } from 'react';

export default function useHover() {
	const [isHover, setIsHover] = useState(false);

	const onHover = () => setIsHover(true);

	const onHoverEnd = () => setIsHover(false);

	return {
		isHover,
		onHover,
		onHoverEnd,
	};
}
