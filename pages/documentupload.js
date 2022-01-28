import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import FileUpload from '../components/FileUpload';
import DocumentUploadBaseForm from '../components/DocumentUploadBaseForm';
import ErrorToast from '../components/ErrorToast';
import { handleFileList } from '../helper/handleFiles';
import style from '../styles/DocumentUpload.module.css';
import useDragAndDrop from '../hooks/DragAndDrop';
import useHover from '../hooks/FileUploadHover';

const initialFileState = {
	validFiles: [],
	invalidFiles: [],
	errorMessages: new Set(),
};

const initialFormState = {
	userId: '',
	reason: '',
	fName: '',
	lName: '',
};

const documentUpload = () => {
	const [showErrorToast, setShowErrorToast] = useState(false);
	const [formInput, setFormInput] = useState(initialFormState);
	const [files, setFiles] = useState(initialFileState);

	const { isDragOver, setIsDragOver, onDragOver, onDragLeave } =
		useDragAndDrop();

	const { isHover, onHover, onHoverEnd } = useHover();

	const handleSubmit = (e) => {
		e.preventDefault();
		// set error to false, so any new error will
		setShowErrorToast(false);
		// more form validation here in a production setting
		// ajax call to wherever you're submitting these files would go here
		// show user feedback if something goes wrong
		//reset form
		setFiles(initialFileState);
		setFormInput(initialFormState);
	};

	const acceptableFileTypes = ['pdf', 'png'];

	const placeholderOptions = ['', 'Reason One', 'Reason Two'];

	const maxFileSize = 2000000;

	const handleFileAddition = (e) => {
		e.preventDefault();
		setIsDragOver(false);
		setShowErrorToast(false);
		// dataTransfer exists on the drop even, while target is for a click event
		const selected = e?.dataTransfer?.files || e?.target?.files;
		const { validFiles, invalidFiles, errorMessages } = handleFileList(
			acceptableFileTypes,
			maxFileSize,
			selected,
			files
		);
		setFiles({ ...files, validFiles, invalidFiles, errorMessages });
		errorMessages.size && setShowErrorToast(true);
	};

	const resetForm = () => {
		setFiles(initialFileState);
		setFormInput(initialFormState);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormInput({ ...formInput, [name]: value });
	};

	// add return to 'Sorry you don't have access to this page. return to login?
	return (
		<Container className={style.container}>
			{showErrorToast && (
				<ErrorToast
					items={files.invalidFiles}
					errorMessages={files.errorMessages}
					show={showErrorToast}
					setShowErrorToast={setShowErrorToast}
				/>
			)}
			<h1>Document Upload</h1>
			<Form onSubmit={handleSubmit}>
				<div>
					<h5>Upload Parameters</h5>
					<p>
						*Please note: the only acceptable file types are .pdf
						and .png
					</p>
					<DocumentUploadBaseForm
						selectOptions={placeholderOptions}
						handleChange={handleChange}
						formInput={formInput}
					/>
				</div>
				<div>
					<h5>Files To Upload:</h5>

					<ul>
						{files.validFiles.map((file, index) => (
							<li key={index}>{file.name}</li>
						))}
					</ul>
					<FileUpload
						handleFileAddition={handleFileAddition}
						isDragOver={isDragOver}
						setIsDragOver={setIsDragOver}
						onDragOver={onDragOver}
						onDragLeave={onDragLeave}
						isHover={isHover}
						onHover={onHover}
						onHoverEnd={onHoverEnd}
					/>
					<div className={style.buttonContainer}>
						<Button
							type="submit"
							className={style.submitBtn}
							size={'lg'}
						>
							Submit
						</Button>
						<Button
							className={style.resetBtn}
							onClick={resetForm}
							size={'lg'}
						>
							Reset
						</Button>
					</div>
				</div>
			</Form>
		</Container>
	);
};

export async function getStaticProps(context) {
	return {
		props: {
			protected: true,
		},
	};
}

export default documentUpload;
