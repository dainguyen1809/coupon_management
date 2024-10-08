import React, { useContext, useEffect } from "react";
import { CouponContext } from "../../context/CouponContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListCoupon = () => {
  const { coupons, setCoupons } = useContext(CouponContext);
  const navigate = useNavigate();

    useEffect(() => {
      const fetchCoupons = async () => {
        try {
          const response = await axios.get("/api/coupons");
          setCoupons(response.data);
        } catch (error) {
          console.error("Error fetching coupons", error);
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
        // Xóa coupon
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== id));
        Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
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
            <th className="py-2">Name</th>
            <th className="py-2">Code</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="py-2">{coupon.id}</td>
              <td className="py-2">{coupon.name}</td>
              <td className="py-2">{coupon.code}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEdit(coupon.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCoupon;
