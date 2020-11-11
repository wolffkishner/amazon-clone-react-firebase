import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import { useStateValue } from "./StateProvider";

function App() {
	const [{ basket }] = useStateValue();
	const saveBasket = () => {
		localStorage.setItem("basket", JSON.stringify(basket));
	};
	useEffect(() => {
		saveBasket();
	}, [basket]);
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/login'>
					<h1>This is a login page</h1>
				</Route>
				<Route exact path='/checkout'>
					<Checkout />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
