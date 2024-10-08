import CreateCoupon from "../pages/Coupon/CreateCoupon";
import ListCoupon from "../pages/Coupon/ListCoupon";
import Product from "../pages/Product/Product";
import Login from "./../pages/Auth/Login";
import Layout from "../components/Layout";
import EditCoupon from "../pages/Coupon/EditCoupon";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <Product />,
      },
      {
        path: "coupon/create",
        element: <CreateCoupon />,
      },
      {
        path: "/coupon/edit/:id",
        element: <EditCoupon />,
      },
      {
        path: "coupon/show",
        element: <ListCoupon />,
      },
    ],
  },
];
