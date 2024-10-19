import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
const Header = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <div className='bg-gray-400 text-white py-4 mb-4'>
      <nav className='container mx-auto flex justify-between'>
        <div className='text-2xl font-bold'>
          <Link to='/'>
            <div className='flex'>
              <img src={logo} alt='logo' className='mr-7' />
              Promotion App
            </div>
          </Link>
        </div>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='text-black border border-none outline-none focus:outline-none px-2 py-1 w-96 rounded-md'
          placeholder='Search products...'
        />
        <ul className='flex space-x-4'>
          <li>
            <Link to='/coupon/create' className='hover:underline'>
              Create Voucher
            </Link>
          </li>
          <li>
            <Link to='/coupon/show' className='hover:underline'>
              List Vouchers
            </Link>
          </li>
          <li>
            <Link to='/' className='hover:underline'>
              List Product
            </Link>
          </li>
          <li>
            <Link to='/orders/show' className='hover:underline'>
              List Orders
            </Link>
          </li>
          {/* <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
