import React from 'react';
import { useSelector } from 'react-redux';
import { selectLinks } from '../store/userSlice';
import useCheckWindowSize from '../hooks/CheckWindowSize';
import MobileNav from './MobileNav';
import Head from 'next/head';
import Nav from './Nav';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const Layout = ({ children, title }) => {
	const { isMobile } = useCheckWindowSize();
	const links = useSelector(selectLinks);

	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isMobile ? (
				<MobileNav navLinks={links} />
			) : (
				<Nav navLinks={links} title={title} />
			)}
			{children}
		</div>
	);
};

export default Layout;
