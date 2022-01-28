import { useEffect, useState } from 'react';

/**
 * Checks for window resize to know if app should render out a browser friendly view or a mobile one
 */

export default function useCheckWindowSize() {
	const [width, setWidth] = useState(global.window?.innerWidth);
	const [isMobile, setIsMobile] = useState(false);

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	useEffect(() => {
		setIsMobile(width <= 768 ? true : false);
	}, [width]);

	return { isMobile };
}
