import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import logo from '../../assets/react.svg';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [voucherError, setVoucherError] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/products/${id}`
        );
        setProduct(response.data.data);
        setFinalPrice(response.data.data.price);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/v1/vouchers'
        );
        setVouchers(
          response.data.data.filter(
            (voucher) => !voucher.isDeleted && voucher.status === 'active'
          )
        );
      } catch (err) {
        console.error('Failed to fetch vouchers:', err);
      }
    };

    fetchProduct();
    fetchVouchers();
  }, [id]);

  useEffect(() => {
    if (product) {
      setFinalPrice((product.price - discount) * quantity);
    }
  }, [quantity, discount, product]);

  const handleVoucherApply = () => {
    const validVoucher = vouchers.find(
      (voucher) => voucher.code === voucherCode || voucher.name === voucherCode
    );

    if (validVoucher) {
      const currentDate = new Date();
      const expiryDate = new Date(validVoucher.expiryDate);

      if (currentDate > expiryDate) {
        setVoucherError('Voucher has expired');
        setSelectedVoucher(null);
      } else {
        const discountAmount = validVoucher.discountAmount;
        setDiscount(discountAmount);
        setFinalPrice((product.price - discountAmount) * quantity); // Cập nhật giá cuối
        setSelectedVoucher(validVoucher);
        alert(`Voucher applied! You saved $${discountAmount.toFixed(2)}`);
        setVoucherError('');
      }
    } else {
      setVoucherError('Invalid voucher code');
      setSelectedVoucher(null);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleBuyNow = async () => {
    const orderData = {
      quantity,
      orderedBy: {
        _id: '10166700-def7-4fa9-866a-658ced232c15',
      },
      products: [product],
      voucher: selectedVoucher ? selectedVoucher._id : '',
    };

    console.log('Order data being sent:', orderData);
    console.log('Voucher being sent:', selectedVoucher?._id);

    try {
      const response = await fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        alert('Error saving order: ' + result.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='p-6'>
          <h2 className='text-3xl font-bold mb-6'>{product.name}</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <img
              src={logo}
              alt={product.name}
              className='w-72 object-cover rounded-lg m-auto mt-32'
            />

            <div className='space-y-4'>
              <div className='space-y-2'>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Description:</span>{' '}
                  {product.description}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Preview:</span>{' '}
                  {product.previewDescription}
                </p>
              </div>

              <div className='space-y-2'>
                <p className='text-xl'>
                  <span className='font-semibold'>Original Price:</span>{' '}
                  <span className='text-gray-900'>
                    ${product.price.toFixed(2)}
                  </span>
                </p>
                {discount > 0 && (
                  <p className='text-green-600'>
                    <span className='font-semibold'>Discount:</span> $
                    {discount.toFixed(2)}
                  </p>
                )}
                <p className='text-2xl font-bold text-blue-600'>
                  Final Price: ${finalPrice.toFixed(2)}
                </p>
              </div>

              <div className='space-y-2'>
                <p className='text-lg font-semibold'>Quantity:</p>
                <div className='flex items-center space-x-4'>
                  <button
                    onClick={handleDecreaseQuantity}
                    className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition duration-200'
                  >
                    -
                  </button>
                  <span className='text-xl'>{quantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition duration-200'
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='voucher'
                  className='block text-lg font-semibold'
                >
                  Enter Voucher Code:
                </label>
                <div className='flex items-center space-x-4'>
                  <input
                    type='text'
                    id='voucher'
                    className='px-4 py-2 border border-gray-300 rounded-lg w-full'
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button
                    onClick={handleVoucherApply}
                    className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200'
                  >
                    Apply
                  </button>
                </div>
                {voucherError && <p className='text-red-500'>{voucherError}</p>}
              </div>

              <button
                onClick={handleBuyNow}
                className='w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-200'
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
