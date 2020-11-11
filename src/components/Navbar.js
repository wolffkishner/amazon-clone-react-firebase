import {
	MenuRounded,
	SearchRounded,
	ShoppingCartRounded,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./css/Navbar.css";

const Navbar = () => {
	const [{ basket }] = useStateValue();

	const [show, handleShow] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 60) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener("scroll");
		};
	}, []);

	return (
		<>
			<div className='header'>
				<Link to='/'>
					<img
						src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
						alt='Amazon Logo'
						className='headerLogo'
					/>
				</Link>
				<div className='headerSearch'>
					<input type='text' name='Search...' className='headerSearchInput' />
					<button className='headerSearchIcon'>
						<SearchRounded />
					</button>
				</div>
				<div className='headerNav'>
					<Link to='/login' className='headerOption button'>
						<span className='headerOptionLineOne'>Hello</span>
						<span className='headerOptionLineTwo'>Login</span>
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
