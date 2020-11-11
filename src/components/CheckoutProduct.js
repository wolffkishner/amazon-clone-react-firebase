import React from "react";
import { useStateValue } from "../StateProvider";
import "./css/CheckoutProduct.css";

const CheckoutProduct = ({ id, image, title, price, rating }) => {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromCart = () => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};

	return (
		<>
			<div className='checkoutProduct'>
				<div className='cPImg mx-sm-auto'>
					<img src={image} alt={title} className='checkoutProductImage' />
				</div>
				<div className='checkoutProductInfo my-10'>
					<h2 className='checkoutProductTitle'>{title}</h2>
					<div className='checkoutProductPrice'>
						<small>$</small>
						<p>{price}</p>
					</div>
					<div className='checkoutProductRating'>
						{Array(rating)
							.fill()
							.map((_, i) => (
								<p>🌟</p>
							))}
					</div>
					<button
						className='removeFromCart mx-sm-auto'
						onClick={removeFromCart}
					>
						Remove from Cart
					</button>
				</div>
			</div>
		</>
	);
};

export default CheckoutProduct;
