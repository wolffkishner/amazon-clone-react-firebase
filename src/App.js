import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import { useStateValue } from "./StateProvider";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
	const [{ basket }, dispatch] = useStateValue();
	const saveBasket = () => {
		localStorage.setItem("basket", JSON.stringify(basket));
	};
	const authState = () => {
		auth.onAuthStateChanged((authUser) => {
			console.log("This is the user >>> ", authUser);
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	};
	useEffect(() => {
		saveBasket();
	}, [basket]);

	useEffect(() => {
		authState();
	}, []);
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Navbar />
					<Home />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route exact path='/checkout'>
					<Navbar />
					<Checkout />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
