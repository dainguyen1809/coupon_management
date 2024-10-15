import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voucherCode, setVoucherCode] = useState(""); 
  const [discount, setDiscount] = useState(0); 
  const [finalPrice, setFinalPrice] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [voucherError, setVoucherError] = useState("");

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
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/vouchers"
        );
        setVouchers(
          response.data.data.filter(
            (voucher) => !voucher.isDeleted && voucher.status === "active"
          )
        );
      } catch (err) {
        console.error("Failed to fetch vouchers:", err);
      }
    };

    fetchProduct();
    fetchVouchers();
  }, [id]);

//   const handleVoucherApply = () => {
//     const validVoucher = vouchers.find(
//       (voucher) => voucher.code === voucherCode
//     );
//     if (validVoucher) {
//       const currentDate = new Date();
//       const expiryDate = new Date(validVoucher.expiryDate);

//       if (currentDate > expiryDate) {
//         setVoucherError("Voucher has expired");
//       } else {
//         const discountAmount = validVoucher.discountAmount;
//         setDiscount(discountAmount);
//         setFinalPrice(product.price - discountAmount);
//         alert(`Voucher applied! You saved $${discountAmount.toFixed(2)}`);
//         setVoucherError("");
//       }
//     } else {
//       setVoucherError("Invalid voucher code");
//     }
//   };

//   const handleBuyNow = async () => {
//     const orderData = {
//       quantity: 1,
//       orderedBy: {
//         _id: "10166700-def7-4fa9-866a-658ced232c15",
//       },
//       products: [product], // The selected product
//       voucher: voucherCode.trim() !== "" ? voucherCode : "", 
//     };

//     try {
//       const response = await fetch("http://localhost:3001/api/v1/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Order saved successfully:", result);
//         alert("Order placed successfully!"); // Notify user of success
//       } else {
//         console.error("Error saving order:", result.message);
//         alert("Error saving order: " + result.message); // Notify user of error
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Network error: " + error.message); // Notify user of network error
//     }
//   };


const handleVoucherApply = () => {
    const validVoucher = vouchers.find(
      (voucher) => voucher.code === voucherCode || voucher.name === voucherCode
    );
    
    if (validVoucher) {
      const currentDate = new Date();
      const expiryDate = new Date(validVoucher.expiryDate);
  
      if (currentDate > expiryDate) {
        setVoucherError("Voucher has expired");
      } else {
        const discountAmount = validVoucher.discountAmount;
        setDiscount(discountAmount);
        setFinalPrice(product.price - discountAmount);
        alert(`Voucher applied! You saved $${discountAmount.toFixed(2)}`);
        setVoucherError("");
      }
    } else {
      setVoucherError("Invalid voucher code");
    }
  };
  

const handleBuyNow = async () => {
    const orderData = {
      quantity: 1,
      orderedBy: {
        _id: "10166700-def7-4fa9-866a-658ced232c15",
      },
      products: [product],
      voucher: voucherCode.trim() !== "" ? voucherCode : "",
    };
  
    console.log("Order data being sent:", orderData); 
  
    try {
      const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      console.log("Server response:", result);
  
      if (response.ok) {
        console.log("Order saved successfully:", result);
        alert("Order placed successfully!");
      } else {
        console.error("Error saving order:", result.message);
        alert("Error saving order: " + result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    }
  };
  

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.createdBy.avatarUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Preview Description:</strong> {product.previewDescription}
      </p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Discount:</strong> ${discount.toFixed(2)}
      </p>
      <p>
        <strong>Size:</strong> {product.size}
      </p>
      <p>
        <strong>Color:</strong> {product.color}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>Created by:</strong> {product.createdBy.fullName}
      </p>
      <p>
        <strong>Email:</strong> {product.createdBy.email}
      </p>
      <p className="mt-12">
        <strong>Final Price:</strong> ${finalPrice.toFixed(2)}
      </p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleVoucherApply}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Apply Voucher
        </button>
        {voucherError && (
          <div className="text-red-500 mt-2">{voucherError}</div>
        )}
      </div>

      <button
        onClick={handleBuyNow}
        className="mt-4 bg-green-500 text-white p-2"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;
