import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {getInventory, getProducts, addInventoryItem} from '../../services/api';
import styles from './InventoryList.module.scss';

interface Product {
	name: string;
}

interface InventoryItem {
	name: string;
	quantity: number;
}

const InventoryList: React.FC = () => {
	const [inventory, setInventory] = useState<InventoryItem[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [productName, setProductName] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(0);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const inventoryData: InventoryItem[] = await getInventory();
			const productsData: Product[] = await getProducts();
			setInventory(inventoryData);
			setProducts(productsData);
		};
		fetchData();
	}, []);
	
	const handleAdd = useCallback(async () => {
		if (productName && quantity > 0) {
			const newItem: InventoryItem = {name: productName, quantity};
			await addInventoryItem(productName, quantity);
			setInventory((prevInventory) => [...prevInventory, newItem]);
			setProductName('');
			setQuantity(0);
		}
	}, [productName, quantity]);
	
	const handleGoToProducts = () => {
		navigate(`/product`);
	}
	
	const handleRemove = useCallback((itemName: string) => {
		setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
	}, [])
	
	return (
		<div className={styles.container}>
			<button
				className={styles.navigateButton}
				onClick={handleGoToProducts}
			>
				Manage products
			</button>
			<h2>Inventory List</h2>
			<div>
				<select
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className={styles.select}
				>
					<option value="">Select Product</option>
					{products.map((product) => (
						<option key={product.name} value={product.name}>{product.name}</option>
					))}
				</select>
				<input
					className={styles.quantity}
					type="number"
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
				/>
				<button
					className={styles.addButton}
					onClick={handleAdd}
				>
					Add
				</button>
			</div>
			<ul className={styles.list}>
				{inventory.map((item) => (
					<li className={styles.listItem} key={item.name}>
						{item.name} - {item.quantity}
						<button
							className={styles.removeButton}
							onClick={() => handleRemove(item.name)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default InventoryList;
