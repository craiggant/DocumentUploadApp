import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSpring, animated } from 'react-spring';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { resetUser } from '../store/userSlice';
import style from '../styles/MobileNav.module.css';

const MobileNav = ({ navLinks = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const navAnimation = useSpring({
		// width: isOpen ? `100vw` : `5rem`,
		height: isOpen ? `25rem` : `5rem`,
		config: {
			friction: 16,
		},
	});

	const handleClick = (linkText) => {
		if (linkText === 'Log Out') {
			dispatch(resetUser());
			router.push('/login');
		}
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<animated.div
			className={style.navWrapper}
			style={navAnimation}
			onMouseEnter={toggleOpen}
			onMouseLeave={toggleOpen}
		>
			<nav>
				<div className={style.title}>
					<span />
					<div className={style.fontAwes}>
						<FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
					</div>
					<span />
				</div>
				{isOpen && <hr className={style.separator} />}
				{navLinks.map((link, index) => (
					<Link href={link.link} key={index}>
						<a onClick={() => handleClick(link.text)}>
							<Button size="lg" className={style.mobileBtn}>
								{link.text}
							</Button>
						</a>
					</Link>
				))}
			</nav>
		</animated.div>
	);
};

export default MobileNav;
