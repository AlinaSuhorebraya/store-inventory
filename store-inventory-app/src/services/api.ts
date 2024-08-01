import axios from 'axios';

const API_URL = 'http://184.73.145.4:8085';

const handleApiError = (error: any) => {
	if (axios.isAxiosError(error)) {
		console.error('API Error:', error.response?.data?.error );
		return { error: error.response?.data || error.message };
	} else {
		console.error('Unexpected Error:', error);
		return { error: 'Unexpected error occurred' };
	}
};

export const getProducts = async () => {
	try {
		const response = await axios.get(`${API_URL}/product/all`);
		return response.data;
	} catch (error) {
		return handleApiError(error);
	}
};

export const addProduct = async (name: string) => {
		const response = await axios.put(`${API_URL}/product`, { name });
		return response.data;
};

export const getInventory = async () => {
	try {
		const response = await axios.get(`${API_URL}/inventory`);
		return response.data;
	} catch (error) {
		return handleApiError(error);
	}
};

export const addInventoryItem = async (name: string, quantity: number) => {
	try {
		const response = await axios.post(`${API_URL}/inventory`, [{ name, quantity }]);
		return response.data;
	} catch (error) {
		return handleApiError(error);
	}
};
