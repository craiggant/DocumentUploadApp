import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { getUser, selectUser } from '../store/userSlice';
import styles from '../styles/Login.module.css';

const defaultCredentials = {
	username: 'testuser',
	password: 'testpassword',
};

export const Home = () => {
	const [userCredentials, setUserCredentials] = useState(defaultCredentials);
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const router = useRouter();

	useEffect(() => {
		if (user.role === 'user') router.push('/documentupload');
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// in a real app you would need more validation here.
		dispatch(getUser(userCredentials));
	};

	const resetForm = () => {
		setUserCredentials({ username: '', password: '' });
	};

	return (
		<Container className="d-flex justify-content-center">
			<Row className={styles.container}>
				<Form onSubmit={handleSubmit}>
					<h1>Login</h1>
					<p>
						To log in to this sample application, you must use the
						username "testuser" and the password "testpassword".
					</p>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Username"
							name="username"
							value={userCredentials.username}
							onChange={handleChange}
							required
							autoComplete=""
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid username.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							name="password"
							value={userCredentials.password}
							onChange={handleChange}
							required
							autoComplete=""
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid password.
						</Form.Control.Feedback>
					</Form.Group>
					<div className={styles.buttonGroup}>
						<Button
							variant="primary"
							type="submit"
							className={styles.submitBtn}
							size={'lg'}
						>
							Submit
						</Button>
						<Button
							variant="outline-secondary"
							onClick={resetForm}
							className={styles.resetBtn}
							size={'lg'}
						>
							Reset
						</Button>
					</div>
				</Form>
			</Row>
		</Container>
	);
};

export default Home;
