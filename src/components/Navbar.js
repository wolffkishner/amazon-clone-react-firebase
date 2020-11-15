import {
	CloseRounded,
	MenuRounded,
	SearchRounded,
	ShoppingCartRounded,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { logoUrl } from "../globalData";
import { useStateValue } from "../StateProvider";
import "./css/Navbar.css";
import "./css/sideMenu.css";

const Navbar = () => {
	const [{ basket, user }] = useStateValue();
	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
	};

	const [openNav, setOpenNav] = useState(true);
	const toggleNavOpen = () => {
		setOpenNav(false);
	};
	const toggleNavClose = () => {
		setOpenNav(true);
	};

	const [show, handleShow] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 60) {
				handleShow(true);
			} else {
				handleShow(false);
			}
		});
		return () => {
			window.removeEventListener("scroll", handleShow);
		};
	}, []);

	return (
		<>
			<div className='navbar'>
				<div className={openNav ? "sideMenu" : "sideMenu sideNavShow"}>
					<CloseRounded className='closeIcon' onClick={toggleNavClose} />
					<div className='userInfo'>
						{user && <img src={user.photoURL} alt='user.displayName' />}
						<div className='innerUi'>
							<h3 className='lineOne'>
								{user ? "Hi, " : "Hello"}
								{user ? user.displayName || user.email : " Guest"}
							</h3>
							<div className='lineTwo'>
								<Link to={!user && "/login"} className='loginLink'>
									<div onClick={handleAuth}>
										{user ? "Sign Out" : "Sign In"}
									</div>
								</Link>
							</div>
						</div>
					</div>
					<hr className='menuDivider' />
					<div className='navMenu'>
						<ul>
							<li>
								<Link onClick={toggleNavClose} to='/' className='menuLink'>
									Home
								</Link>
							</li>
							<li>
								<Link
									onClick={toggleNavClose}
									to='/checkout'
									className='menuLink'
								>
									Cart
								</Link>
							</li>
							{user ? (
								<>
									<li>
										<div
											onClick={(toggleNavClose, handleAuth)}
											className='menuLink'
										>
											Sign Out
										</div>
									</li>
								</>
							) : (
								<>
									<li>
										<Link
											onClick={toggleNavClose}
											to='/login'
											className='menuLink'
										>
											Sign In
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>

				<div className='header' style={{ position: "fixed", width: "100%" }}>
					<Link to='/'>
						<img src={logoUrl} alt='Amazon Logo' className='headerLogo' />
					</Link>
					<div className='headerSearch'>
						<input type='text' name='Search...' className='headerSearchInput' />
						<button className='headerSearchIcon'>
							<SearchRounded />
						</button>
					</div>
					<div className='headerNav'>
						<Link to={!user && "/login"} className='headerOption button'>
							<div className='authBtns' onClick={handleAuth}>
								<span className='headerOptionLineOne'>
									{user ? "Hi, " : "Hello"} {user ? user.displayName : ""}
								</span>
								<span className='headerOptionLineTwo'>
									{user ? "Logout" : "Login"}
								</span>
							</div>
						</Link>
						<div className='headerOption button'>
							<span className='headerOptionLineOne'>Returns &</span>
							<span className='headerOptionLineTwo'>Orders</span>
						</div>
						<div className='headerOption button'>
							<span className='headerOptionLineOne'>Your</span>
							<span className='headerOptionLineTwo'>Prime</span>
						</div>
						<Link
							to='/checkout'
							className='cartHeaderOption headerOption button'
						>
							<ShoppingCartRounded className='cartIcon' />
							<div className='cartItemNumber'>{basket?.length}</div>
						</Link>
						<div className='mobMenuToggler button' onClick={toggleNavOpen}>
							<MenuRounded className='menuToggler' />
						</div>
					</div>
				</div>

				<div className={`header headerMob ${show && `fixHeaderMob`}`}>
					<div
						className={`mobMenuTogglerSB button ${
							show && "mobMenuTogglerSBshow"
						}`}
						onClick={toggleNavOpen}
					>
						<MenuRounded className='menuToggler' />
					</div>
					<input
						type='text'
						name='Search...'
						className='headerSearchInputMob'
					/>
					<button className='headerSearchIconMob'>
						<SearchRounded />
					</button>
					<Link
						to='/checkout'
						className={`cartHeaderOptionSB button ${
							show && "cartHeaderOptionSBshow"
						}`}
					>
						<ShoppingCartRounded className='cartIcon' />
						<div className='cartItemNumber'>{basket?.length}</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
