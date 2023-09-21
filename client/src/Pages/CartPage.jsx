import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Context/Auth';
import { useCart } from '../Components/Context/Cart';
import Layout from '../Components/Layout/Layout';
import React, { useEffect, useState } from 'react'
import { REACT_APP_API } from '../Components/Constant/Constant';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';


const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //Total price
    const TotalPrice = () => {
        try {
            let total = 0
            cart?.map(item => {
                total = total + item.price;
            });
            return total.toLocaleString("en-us", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token]);

    //handle payment
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('payment completed successfully')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <Layout title={'Cart - GemStone'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light '>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 1 ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"} `
                                : "Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-7 ">
                        {cart?.map((p, index) => (
                            <div className="row mb-2 card flex-row shadow border-0" key={index}>
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
                                    <h4>price : {p.price}</h4>
                                    <button className='btn btn-danger mb-2'
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="col-md-4 text-center  card shadow border-0">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {TotalPrice()}</h4>
                        <div className='card mt-2'>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h6 className=''>Current Address</h6>
                                        <p>{auth?.user?.address}</p>
                                        <button
                                            onClick={() => navigate('/dashboard/user/profile')}
                                            className='btn btn-outline-warning'
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            onClick={() => navigate('/dashboard/user/profile')}
                                            className='btn btn-outline-warning'
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login', {
                                                state: '/cart-page'
                                            })}
                                            className='btn btn-outline-warning mt-2'
                                        >
                                            Pleace Login To CheckOut
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-2 mb-2">
                            {
                                !clientToken || !cart?.length ? ('') : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault',
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button className='btn btn-primary'
                                            onClick={handlePayment}
                                            disabled={ !instance || !auth?.user?.address}
                                        >
                                            {loading ? 'Processing ...' : 'Make payment'}
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )


}

export default CartPage