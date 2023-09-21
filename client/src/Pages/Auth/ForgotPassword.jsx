import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { REACT_APP_API } from '../../Components/Constant/Constant'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${REACT_APP_API}/api/v1/auth/forgot-password`,
                {
                    email,
                    newPassword,
                    answer,
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
            toast.error('something went wrong')
        }
    }

  return (
    <Layout title={'Forgot Password - GemStone'}>
            <div className='form-container'>
                <form className='forgot-form' onSubmit={handleSubmit}>
                <h4 className='title'>Reset Password</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='Enter your favorite sports '
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputnewPassword1"
                            placeholder='Password'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mb-2">Reset</button>
                    

                </form>

            </div>
        </Layout>
  )
}

export default ForgotPassword
