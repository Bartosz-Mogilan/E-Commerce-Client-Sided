import React from "react";
import ProductList from "../components/ProductList";

function Products() {
    return (
        <div style={styles.container}>
            <h1>Our Products</h1>
            <ProductList />
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
    },
};

export default Products;
