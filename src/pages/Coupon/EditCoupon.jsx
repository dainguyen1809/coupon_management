import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../components/Loading";

const EditCoupon = () => {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(`/api/coupons/${id}`);
        const data = await response.json();
        setCoupon(data);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
      } catch (error) {
        console.error("Error fetching coupon:", error);
      }
    };
    fetchCoupon();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCoupon = {
      ...coupon,
      startDate,
      endDate,
    };

    console.log("Updated Coupon:", updatedCoupon);
  };

  if (!coupon) return <Loading />;

  return (
    <>
      <div className="max-w-full">
        <div className="text-4xl m-12 text-center">Edit Coupon</div>
        <div className="max-w-full-lg flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="mb-8 mr-12">
                <label className="block mb-4 font-bold">Coupon Name</label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={coupon.name}
                  onChange={(e) =>
                    setCoupon({ ...coupon, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold">Coupon Code</label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={coupon.code}
                  onChange={(e) =>
                    setCoupon({ ...coupon, code: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mb-8 mr-12">
                <label className="block mb-4 font-bold">Quantity</label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={coupon.quantity}
                  onChange={(e) =>
                    setCoupon({ ...coupon, quantity: e.target.value })
                  }
                />
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold">Max Use</label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={coupon.maxUse}
                  onChange={(e) =>
                    setCoupon({ ...coupon, maxUse: e.target.value })
                  }
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-60 text-sm rounded-lg focus:border-dark block p-2.5"
                  value={coupon.discountType}
                  onChange={(e) =>
                    setCoupon({ ...coupon, discountType: e.target.value })
                  }
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <div className="mb-8 mx-12">
                <label className="block mb-4 font-bold">Discount Value</label>
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={coupon.discountValue}
                  onChange={(e) =>
                    setCoupon({ ...coupon, discountValue: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="border border-gray-500 w-56 h-10 float-end hover:bg-black hover:text-white">
              Update Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCoupon;
