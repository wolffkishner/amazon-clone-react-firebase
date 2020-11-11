import React from "react";
import { useStateValue } from "../StateProvider";
import "./css/Product.css";

const Product = ({ id, title, price, rating, image }) => {
	const [{ basket }, dispatch] = useStateValue();
	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				price: price,
				rating: rating,
				image: image,
			},
		});
	};
	return (
		<>
			<div className='product'>
				<div className='productContainer'>
					<h2 className='productTitle'>{title}</h2>
					<div className='productPrice'>
						<small>$</small>
						{price}
					</div>
					<div className='productRating'>
						{Array(rating)
							.fill()
							.map((_, i) => (
								<p>🌟</p>
							))}
					</div>
					<div className='productImage'>
						<img src={image} alt={title} />
					</div>
					<button onClick={addToBasket} className='addToCart button'>
						Add to Cart
					</button>
				</div>
			</div>
		</>
	);
};

export default Product;
