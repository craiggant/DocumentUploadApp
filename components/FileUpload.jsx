import React from 'react';
import { Form } from 'react-bootstrap';
import { useSpring, a } from 'react-spring';
import styles from '../styles/FileUpload.module.css';

const FileUpload = ({
	handleFileAddition,
	isDragOver,
	setIsDragOver,
	onDragOver,
	onDragLeave,
	isHover,
	onHover,
	onHoverEnd,
}) => {
	const scaleAnimation = useSpring({
		transform: isDragOver
			? `scale(1.08)`
			: isHover
			? `scale(1.08)`
			: `scale(1)`,
		config: {
			friction: 16,
		},
	});

	return (
		<a.div
			className={styles.container}
			style={scaleAnimation}
			onMouseEnter={onHover}
			onMouseLeave={onHoverEnd}
		>
			<div
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={handleFileAddition}
				onChange={handleFileAddition}
			>
				<Form.Group controlId="formFileMultiple">
					<Form.Label className={styles.label}>
						Click or Drop Files Here To Upload
					</Form.Label>
					<Form.Control
						type="file"
						multiple
						className={styles.hidden}
					/>
				</Form.Group>
			</div>
		</a.div>
	);
};

export default FileUpload;
