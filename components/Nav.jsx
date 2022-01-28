import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { resetUser } from '../store/userSlice';
import style from '../styles/Nav.module.css';

const Nav = ({ navLinks = [], title = '' }) => {
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const router = useRouter();

	const handleClick = (linkText) => {
		if (linkText === 'Log Out') {
			dispatch(resetUser());
			router.push('/login');
		}
	};

	const navAnimation = useSpring({
		width: isOpen ? `18.75rem` : `5rem`,
		config: {
			friction: 16,
		},
	});

	const textAnimation = useSpring({
		opacity: isOpen ? 1 : 0,
		display: isOpen ? `inline-block` : `none`,
	});

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
					<FontAwesomeIcon icon={faChevronCircleUp} />
					<animated.h3 style={textAnimation}>{title}</animated.h3>
				</div>
				<hr className={style.separator} />
				{navLinks.map((link, index) => (
					<Link href={link.link} key={index}>
						<a onClick={() => handleClick(link.text)}>
							<FontAwesomeIcon size="sm" icon={link.icon} />
							<animated.span style={textAnimation}>
								{link.text}
							</animated.span>
						</a>
					</Link>
				))}
			</nav>
		</animated.div>
	);
};

export default Nav;
