import React from 'react';
import { Form } from 'react-bootstrap';
import style from '../styles/DocumentUploadBaseForm.module.css';

const DocumentUploadBaseForm = ({
	selectOptions = [],
	handleChange,
	formInput,
}) => {
	return (
		<div className={style.formContainer}>
			<Form.Group className="m-1" controlId="formUserId">
				<Form.Label>User Id</Form.Label>
				<Form.Control
					type="text"
					placeholder="1234567"
					name="userId"
					value={formInput.userId}
					onChange={handleChange}
					required
				/>
			</Form.Group>
			<Form.Group className="m-1" controlId="formSelectUploadReason">
				<Form.Label>Reason For Upload</Form.Label>
				<Form.Select
					name="reason"
					value={formInput.reason}
					onChange={handleChange}
					required
				>
					{selectOptions.map((option, index) => (
						<option key={index}>{option}</option>
					))}
				</Form.Select>
			</Form.Group>
			<Form.Group className="m-1" controlId="formFirstName">
				<Form.Label>First name</Form.Label>
				<Form.Control
					type="text"
					placeholder="John"
					name="fName"
					value={formInput.fName}
					onChange={handleChange}
					required
				/>
			</Form.Group>
			<Form.Group className="m-1" controlId="formLastName">
				<Form.Label>Last name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Doe"
					name="lName"
					value={formInput.lName}
					onChange={handleChange}
					required
				/>
			</Form.Group>
		</div>
	);
};

export default DocumentUploadBaseForm;
