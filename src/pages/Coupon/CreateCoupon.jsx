import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { CouponContext } from '../../context/CouponContext';

const CreateCoupon = () => {
  const [couponName, setCouponName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [maxUse, setMaxUse] = useState(1);
  const [discountType, setDiscountType] = useState('fixed');
  const [discountAmount, setDiscountAmount] = useState();
  const [status, setStatus] = useState('active');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const { addCoupon } = useContext(CouponContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (discountAmount < 0) {
      alert('Discount amount must be greater than or equal to 0.');
      return;
    }

    if (maxUse < 1) {
      alert('Usage limit must be at least 1.');
      return;
    }

    const newVoucher = {
      code: couponCode,
      discountType,
      discountAmount,
      expiryDate: expiryDate.toISOString(),
      usageLimit: maxUse,
      status,
      createdBy: 'user12345',
    };

    try {
      console.log('New Voucher Data:', newVoucher);
      const response = await axios.post(
        'http://localhost:3001/api/v1/vouchers',
        newVoucher,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Created Success ----> ', response.data.data);
      addCoupon(newVoucher);

      // Reset the form
      setCouponName('');
      setCouponCode('');
      setQuantity(0);
      setMaxUse(1);
      setDiscountType('fixed');
      setDiscountAmount(0);
      setStatus('active');
      setExpiryDate(new Date());
    } catch (error) {
      console.log(
        'Error creating coupon: ',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className='max-w-full'>
        <div className='text-4xl m-12 text-center'>Create Voucher</div>
        <div className='max-w-full-lg flex justify-center items-center'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap'>
              <div className='mb-8 mr-12'>
                <label className='block mb-4 font-bold'>Voucher Code</label>
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className='appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
                  type='text'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='mb-8 mr-12'>
                <label className='block mb-4 font-bold'>Discount Amount</label>
                <input
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className='appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
                  type='number'
                  min='0' // Prevent negative numbers
                  required
                />
              </div>
              <div className='mb-8'>
                <label className='block mb-4 font-bold'>Max Usage Limit</label>
                <input
                  value={maxUse}
                  onChange={(e) => setMaxUse(Number(e.target.value))}
                  className='appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
                  type='number'
                  min='1' // Prevent values less than 1
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='mb-8 mr-12'>
                <label className='block mb-4 font-bold'>Expiry Date</label>
                <DatePicker
                  className='border border-gray-200 w-96 p-2 focus:outline-none focus:bg-white'
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='mb-8'>
                <label className='block mb-4 font-bold'>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option value='active'>Active</option>
                  <option value='expired'>Expired</option>
                  <option value='used'>Used</option>
                  <option value='disabled'>Disabled</option>
                </select>
              </div>
            </div>

            <button
              type='submit'
              className='border border-gray-500 w-56 h-10 float-end hover:bg-black hover:text-white'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCoupon;
