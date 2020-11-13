import React, { useState, useEffect } from "react";
import { logoUrlDark } from "../globalData";
import { Link, useHistory } from "react-router-dom";
import "./css/Register.css";
import { auth } from "../firebase";

const Register = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const register = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				alert("An account for " + email + " has been created");
				if (auth) {
					history.push("/login");
				}
			})
			.catch((err) => alert(err.message));
	};
	useEffect(() => {
		document.title = "Amazon | Register";
	}, []);
	return (
		<>
			<div className='registerPage'>
				<Link to='/' className='logo'>
					<img src={logoUrlDark} alt='Website Logo' />
				</Link>
				<hr />
				<div className='container mx-auto'>
					<h2 className='registerHeading mx-auto'>Register</h2>
					<form className='registerForm mx-auto'>
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
						<button type='submit' value='Submit' id='submit' onClick={register}>
							Submit
						</button>
						<Link to='/login' className='login'>
							Login Now
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
