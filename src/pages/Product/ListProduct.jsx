import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/products');
                setProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/details/${id}`);
    };

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-wrap">
            {products.map((product) => (
                <div key={product._id} className="m-auto" onClick={() => handleProductClick(product._id)}>
                    <div className="m-2 cursor-pointer">
                        <img src={product.createdBy.avatarUrl} alt={product.name} className="w-full" />
                        <h3><strong>Product Name: </strong>{product.name}</h3>
                        <p>Description: {product.previewDescription}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Created by:</strong> {product.createdBy.fullName}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
