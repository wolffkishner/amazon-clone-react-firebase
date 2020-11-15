import React, { useEffect } from "react";
import { loadPageFromTop, logoUrlDark } from "../globalData";
import { Link, useHistory } from "react-router-dom";
import "./css/Login.css";
import { auth, googleAuth } from "../firebase";

const Login = () => {
	const history = useHistory();

	const handleGoogleAuth = (e) => {
		e.preventDefault();
		auth
			.signInWithPopup(googleAuth)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((e) => alert(e.message));
	};

	useEffect(() => {
		document.title = "Amazon | Login";
		loadPageFromTop();
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
					<button onClick={handleGoogleAuth} className='googleLoginBtn'>
						Login with Google
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/471px-Google_%22G%22_Logo.svg.png'
							alt='Google Logo'
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
