import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import { useSelector, useDispatch } from 'react-redux';
import { selectLinks, selectUser, setUser } from '../store/userSlice';
import useCheckWindowSize from '../hooks/CheckWindowSize';
import MobileNav from './MobileNav';
import Nav from './Nav';

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
