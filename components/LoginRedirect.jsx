import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import style from '../styles/LoginRedirect.module.css';

const LoginRedirect = () => {
	return (
		<div className={style.container}>
			<h3 className={style.text}>
				Sorry, you don't have access to this page. Please login.
			</h3>
			<div className={style.link}>
				<Link href="/login">
					<Button className={style.submitBtn} size={'lg'}>
						Return To Login
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default LoginRedirect;
