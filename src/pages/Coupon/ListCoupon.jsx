import React, { useContext, useEffect } from "react";
import { CouponContext } from "../../context/CouponContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; 

const ListCoupon = () => {
  const { coupons, setCoupons } = useContext(CouponContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/vouchers"); 
        setCoupons(response.data.data);
      } catch (error) {
        console.error("Error fetching vouchers", error);
      }
    };

    fetchCoupons();
  }, [setCoupons]);

  const handleEdit = (id) => {
    navigate(`/coupon/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/v1/vouchers/${id}`)
          .then(() => {
            setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id));
            Swal.fire("Deleted!", "Your voucher has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting voucher", error);
            Swal.fire("Error", "There was a problem deleting the voucher.", "error");
          });
      }
    });
  };
  

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Coupon List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Discount Amount</th>
            <th className="py-2">Code</th>
            <th className="py-2">Usage Limit</th>
            <th className="py-2">Expiry Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(coupons) && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="py-2">{coupon._id}</td>
                <td className="py-2">{coupon.discountAmount}</td>
                <td className="py-2">{coupon.code}</td>
                <td className="py-2">{coupon.usageLimit}</td>
                <td className="py-2">{coupon.expiryDate}</td>
                <td className="py-2"><strong className="mx-3">{coupon.status}</strong></td>
                <td className="py-2">
                  <button
                    onClick={() => handleEdit(coupon._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 text-center">No coupons available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCoupon;
