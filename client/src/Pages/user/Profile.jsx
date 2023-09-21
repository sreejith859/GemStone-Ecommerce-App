import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Components/Context/Auth'
import axios from 'axios'
import { REACT_APP_API } from '../../Components/Constant/Constant'
import toast from 'react-hot-toast'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    
    //get user data
    useEffect(() => {
        const {email,name,phone,address} = auth?.user 
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    },[auth?.user])

    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`${REACT_APP_API}/api/v1/auth/profile`,{
                    name,
                    email,
                    password,
                    phone,
                    address,
                }
            );
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user : data?.updatedUser})
                let ls=localStorage.getItem('auth')
                ls=JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth',JSON.stringify(ls))
                toast.success('profile updated')
            }
        } catch (error) {

            console.log(error)
            toast.error('something went wrong')
        }
    }
    return (
        <Layout title={'Profile - GemStone'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className="card-body text-black">
                            <h3 className="mb-3 text-uppercase">USER PROFILE</h3>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="form3Example1m"
                                    className="form-control form-control-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example1m">Name</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form3Example98"
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                                <label className="form-label" htmlFor="form3Example97">Email ID</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="form3Example99"
                                    className="form-control form-control-lg"
                                    value={phone}
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
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example8">Address</label>
                            </div>
                            <div className="d-flex justify-content-end pt-3">
                                <button type="button" onClick={handleSubmit} className="btn btn-warning btn-lg ms-2">UPDATE </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile