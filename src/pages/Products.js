import React from "react";
import ProductList from "../components/ProductList";

function Products() {
    return (
        <div style={styles.container}>
            <h1>Our Products</h1>
            <input 
                type="text" 
                placeholder="Search for a product..." 
                style={styles.searchBar} 
            />
            <div style={styles.productListContainer}>
                <ProductList />
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
    },
    productListContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1rem',
    },
    searchBar: {
        padding: '0.5rem',
        fontSize: '1rem',
        marginBottom: '1rem',
        width: '80%',
    },
};

export default Products;

