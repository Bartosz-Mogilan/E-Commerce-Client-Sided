import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Product from '../components/Product';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    set [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading (true);
        fetch(`http://localhost:5000/api/products/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            return response.json();
        })
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            setError(err.message);
            setLoading(false);
        });
        }, [id]);

        const handleAddToCart = () => {
            fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: id, quantity: 1 })
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to add product to cart.');
                }
                return response.json();
            })
            .then(data => {
                setMessage('Product added to cart');
                navigate('/cart');
            })
            .catch(err => {
                console.error('Add to cart error:', err);
                setMessage('Error adding product to cart');
            })
        };

        if(loading) {
            return <div>Loading product details....</div>
        }

        if(error) {
            return <div>Error: {error}</div>;
        }
        
        if(!product) {
            return <div>Loading product details...</div>;
        }
        
        return (
        <div style={styles.container}>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} style={styles.image} />
            <p>{product.description}</p>
            <p style={styles.price}>Price: ${product.price}</p>
            <button onClick={handleAddToCart} style={styles.button}>
                Add to Cart
            </button>
            {message && <p>{message}</p>}
        </div>
        );
    };

const styles = {
    container: {
      padding: '2rem',
      textAlign: 'center'
    },
    image: {
      maxWidth: '400px',
      width: '100%',
      borderRadius: '8px',
      margin: '1rem 0'
    },
    price: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    button: {
      padding: '0.8rem 1.2rem',
      fontSize: '1rem',
      cursor: 'pointer'
    }
  };

  export default ProductDetails;