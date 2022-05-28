import React, { useState, useEffect } from 'react';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	Tabs,
	Tab,
	TextField,
	Fade,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
// styles
import useStyles from './styles';

// logo
// import logo from './logo.svg';
import logo from './trans-logo.png';
import google from '../../images/google.svg';
import { getAllowed } from './allowed';

// context
import { useUserDispatch, loginUser } from '../../context/UserContext';

function Login(props) {
	var classes = useStyles();

	// global
	var userDispatch = useUserDispatch();
	const dispatch = useDispatch();

	// local
	var [isLoading, setIsLoading] = useState(false);
	var [error, setError] = useState(null);
	var [activeTabId, setActiveTabId] = useState(0);
	var [nameValue, setNameValue] = useState('');
	var [loginValue, setLoginValue] = useState('');
	var [passwordValue, setPasswordValue] = useState('');
	const [allowed, setallowed] = useState([])

	useEffect(() => {
		getAllowed()
	}, [])

	const getAllowed = async () => {
		let { data } = await axios.get('/api/admin/getAllowedList');
		setallowed(data.data)
	}
	const responseGoogle = (res) => {
		debugger
		console.log(res)
		if (allowed.some((admins) => admins.email === res.profileObj.email)) {
			let token = res.tokenId;
			dispatch(
				loginUser(
					userDispatch,
					res.profileObj.email,
					'password',
					token,
					props.history,
					setIsLoading,
					setError
				)
			);
		} else {
			toast.error('Invalid credentials');
		}
	};

	return (
		<Grid container className={classes.container}>
			<div className={classes.logotypeContainer}>
				<img src={logo} alt='logo' className={classes.logotypeImage} />
				<Typography className={classes.logotypeText}>
					Aacharya Admin Panel
				</Typography>
			</div>
			<div className={classes.formContainer}>
				<div className={classes.form}>
					<Tabs
						value={activeTabId}
						onChange={(e, id) => setActiveTabId(id)}
						indicatorColor='primary'
						textColor='primary'
						centered
					>
						<Tab label='Login' classes={{ root: classes.tab }} />
						{/* <Tab label='New User' classes={{ root: classes.tab }} /> */}
					</Tabs>
					{activeTabId === 0 && (
						<React.Fragment>
							<Typography variant='h3' className={classes.greeting}>
								Good Morning, User
							</Typography>
							<GoogleLogin
								className={classes.googleButton}
								clientId='5659594942-3u1g6ev1luk9e841lp3jk3l3pkgpbn6a.apps.googleusercontent.com'
								buttonText='Sign in with Google'
								onSuccess={(res) => responseGoogle(res)}
								onFailure={(res) => responseGoogle(res)}
								cookiePolicy={'single_host_origin'}
							/>
							{/* <Button
								size='large'
								className={classes.googleButton}
								onClick={() =>
									loginUser(
										userDispatch,
										googleLoginValue,
										googlePasswordValue,
										props.history,
										setIsLoading,
										setError
									)
								}
							>
								<img src={google} alt='google' className={classes.googleIcon} />
								&nbsp;Sign in with Google
							</Button> */}
							{/* <div className={classes.formDividerContainer}>
								<div className={classes.formDivider} />
								<Typography className={classes.formDividerWord}>or</Typography>
								<div className={classes.formDivider} />
							</div> */}
							<Fade in={error}>
								<Typography color='secondary' className={classes.errorMessage}>
									Something is wrong with your login or password :(
								</Typography>
							</Fade>
							{/* <TextField
								id='email'
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={loginValue}
								onChange={(e) => setLoginValue(e.target.value)}
								margin='normal'
								placeholder='Email Adress'
								type='email'
								fullWidth
							/>
							<TextField
								id='password'
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={(e) => setPasswordValue(e.target.value)}
								margin='normal'
								placeholder='Password'
								type='password'
								fullWidth
							/> */}
							{/* <div className={classes.formButtons}>
								{isLoading ? (
									<CircularProgress size={26} className={classes.loginLoader} />
								) : (
									<Button
										disabled={
											loginValue.length === 0 || passwordValue.length === 0
										}
										onClick={() =>
											loginUser(
												userDispatch,
												loginValue,
												passwordValue,
												'token123456',
												props.history,
												setIsLoading,
												setError
											)
										}
										variant='contained'
										color='primary'
										size='large'
									>
										Login
									</Button>
								)}
								<Button
									color='primary'
									size='large'
									className={classes.forgetButton}
								>
									Forget Password
								</Button>
							</div> */}
						</React.Fragment>
					)}
					{activeTabId === 1 && (
						<React.Fragment>
							{/* <Typography variant='h1' className={classes.greeting}>
								Welcome!
							</Typography>
							<Typography variant='h2' className={classes.subGreeting}>
								Create your account
							</Typography>
							<Fade in={error}>
								<Typography color='secondary' className={classes.errorMessage}>
									Something is wrong with your login or password :(
								</Typography>
							</Fade>
							<TextField
								id='name'
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={nameValue}
								onChange={(e) => setNameValue(e.target.value)}
								margin='normal'
								placeholder='Full Name'
								type='email'
								fullWidth
							/>
							<TextField
								id='email'
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={loginValue}
								onChange={(e) => setLoginValue(e.target.value)}
								margin='normal'
								placeholder='Email Adress'
								type='email'
								fullWidth
							/>
							<TextField
								id='password'
								InputProps={{
									classes: {
										underline: classes.textFieldUnderline,
										input: classes.textField,
									},
								}}
								value={passwordValue}
								onChange={(e) => setPasswordValue(e.target.value)}
								margin='normal'
								placeholder='Password'
								type='password'
								fullWidth
							/>
							<div className={classes.creatingButtonContainer}>
								{isLoading ? (
									<CircularProgress size={26} />
								) : (
									<Button
										onClick={() =>
											loginUser(
												userDispatch,
												loginValue,
												passwordValue,
												props.history,
												setIsLoading,
												setError
											)
										}
										disabled={
											loginValue.length === 0 ||
											passwordValue.length === 0 ||
											nameValue.length === 0
										}
										size='large'
										variant='contained'
										color='primary'
										fullWidth
										className={classes.createAccountButton}
									>
										Create your account
									</Button>
								)}
							</div>
							<div className={classes.formDividerContainer}>
								<div className={classes.formDivider} />
								<Typography className={classes.formDividerWord}>or</Typography>
								<div className={classes.formDivider} />
							</div>
							<GoogleLogin
								className={classnames(
									classes.googleButton,
									classes.googleButtonCreating
								)}
								clientId='459881677402-krralv3pfugc1urqmouctejt8ti5ampo.apps.googleusercontent.com'
								buttonText='Sign in with Google'
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={'single_host_origin'}
							/>
							 <Button
								size='large'
								className={classnames(
									classes.googleButton,
									classes.googleButtonCreating
								)}
							>
								<img src={google} alt='google' className={classes.googleIcon} />
								&nbsp;Sign in with Google
							</Button> */}
						</React.Fragment>
					)}
				</div>
				<Typography color='primary' className={classes.copyright}>
					© 2014-2019 Aacharya.net, All rights reserved.
				</Typography>
			</div>
		</Grid>
	);
}

export default withRouter(Login);
