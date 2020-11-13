import {
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

const Navbar = () => {
	const [{ basket, user }] = useStateValue();
	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
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
			<div className='header'>
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
								Hello {!user && "Guest"} <br /> {user && user?.email}
							</span>
							<span className='headerOptionLineTwo'>
								{user ? "Sign Out" : "Login"}
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
					<Link to='/checkout' className='cartHeaderOption headerOption button'>
						<ShoppingCartRounded className='cartIcon' />
						<div className='cartItemNumber'>{basket?.length}</div>
					</Link>
					<div className='mobMenuToggler button'>
						<MenuRounded className='menuToggler' />
					</div>
				</div>
			</div>

			<div className='header headerMob'>
				<div
					className={`mobMenuTogglerSB button ${
						show && "mobMenuTogglerSBshow"
					}`}
				>
					<MenuRounded className='menuToggler' />
				</div>
				<input type='text' name='Search...' className='headerSearchInputMob' />
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
		</>
	);
};

export default Navbar;
