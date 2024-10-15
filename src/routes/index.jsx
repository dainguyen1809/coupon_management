import CreateCoupon from "../pages/Coupon/CreateCoupon";
import ListCoupon from "../pages/Coupon/ListCoupon";
import Login from "./../pages/Auth/Login";
import Layout from "../components/Layout";
import EditCoupon from "../pages/Coupon/EditCoupon";
import ProductList from "../pages/Product/ListProduct";
import ProductDetails from "../pages/Product/ProductDetails";
import ListOrders from "../pages/Orders/ListOrder";

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
      element: <ProductList />,
    },
    {
      path: "/product/details/:id",
      element: <ProductDetails />,
    },
    {
      path: "coupon/create",
      element: <CreateCoupon />,
    },
    {
      path: "/coupon/edit/:id",
      element: <EditCoupon />
    },
    {
      path: "coupon/show",
      element: <ListCoupon />,
    },
    {
      path: "orders/show",
      element: <ListOrders />,
    },
  ],
},
];
