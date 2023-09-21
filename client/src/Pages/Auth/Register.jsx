import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { REACT_APP_API } from '../../Components/Constant/Constant'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${REACT_APP_API}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    answer
                }
            );
            if (res && res.data.success) {
                toast.success(res && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {

            console.log(error)
            required
            toast.error('something went wrong')
        }
    }
    return (
        <Layout title={'Register - GemStone'}>
            <section className="h-100 bg-dark">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block">
                                        <img src="https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwamV3ZWxsZXJ5fGVufDB8fDB8fHww&w=1000&q=80" alt="Sample photo" className="img-fluid" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-5 text-uppercase">register</h3>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form3Example1m"
                                                    className="form-control form-control-lg"
                                                    value={name}
                                                    required
                                                    onChange={(e) => setName(e.target.value)} />
                                                <label className="form-label" htmlFor="form3Example1m">Name</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form3Example98"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="form3Example97">Email ID</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form3Example99"
                                                    className="form-control form-control-lg"
                                                    value={phone}
                                                    required
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="form3Example">Phone Number</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example9j"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    required
                                                    onChange={(e) => setpassword(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="form3Example9">Password</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form3Example8"
                                                    className="form-control form-control-lg"
                                                    value={address}
                                                    required
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="form3Example8">Address</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form3Example97"
                                                    className="form-control form-control-lg"
                                                    value={answer}
                                                    required
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="form3Example0">Your Favorite Sports</label>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="button" onClick={handleSubmit} className="btn btn-warning btn-lg ms-2">Submit </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </Layout>
    )
}

export default Register
