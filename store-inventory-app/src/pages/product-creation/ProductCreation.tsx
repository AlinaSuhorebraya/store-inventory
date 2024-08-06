import React, {useState, useCallback, FormEvent} from 'react';
import {addProduct} from '../../services/api';
import {useNavigate} from 'react-router-dom';
import styles from './ProductCreation.module.scss';

const ProductCreation: React.FC = () => {
	const [productName, setProductName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [info, setInfo] = useState<string | null>(null);
	const navigate = useNavigate();
	
	const handleAddProduct = useCallback(async () => {
		setInfo(null);
		setLoading(true);
		
		if (productName.trim() === '') {
			setInfo('Product name cannot be empty');
			setLoading(false);
			return;
		}
		try {
			await addProduct(productName);
			setInfo('Product added successfully');
			setProductName('');
		} catch (err: any) {
			setInfo(err.response.data.error);
		} finally {
			setLoading(false);
		}
	}, [productName]);
	
	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);
	
	const handleFormSubmit = (e: FormEvent)=>{
		e.preventDefault();
		handleAddProduct();
	}
	
	return (
		<div className={styles.container}>
			<button
				className={styles.navigateButton}
				onClick={handleBack}
				disabled={loading}
			>
				Go back
			</button>
			<h2>Create New Product</h2>
			<form onSubmit={handleFormSubmit}>
				<div className={styles.inputGroup}>
					<label htmlFor="productName" className={styles.label}>Product Name:</label>
					<input
						id="productName"
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						placeholder="Enter product name"
						className={styles.productName}
						disabled={loading}
					/>
				</div>
				{info && <p className={styles.error}>{info}</p>}
				<button
					type="submit"
					onClick={handleAddProduct}
					className={styles.button}
					disabled={loading}
				>
					{loading ? 'Saving...' : 'Save'}
				</button>
			</form>
		</div>
	);
};

export default ProductCreation;
