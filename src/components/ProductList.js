import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error , setError] = useState(null);

    useEffect(() => {
        fetch('hhtp://localhost:500/api/products')
        .then(response => {
            if(!response) {
                throw new Error('Failed to fetch products.');
            }
            return response.json();
        })
        .then(data => {
            setProducts(data);
        })
        .catch(err => {
            console.error('Error fetching product', err);
            setError(err.message);
        });
    }, []);

    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='product-list' style={styles.list}>
            {products.length === 0 ? (
                <p>No product available.</p>
            ) : (
                products.map(product => (
                    <Product key={product.id} product={product} />
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