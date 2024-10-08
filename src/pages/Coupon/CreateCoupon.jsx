import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CouponContext } from "../../context/CouponContext";

const CreateCoupon = () => {
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [maxUse, setMaxUse] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [status, setStatus] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [coupon, setCoupon] = useState("");
  const { addCoupon } = useContext(CouponContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCoupon = {
      couponName,
      couponCode,
      quantity,
      maxUse,
      discountType,
      discountValue,
      startDate,
      endDate,
      status,
    };

    // console.log(newCoupon);

    try {
      const response = await axios.post("http://127.0.0.1/api/coupon");
      console.log("Created Success ----> ", response.data);

      addCoupon(newCoupon);

      setCouponName("");
      setCouponCode("");
      setQuantity("");
      setMaxUse("");
      setDiscountType("");
      setDiscountValue("");
      setStatus(false);
    } catch (error) {
      console.log("Error creating coupon: ", error);
    }
  };

  return (
    <>
      <div className="max-w-full">
        <div className="text-4xl m-12 text-center">Create Coupon</div>
        <div className="max-w-full-lg flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="mb-8 mr-12">
                <label className="block mb-4 font-bold">Coupon Name</label>
                <input
                  value={couponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold">Coupon Code</label>
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mb-8 mr-12">
                <label className="block mb-4 font-bold">Quantity</label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                />
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold">Max Use</label>
                <input
                  value={maxUse}
                  onChange={(e) => setMaxUse(e.target.value)}
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mb-8 mr-12">
                <label className="block mb-4 font-bold">Start Date</label>
                <DatePicker
                  className="border border-gray-200 w-96 p-2 focus:outline-none focus:bg-white"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold">End Date</label>
                <DatePicker
                  className="border border-gray-200 w-96 p-2 focus:outline-none focus:bg-white"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mb-8">
                <label className="block mb-4 font-bold">Discount Types</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-60 text-sm rounded-lg focus:border-dark block p-2.5"
                >
                  <option selected>Choose a type</option>
                  <option value="percent">Percentage (%)</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <div className="mb-8 mx-12">
                <label className="block mb-4 font-bold">Discount Value</label>
                <input
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                />
              </div>
              <div className="m-12">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Status
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="border border-gray-500 w-56 h-10 float-end hover:bg-black hover:text-white"
            >
              Create
            </button>
          </form>
          .
        </div>
      </div>
    </>
  );
};

export default CreateCoupon;
