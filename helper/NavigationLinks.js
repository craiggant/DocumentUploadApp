import {
	faFileUpload,
	faQuestionCircle,
	faSignInAlt,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

export const DefaultLinks = [
	{
		text: 'Login',
		caption: 'Login to the app',
		icon: faSignInAlt,
		link: '/login',
	},
	{
		text: 'Help',
		caption: 'Contact Us',
		icon: faQuestionCircle,
		link: '/loginhelp',
	},
];

export const UserLinks = [
	{
		text: 'Upload Files',
		caption: 'Upload Files',
		icon: faFileUpload,
		link: '/documentupload',
	},
	{
		text: 'Help',
		caption: 'Contact Us',
		icon: faQuestionCircle,
		link: '/help',
	},
	{
		text: 'Log Out',
		caption: 'Log Out',
		icon: faSignOutAlt,
		link: '/login',
	},
];
