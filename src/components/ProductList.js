import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error , setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }
    
    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='product-list' style={styles.list}>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map(product => (
                    <Product key={product.id || product._id} product={product} />
                ))
            )}
        </div>
    );
};

const styles = {
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
};

export default ProductList;

