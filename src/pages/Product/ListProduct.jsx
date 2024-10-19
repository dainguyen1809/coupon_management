import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import SearchContext from '../../context/SearchContext';
import logo from '../../assets/react.svg';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/v1/products'
        );
        setProducts(response.data.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/details/${id}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!filteredProducts.length) return <div>No products available.</div>;

  return (
    <div className='flex flex-wrap'>
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className='m-auto'
          onClick={() => handleProductClick(product._id)}
        >
          <div className='m-2 cursor-pointer'>
            <img src={logo} alt={product.name} className='w-full' />
            <h3>
              <strong>Product Name: </strong>
              {product.name}
            </h3>
            <p>Description: {product.previewDescription}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p className='flex items-center'>
              <strong>Created by: </strong>
              <img
                src={product.createdBy.avatarUrl}
                className='w-10 rounded-full mx-2'
                alt=''
              />{' '}
              {product.createdBy.fullName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
