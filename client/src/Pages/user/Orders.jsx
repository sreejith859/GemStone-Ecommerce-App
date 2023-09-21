import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios'
import { REACT_APP_API } from '../../Components/Constant/Constant'
import { useAuth } from '../../Components/Context/Auth'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${REACT_APP_API}/api/v1/auth/orders`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <Layout title={'Orders - GemStone'}>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-3 ">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 col-12">
                        <h1 className='text-center'>orders</h1>

                        <div className="border p-0 m-0 overflow-auto shadow ">
                            <table className="table table-hover p-0 m-0 ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o, i) => {
                                        return (
                                            <tr>
                                                <td scope="row">{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {orders.map((o, i) => {
                                return (
                                    <div className="container ">
                                        {o?.products?.map((p, index) => (
                                            <div className="row mb-2 card flex-row shadow border-0 mt-5" key={index}>
                                                <div className="col-md-4">
                                                    <img className="card-img-top"
                                                        src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        alt={p.name}
                                                        width='100px'
                                                        height='100px'
                                                    />

                                                </div>
                                                <div className="col-md-8">
                                                    <h4>{p.name}</h4>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <h4>price : ${p.price}</h4>

                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders