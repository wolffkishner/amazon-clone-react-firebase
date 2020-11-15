import React, { useState, useEffect } from "react";
import { loadPageFromTop } from "../globalData";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import "./css/Checkout.css";
import Subtotal from "./Subtotal";

const Checkout = () => {
	const [{ basket }, dispatch] = useStateValue();
	const [basketEmpty, setBasketEmpty] = useState(true);

	const emptyBasket = () => {
		dispatch({
			type: "EMPTY_BASKET",
		});
	};

	const setBasketFull = () => {
		const l = basket?.length;
		if (l) {
			setBasketEmpty(false);
		} else {
			setBasketEmpty(true);
		}
	};

	useEffect(() => {
		setBasketFull();
	}, [basket]);

	useEffect(() => {
		document.title = "Amazon | Checkout";
		loadPageFromTop();
	}, []);

	return (
		<>
			<div className='checkout'>
				<div className='checkoutLeft'>
					<img
						src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
						alt='Checkout Ad'
						className='checkoutAd'
					/>
					<h1 className='checkoutTitle'>Your shopping cart</h1>

					{basketEmpty ? (
						<></>
					) : (
						<button className='emptyBasket' onClick={emptyBasket}>
							Clear Cart
						</button>
					)}
					<hr />
					{basket.map((i) => (
						<CheckoutProduct
							id={i.id}
							title={i.title}
							rating={i.rating}
							price={i.price}
							image={i.image}
						/>
					))}
				</div>
				<div className='checkoutRight'>
					<Subtotal />
				</div>
			</div>
		</>
	);
};

export default Checkout;
