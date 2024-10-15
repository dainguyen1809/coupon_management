import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../../components/Loading";

const EditCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState("");
  const [code, setCode] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [status, setStatus] = useState("active"); // Default status

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/vouchers/${id}`);
        const data = response.data.data; // Access the 'data' property of the response

        console.log("Fetched Coupon Data:", data); // Log the fetched data

        // Check if the data contains the necessary fields
        if (data && data.expiryDate) {
          const expiry = new Date(data.expiryDate);

          // Check if the date is valid
          if (!isNaN(expiry)) {
            setCoupon(data);
            setDiscountAmount(data.discountAmount);
            setCode(data.code);
            setUsageLimit(data.usageLimit);
            setExpiryDate(expiry);
            setStatus(data.status || "active"); // Set status from fetched data or default to 'active'
          } else {
            console.error("Invalid date value:", data.expiryDate);
          }
        } else {
          console.error("Coupon data does not contain expected date fields:", data);
        }
      } catch (error) {
        console.error("Error fetching coupon:", error);
      }
    };
    fetchCoupon();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCoupon = {
      discountAmount,
      code,
      usageLimit,
      expiryDate,
      status, // Include status in the updated coupon
    };

    try {
      await axios.put(`http://localhost:3001/api/v1/vouchers/${coupon._id}`, updatedCoupon);
      console.log("Updated Coupon:", updatedCoupon);
      navigate("/coupon/show");
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  if (!coupon) return <Loading />;

  return (
    <div className="max-w-full">
      <div className="text-4xl m-12 text-center">Edit Coupon</div>
      <div className="max-w-full-lg flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountAmount">
              Discount Amount
            </label>
            <input
              type="number"
              id="discountAmount"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usageLimit">
              Usage Limit
            </label>
            <input
              type="number"
              id="usageLimit"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
            <DatePicker
              selected={expiryDate}
              onChange={(date) => setExpiryDate(date)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="used">Used</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="border border-gray-500 w-56 h-10 float-end hover:bg-black hover:text-white"
            >
              Update Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupon;
