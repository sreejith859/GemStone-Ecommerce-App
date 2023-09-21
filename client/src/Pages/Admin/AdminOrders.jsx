import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { REACT_APP_API } from "../../Components/Constant/Constant";
import { useAuth } from "../../Components/Context/Auth";
import moment from "moment";
import { Select } from "antd";

const AdminOrders = () => {
  const { Option } = Select;
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Orders List - GemStone'}>
      <div className="row p-0 m-0">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Orders</h1>
          <div className="border overflow-auto shadow p-0 m-0">
            {orders.map((o, i) => {
              return (
                <table className="table  mb-3 ">
                  <thead className="bg-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>

                  <tbody className="mt-2">
                    <tr>
                      <td scope="row">{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                    <tr>
                      <td colSpan={6}>
                        {o?.products?.map((p, index) => (
                          <div
                            className="row mb-2 card flex-row   "
                            key={index}
                          >
                            <div className="col-md-4">
                              <img
                                className="card-img-top"
                                src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                                width="100px"
                                height="100px"
                              />
                            </div>
                            <div className="col-md-8">
                              <h4>{p.name}</h4>
                              <p>{p.description.substring(0, 30)}</p>
                              <h4>price : ${p.price}</h4>
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
