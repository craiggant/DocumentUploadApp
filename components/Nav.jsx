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
					<FontAwesomeIcon
						className={isOpen ? style.icon : ''}
						icon={faChevronCircleUp}
					/>
					<animated.h3 style={textAnimation}>{title}</animated.h3>
				</div>
				<hr className={style.separator} />
				{navLinks.map((link, index) => (
					<div
						className={!isOpen ? style.closedNav : undefined}
						key={index}
					>
						<Link href={link.link}>
							<a onClick={() => handleClick(link.text)}>
								<FontAwesomeIcon size="sm" icon={link.icon} />
								<animated.span style={textAnimation}>
									{link.text}
								</animated.span>
							</a>
						</Link>
					</div>
				))}
			</nav>
		</animated.div>
	);
};

export default Nav;
