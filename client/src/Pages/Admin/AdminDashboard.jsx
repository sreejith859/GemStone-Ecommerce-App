import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Components/Context/Auth'


const AdminDashboard = () => {
    const [auth] = useAuth()
  return (
    <Layout title={'Admin Dashboard - GemStone'}>
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 " >
                        <h1>admin name : {auth?.user?.name}</h1>
                        <h1>admin email : {auth?.user?.email}</h1>
                        <h1>admin phone : {auth?.user?.phone}</h1>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard
