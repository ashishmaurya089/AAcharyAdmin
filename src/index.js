import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import Themes from './themes';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { LayoutProvider } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import store from './store';
import { ToastContainer } from 'react-toastify';
import './globalStyles.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
	<LayoutProvider>
		<UserProvider>
			<ThemeProvider theme={Themes.default}>
				<Provider store={store}>
					<CssBaseline />
					<ToastContainer />
					<App />
				</Provider>
			</ThemeProvider>
		</UserProvider>
	</LayoutProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
