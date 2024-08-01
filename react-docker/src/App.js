import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('http://localhost:5500/api/products');
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, []);

    async function addProduct(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const newProduct = { name, price };
            await axios.post('http://localhost:5500/api/products', newProduct);
            // After successfully adding the product, refetch the products
            const { data } = await axios.get('http://localhost:5500/api/products');
            setProducts(data);
            setName(''); // Clear the form fields
            setPrice('');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            <h1>My Products</h1>
            <form onSubmit={addProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            {products.map((product) => {
                return (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
