import { createContext, useState } from "react";

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);

  const addCoupon = (newCoupon) => {
    setCoupons((preCoupons) => [...preCoupons, newCoupon]);
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};
