import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import InventoryList from "./pages/inventory-list/InventoryList";
import ProductCreation from "./pages/product-creation/ProductCreation";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<InventoryList/>}/>
				<Route path="/inventory" element={<InventoryList/>}/>
				<Route path="/product" element={<ProductCreation/>}/>
			</Routes>
		</Router>
	);
};

export default App;
