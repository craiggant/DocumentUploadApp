import { useState } from 'react';

export default function useDragAndDrop() {
	const [isDragOver, setIsDragOver] = useState(false);

	const onDragOver = (e) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const onDragLeave = () => setIsDragOver(false);

	return {
		isDragOver,
		setIsDragOver,
		onDragOver,
		onDragLeave,
	};
}
