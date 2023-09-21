import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import '../../index.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/Context/Auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { REACT_APP_API } from '../../Components/Constant/Constant'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${REACT_APP_API}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );
            if (res && res.data.success) {
                toast.success(res && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {

            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <Layout title={'LogIn - GemStone'}>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="px-5 ms-xl-4">
                                <span className="h1 text-center fw-bold mb-0">Login</span>
                            </div>
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-1 pt- pt-xl-0 mt-xl-n5">
                                <form style={{ width: '23rem' }}>
                                    <div className="form-outline mb-4">
                                        <input
                                         type="email" 
                                         id="form2Example18"
                                          className="form-control form-control-lg" 
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          />
                                        <label className="form-label" htmlFor="form2Example18">Email address</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                         type="password" 
                                         id="form2Example283" 
                                         className="form-control form-control-lg"
                                         value={password}
                                         onChange={(e) => setpassword(e.target.value)}
                                         />
                                        <label className="form-label" htmlFor="form2Example28">Password</label>
                                    </div>
                                    <div className="pt-1 mb-2">
                                        <button className="btn btn-info btn-lg btn-block" onClick={handleSubmit} type="button">Login</button>
                                    </div>
                                    <p className="small mb-5 pb-lg-2"><NavLink className="text-muted" to="/forgot-password">Forgot password?</NavLink></p>
                                    <p>Don't have an account? <NavLink to="/register" className="link-info">Register here</NavLink></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src="https://www.hamaraevent.com/uploads/blog/0612478001474118021.jpg" alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                        </div>
                    </div>
                </div>
            </section>



        </Layout>
    )
}

export default Login
