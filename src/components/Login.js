import React, { useState, useEffect } from "react";
import { logoUrlDark } from "../globalData";
import { Link, useHistory } from "react-router-dom";
import "./css/Login.css";
import { auth } from "../firebase";

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const login = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((err) => alert(err.message));
	};

	useEffect(() => {
		document.title = "Amazon | Login";
	}, []);

	return (
		<>
			<div className='loginPage'>
				<Link to='/' className='logo'>
					<img src={logoUrlDark} alt='Website Logo' />
				</Link>
				<hr />
				<div className='container mx-auto'>
					<h2 className='signInHeading mx-auto'>Login</h2>
					<form action='/login' method='post' className='loginForm mx-auto'>
						<input
							type='text'
							value={email}
							name='Email'
							id='email'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							value={password}
							name='Password'
							id='password'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='submit' value='Submit' id='submit' onClick={login}>
							Submit
						</button>
						<Link to='/register' className='register'>
							Create your account now
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
