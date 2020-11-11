import React from "react";
import "./css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";

const Subtotal = () => {
	const [{ basket }, dispatch] = useStateValue();
	return (
		<>
			<div className='subtotal'>
				<CurrencyFormat
					renderText={(value) => (
						<>
							<p className='mx-7'>
								Subtotal ({basket.length} items): <strong>{value}</strong>
							</p>
							<small className='subtotal__gift mx-7'>
								<input type='checkbox' /> This order contains a gift
							</small>
						</>
					)}
					decimalScale={2}
					value={getBasketTotal(basket)} // Part of the homework
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
				<button className='proceedToCheckout'>Proceed to checkout</button>
			</div>
		</>
	);
};

export default Subtotal;
