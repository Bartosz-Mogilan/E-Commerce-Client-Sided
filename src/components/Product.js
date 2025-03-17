import React from "react";
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div className="product-card" style={styles.card}>
            <Link to={`/products/${product.id || product._id}`} style={styles.link}>
                <img src={product.imageUrl} alt={product.name} style={styles.image} />
                <h2 style={styles.title}>{product.name}</h2>
                <p style={styles.description}>{product.description}</p>
            </Link>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '4px',
    },
    title: {
        margin: '0.5rem 0',
    },
    description: {
        fontSize: '0.9rem',
        color: '#555',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
};

export default Product;

