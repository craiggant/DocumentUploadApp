import '../styles/globals.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import { store } from '../app/store';
import LoginRedirect from '../components/LoginRedirect';

function MyApp({ Component, pageProps }) {
	const { user } = store.getState();

	// if user not logged in, return only logIn or login help pages
	if (pageProps.protected && user.status !== 'loggedIn') {
		return (
			<Provider store={store}>
				<Layout title="Craig's App">
					<LoginRedirect />
				</Layout>
			</Provider>
		);
	}

	// return all other pages
	return (
		<Provider store={store}>
			<Layout title="Craig's App">
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
