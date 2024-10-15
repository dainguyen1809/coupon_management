import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

const ListOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/orders');
                setOrders(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">List of Orders</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Order ID</th>
                        <th className="border border-gray-300 p-2">User ID</th>
                        <th className="border border-gray-300 p-2">Products</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Voucher</th>
                        <th className="border border-gray-300 p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className="border border-gray-300 p-2">{order._id}</td>
                            <td className="border border-gray-300 p-2">{order.orderedBy._id}</td>
                            <td className="border border-gray-300 p-2">
                                {order.products.map(product => (
                                    <div key={product._id}>{product.name}</div>
                                ))}
                            </td>
                            <td className="border border-gray-300 p-2">{order.quantity}</td>
                            <td className="border border-gray-300 p-2">{order.voucher ? order.voucher.code : 'None'}</td>
                            <td className="border border-gray-300 p-2">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrders;
