import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ErrorToast = ({ items, errorMessages, show, setShowErrorToast }) => {
	const arrayOfErrors = Array.from(errorMessages.values());
	const handleClose = () => {
		setShowErrorToast(false);
	};
	return (
		<ToastContainer position="top-end" className="p-3">
			<Toast onClose={handleClose} show={show}>
				<Toast.Header style={{ background: '#fc0' }}>
					<strong className="me-auto" style={{ color: 'black' }}>
						Alert
					</strong>
				</Toast.Header>
				<Toast.Body>
					{items[0] ? (
						<>
							<p>
								The following file(s) were not staged for
								upload:
							</p>
							<ul>
								{items.map((item, index) => (
									<li key={index}>{item.name}</li>
								))}
							</ul>

							<p>The following guidelines must be followed:</p>

							<ul>
								{arrayOfErrors.map((err, index) => (
									<li key={index}>{err}</li>
								))}
							</ul>
						</>
					) : errorMessages.size ? (
						<ul>
							{arrayOfErrors.map((err, index) => (
								<li key={index}>{err}</li>
							))}
						</ul>
					) : (
						<></>
					)}
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default ErrorToast;
